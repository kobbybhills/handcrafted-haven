import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectDB } from "../../../lib/mongodb";
import Review from "../../../models/Review";
import { authOptions } from "../auth/[...nextauth]/route";

// --- GET: Fetch all reviews for the Dashboard ---
export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    return NextResponse.json(reviews, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// --- POST: Save a new customer review ---
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, rating, comment } = await req.json();

    if (!productId || !rating || !comment) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const newReview = await Review.create({
      userEmail: session.user?.email,
      userName: session.user?.name,
      productId,
      rating,
      comment,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch {
    console.error("Review Error");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
