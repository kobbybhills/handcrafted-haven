"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string; // Added to fix the TS2322 error
  isLoggedIn: boolean;
  isCustomer: boolean;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  category,
  isLoggedIn, 
  isCustomer 
}: ProductCardProps) {
  const router = useRouter();

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1. Check Login Status
    if (!isLoggedIn) {
      alert("Please log in to your account to purchase artisan crafts.");
      router.push("/login");
      return;
    }

    // 2. Check Role (Only 'buyer' can purchase)
    if (!isCustomer) {
      alert("Only customer accounts can place orders. Sellers must use the Dashboard.");
      return;
    }

    // 3. Successful Check - Go to Product Page
    router.push(`/shop/${id}`);
  };

  return (
    <div className="group bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden rounded-4xl mb-6">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>

      {/* Content */}
      <div className="flex-1 text-left px-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-2xl text-gray-900 tracking-tight leading-tight">{name}</h3>
          <p className="font-black text-2xl text-amber-600">${price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            {category}
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-amber-700 font-bold uppercase tracking-widest text-[10px]">
            Certified Handcrafted
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto pt-4">
        <button 
          onClick={handleBuyClick}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-amber-600 transition-all shadow-lg shadow-gray-200 active:scale-95"
        >
          Try & Buy
        </button>
      </div>
    </div>
  );
}