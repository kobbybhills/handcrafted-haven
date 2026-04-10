import { connectDB } from "../../../lib/mongodb";
import Order from "../../../models/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    
    if (!session || (session.user as { role?: string }).role !== "seller") {
      return NextResponse.json({ error: "Unauthorized: Artisans only" }, { status: 403 });
    }

    await connectDB();

    
    const orders = await Order.find({})
      .populate("customer", "name email")
      .populate("product", "name image price")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}