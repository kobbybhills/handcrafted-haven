import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { getServerSession } from "next-auth/next";
// --- IMPORTANT: Import your auth options to see the 'role' ---
import { authOptions } from "../auth/[...nextauth]/route"; 

// 1. GET: Fetch all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// 2. POST: Add a new product (Secure - Seller only)
export async function POST(req: Request) {
  try {
    // Pass authOptions so NextAuth knows how to read the user's role
    const session = await getServerSession(authOptions);
    
    // Check if user is logged in AND is a seller
    const userRole = (session?.user as { role?: string })?.role;

    if (!session || userRole !== "seller") {
      return NextResponse.json({ error: "Unauthorized: Artisans only" }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const { name, price, category, image, description } = body;

    // Validation
    if (!name || !price || !category || !image || !description) {
      return NextResponse.json({ error: "Missing required product fields" }, { status: 400 });
    }

    const newProduct = await Product.create({
      name,
      price: Number(price),
      category,
      image,
      description,
      sellerId: (session.user as { id?: string }).id, // Optional: Link the product to Douglas
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}