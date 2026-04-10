"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ShopGalleryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Adding a slight artificial delay so the premium loader is visible
        await new Promise((resolve) => setTimeout(resolve, 1200)); 
        
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading shop:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // --- Premium Artisan Loader Implementation ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* The Rotating Ring - Matches the golden amber accent */}
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
          
          <div className="text-center">
            <p className="text-stone-900 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
              Curating Gallery
            </p>
            <p className="text-stone-400 font-bold italic text-xs mt-1">
              Handcrafted Haven
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 italic mb-2">
          The Artisan Collection
        </h1>
        <p className="text-gray-500">Explore unique pieces handcrafted with passion.</p>
      </header>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <p className="text-gray-400">No treasures found yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product._id} 
              href={`/shop/${product._id}`}
              className="group"
            >
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-amber-50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="h-72 overflow-hidden bg-stone-100 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-amber-600 uppercase tracking-widest shadow-sm">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-amber-700 transition-colors tracking-tight">
                    {product.name}
                  </h3>
                  <div className="mt-6 flex justify-between items-center">
                    <p className="text-2xl font-black text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 group-hover:translate-x-1 transition-transform">
                      View Piece →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}