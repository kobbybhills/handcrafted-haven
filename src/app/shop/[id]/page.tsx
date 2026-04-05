/* eslint-disable @next/next/no-img-element */
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product"; 
import Review from "../../../models/Review"; 
import ReviewForm from "../../../components/ReviewForm";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

// Defining the shape of a Review to fix the "any" error
interface IReview {
  _id: mongoose.Types.ObjectId;
  userName?: string;
  rating: number;
  comment: string;
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  const item = await Product.findById(id).lean();
  // Casting to IReview array to satisfy TypeScript
  const reviews = await Review.find({ productId: id }).sort({ createdAt: -1 }).lean() as unknown as IReview[];

  if (!item) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
           <img 
             src={item.image} 
             alt={item.name} 
             className="object-cover w-full h-full"
           />
        </div>

        <div>
          <span className="text-sm uppercase tracking-widest text-amber-600 font-bold">
            {item.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{item.name}</h1>
          <p className="text-2xl text-amber-700 font-semibold mt-2">${item.price}</p>
          
          <p className="text-gray-600 mt-6 leading-relaxed">
            {item.description || "A beautiful handcrafted treasure, made with care and high-quality materials."}
          </p>

          <div className="mt-8">
            <button className="w-full bg-gray-900 text-white px-8 py-4 rounded-md hover:bg-gray-800 transition font-medium">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <hr className="my-12 border-gray-200" />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        <div className="space-y-6 mb-10">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev._id.toString()} className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800">{rev.userName || "Verified Buyer"}</span>
                  <span className="text-amber-500">{"★".repeat(rev.rating)}</span>
                </div>
                {/* Fixed the quotes here using &quot; to stop the error */}
                <p className="text-gray-600 italic">&quot;{rev.comment}&quot;</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No reviews yet. Be the first to share your thoughts!</p>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Write a Review</h3>
          <ReviewForm productId={String(item._id)} />
        </div>
      </div>
    </div>
  );
}