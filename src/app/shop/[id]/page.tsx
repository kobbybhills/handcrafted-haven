/* eslint-disable @next/next/no-img-element */
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";
import Review from "../../../models/Review"; 
import { notFound } from "next/navigation";
import BuyButton from "../../../components/BuyButton";
import ReviewForm from "../../../components/ReviewForm"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

// Interfaces to prevent TypeScript "any" errors
interface ProductDoc {
  _id: { toString: () => string };
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ReviewDocument {
  _id: { toString: () => string };
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  await connectDB();
  
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as { role?: string })?.role;
  const { id } = await params;

  // Fetch Product with proper typing
  const product = (await Product.findById(id).lean()) as ProductDoc | null;

  if (!product) {
    notFound(); 
  }

  const productId = product._id.toString();

  // Fetch existing reviews for this specific product
  const reviews = (await Review.find({ productId }).sort({ createdAt: -1 }).lean()) as ReviewDocument[];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 mt-10 md:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
        
        {/* Image Section */}
        <div className="rounded-[3rem] overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col">
          <span className="text-xs font-black text-amber-600 uppercase tracking-[0.3em] mb-4">
            {product.category}
          </span>
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter italic leading-none">
            {product.name}
          </h1>
          <p className="text-4xl font-black text-amber-600 mb-8">
            ${product.price.toFixed(2)}
          </p>

          <div className="border-t border-stone-200 pt-8 mb-8">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Artisan&apos;s Note</h2>
            <p className="text-gray-600 leading-relaxed text-lg font-medium">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <BuyButton productId={productId} price={product.price} />
            <button className="w-full border-2 border-stone-200 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-50 transition-all text-gray-500">
              Save for Later
            </button>
          </div>
        </div>
      </div>

      {/* RATING & REVIEW SECTION */}
      <div className="border-t border-stone-200 pt-20">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter italic">Community Reviews</h2>
          <p className="text-gray-400 font-bold mb-12">Hear what fellow collectors have to say.</p>

          {/* Logic check for the standardized 'customer' role */}
          {userRole === "customer" ? (
            <div className="mb-16">
               <p className="text-xs font-bold text-amber-600 uppercase mb-4 tracking-widest">Share your thoughts</p>
               <ReviewForm productId={productId} />
            </div>
          ) : (
            <p className="mb-12 p-4 bg-amber-50 text-amber-700 rounded-xl text-[10px] font-black uppercase tracking-widest">
              {session ? "Only customers can leave reviews." : "Please log in as a customer to leave a review."}
            </p>
          )}

          {/* Review List - No more red lines on 'any' */}
          <div className="space-y-10">
             {reviews.length > 0 ? (
               reviews.map((rev: ReviewDocument) => (
                 <div key={rev._id.toString()} className="border-b border-stone-100 pb-8">
                   <div className="flex justify-between items-center mb-2">
                     <h4 className="font-black text-gray-900 uppercase text-[11px] tracking-widest">{rev.userName}</h4>
                     <div className="text-amber-500 text-sm">
                       {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                     </div>
                   </div>
                   <p className="text-gray-600 font-medium leading-relaxed">{rev.comment}</p>
                   <p className="text-[9px] text-gray-400 font-bold mt-3 uppercase tracking-tighter">
                     Verified Purchase — {new Date(rev.createdAt).toLocaleDateString()}
                   </p>
                 </div>
               ))
             ) : (
               <p className="text-stone-400 font-medium italic">No reviews yet. Be the first to verify this craft!</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}