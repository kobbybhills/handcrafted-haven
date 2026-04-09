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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
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
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
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
              <div className="bg-white rounded-3xl overflow-hidden border border-amber-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="h-72 overflow-hidden bg-gray-100 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-600 uppercase tracking-widest shadow-sm">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-2xl font-black text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                    <span className="text-sm font-medium text-amber-600 group-hover:underline">
                      View Details →
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