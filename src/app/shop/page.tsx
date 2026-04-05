/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { connectDB } from "../../lib/mongodb";
import Product from "../../models/Product";
import mongoose from "mongoose";

interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default async function ShopPage() {
  await connectDB();
  

  const products = await Product.find({}).sort({ createdAt: -1 }).lean() as unknown as IProduct[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Shop the Collection</h1>
        <p className="text-gray-600 mt-2">Discover unique handcrafted treasures from our artisans.</p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <Link 
            key={item._id.toString()} 
            href={`/shop/${item._id}`} 
            className="group block"
          >
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition">
                  {item.name}
                </h3>
                <p className="text-xl font-semibold text-gray-900 mt-2">
                  ${item.price.toFixed(2)}
                </p>
                
                <button className="mt-4 w-full border border-gray-900 py-2 rounded-md group-hover:bg-gray-900 group-hover:text-white transition duration-300 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg italic">
            Our artisans are currently crafting new treasures. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}