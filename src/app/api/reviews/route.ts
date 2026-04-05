import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectDB } from "../../../lib/mongodb";
import Review from "../../../models/Review";

export async function POST(req: Request) {
  try {
    // 1. Check if the user is authenticated
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the incoming review data
    const { productId, rating, comment } = await req.json();

    if (!productId || !rating || !comment) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 3. Connect to your MongoDB
    await connectDB();

    // 4. Create and save the review
    const newReview = await Review.create({
      userEmail: session.user?.email,
      userName: session.user?.name,
      productId,
      rating,
      comment,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Review Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}