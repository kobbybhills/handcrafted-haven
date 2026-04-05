import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product"; // Ensure you have a Product model created
import { getServerSession } from "next-auth/next";

// 1. GET: Fetch all products for the Shop page
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// 2. POST: Add a new product (Secure - Admin/Seller only)
export async function POST(req: Request) {
  try {
    // Check if the user is logged in (Douglas)
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const { name, price, category, image, description } = body;

    // Validation
    if (!name || !price || !category || !image || !description) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      name,
      price: Number(price),
      category,
      image,
      description,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}