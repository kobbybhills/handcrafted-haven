import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectDB } from "../../../lib/mongodb";
import Review from "../../../models/Review";
import { authOptions } from "../auth/[...nextauth]/route";

// --- GET: Fetch reviews (Filtered by Product or all for Dashboard) ---
export async function GET(req: Request) {
  try {
    // We extract the productId from the URL (e.g., /api/reviews?productId=123)
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    await connectDB();

    // If a productId is provided, only fetch reviews for that product.
    // Otherwise, fetch everything (useful for your admin dashboard).
    const query = productId ? { productId } : {};
    
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Fetch Review Error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// --- POST: Save a new customer review ---
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only logged-in users can post
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, rating, comment } = await req.json();

    // Validation
    if (!productId || !rating || !comment) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    // Create the review using the standardized 'customer' session data
    const newReview = await Review.create({
      userEmail: session.user?.email,
      userName: session.user?.name,
      productId,
      rating: Number(rating),
      comment,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Post Review Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}