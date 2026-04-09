"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
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

    // 1. Check Login Status - Replaces old browser alert
    if (!isLoggedIn) {
      toast.error("Workshop Access Required", {
        duration: 4000,
        style: {
          borderRadius: '1.5rem',
          background: '#1c1917', // stone-900
          color: '#fff',
          padding: '16px 24px',
          fontWeight: '900',
          fontSize: '12px',
          textTransform: 'uppercase',
          border: '1px solid #78350f', // amber-900
        },
        iconTheme: {
          primary: '#d97706', // amber-600
          secondary: '#fff',
        },
      });
      
      router.push("/login");
      return;
    }

    // 2. Check Role (Only 'buyer' can purchase) - Replaces old browser alert
    if (!isCustomer) {
      toast.error("Buyer Account Required", {
        style: {
          borderRadius: '1.5rem',
          background: '#1c1917',
          color: '#fff',
          padding: '16px 24px',
          fontWeight: '900',
          fontSize: '11px',
          textTransform: 'uppercase',
          border: '1px solid #78350f',
        },
      });
      return;
    }

    // 3. Successful Check - Navigate to the unique product page
    router.push(`/shop/${id}`);
  };

  return (
    <div className="group bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full">
      {/* Image Container with Artisan stone-100 background */}
      <div className="relative h-72 w-full overflow-hidden rounded-4xl mb-6 bg-stone-100">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 text-left px-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-2xl text-gray-900 tracking-tight leading-tight">
            {name}
          </h3>
          <p className="font-black text-2xl text-amber-600">
            ${price.toFixed(2)}
          </p>
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

      {/* Action Button - Updated with scale effects */}
      <div className="mt-auto pt-4">
        <button 
          onClick={handleBuyClick}
          className="w-full py-4 bg-stone-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-stone-100 active:scale-95"
        >
          Try & Buy
        </button>
      </div>
    </div>
  );
}