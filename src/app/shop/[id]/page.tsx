/* eslint-disable @next/next/no-img-element */
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { notFound } from "next/navigation";
import BuyButton from "../../../components/BuyButton"; // Ensure this path matches your folder

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  await connectDB();
  
  // 1. Await the dynamic params for Next.js 15+ compatibility
  const { id } = await params;

  // 2. Fetch the product from the 'handcrafted_haven' database
  const product = await Product.findById(id).lean();

  if (!product) {
    notFound(); 
  }

  // Convert Mongoose ID to string for the client component
  const productId = (product as { _id: { toString: () => string } })._id.toString();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Craft Image Section */}
        <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
          <img 
            src={(product as { image: string }).image} 
            alt={(product as { name: string }).name} 
            className="w-full h-auto object-cover max-h-150"
          />
        </div>

        {/* Craft Content Section */}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">
            {(product as { category: string }).category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{(product as {name: string}).name}</h1>
          <p className="text-3xl font-semibold text-gray-900 mb-8">
            ${(product as { price: number }).price.toFixed(2)}
          </p>

          <div className="border-t border-gray-100 pt-8 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Artisan&apos;s Note</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {(product as { description: string }).description}
            </p>
          </div>

          {/* Interaction Section */}
          <div className="space-y-4">
            {/* The Client-side button that handles the POST to /api/checkout */}
            <BuyButton productId={productId} price={(product as { price: number }).price} />
            
            <button className="w-full border border-gray-200 py-4 rounded-lg font-bold hover:bg-gray-50 transition duration-300 text-gray-700">
              Save for Later
            </button>
          </div>

          <p className="mt-8 text-xs text-gray-400 italic text-center">
            This is a unique, handcrafted piece. Variations in texture and color are part of its artisan charm.
          </p>
        </div>
      </div>
    </div>
  );
}