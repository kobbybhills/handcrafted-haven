import { connectDB } from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// --- DELETE: Remove a product from the workshop ---
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // 1. Security Check
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string})?.role;

    if (!session || userRole !== "seller") {
      return NextResponse.json({ error: "Unauthorized: Artisans only" }, { status: 403 });
    }

    await connectDB();
    
    // 2. Await params for Next.js 15+ compatibility
    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// --- PATCH: Update an existing craft ---
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Security Check
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as {role?: string})?.role;

    if (!session || userRole !== "seller") {
      return NextResponse.json({ error: "Unauthorized: Artisans only" }, { status: 403 });
    }

    await connectDB();
    
    // 2. Await params and parse body
    const { id } = await params;
    const body = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true, // Returns the updated document
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}