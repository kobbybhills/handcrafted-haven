import { connectDB } from "../../../lib/mongodb";
import Order from "../../../models/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // 1. Ensure the user is logged in before allowing a purchase
    if (!session) {
      return NextResponse.json({ error: "Please login to purchase" }, { status: 401 });
    }

    await connectDB();
    const { productId, totalPrice } = await req.json();

    // 2. Create the order in the 'orders' collection
    const newOrder = await Order.create({
      customer: (session.user as { id: string; role?: string }).id,
      product: productId,
      totalPrice: totalPrice,
      status: "pending"
    });

    return NextResponse.json({ 
      message: "Order placed!", 
      orderId: newOrder._id 
    }, { status: 201 });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}