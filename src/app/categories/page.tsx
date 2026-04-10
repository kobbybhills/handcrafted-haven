/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

const CATEGORIES = [
  { 
    id: "kitchenware", 
    name: "Kitchenware", 
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e", 
    count: 3 
  },
  { 
    id: "masks", 
    name: "Traditional Masks", 
    image: "https://tse2.mm.bing.net/th/id/OIP.wPuPRojS0qOA06nVghZ6LQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", 
    count: 12 
  },
  { 
    id: "textiles", 
    name: "Kente & Textiles", 
    image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=800", 
    count: 8 
  },
  { 
    id: "jewelry", 
    name: "Beads & Jewelry", 
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop", 
    count: 15 
  },
  { 
    id: "sculptures", 
    name: "Wood Sculptures", 
    image: "https://i.pinimg.com/originals/3d/5c/d6/3d5cd6c171bea2c7a5c255aea8998890.jpg", 
    count: 5 
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] pt-24 md:pt-32 pb-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* HEADER SECTION - Scaled for Mobile */}
        <header className="mb-16 md:mb-20 text-center md:text-left">
          <nav className="flex mb-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 justify-center md:justify-start">
            <Link href="/" className="hover:text-amber-600 transition">Home</Link>
            <span className="mx-3 text-gray-200">/</span>
            <span className="text-gray-900 font-black">Collections</span>
          </nav>
          
          <h1 className="text-5xl md:text-9xl font-black text-gray-900 tracking-tighter leading-[0.9] md:leading-[0.8] transition-all">
            Browse by <br /> <span className="text-amber-600">Collection</span>
          </h1>
          <p className="text-gray-400 font-bold mt-6 md:mt-8 italic text-base md:text-lg max-w-xl mx-auto md:mx-0">
            Explore our curated selection of authentic, handcrafted Ghanaian treasures.
          </p>
        </header>

        {/* CATEGORY GRID: Background removed on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/categories/${cat.id}`} 
              className="group relative h-100 md:h-125 w-full overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-transparent md:bg-white md:shadow-sm md:border md:border-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              {/* IMAGE: Rounded corners applied directly for mobile flow */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover rounded-[3rem] md:rounded-none transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />
              
              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90 rounded-[3rem] md:rounded-none" />
              
              {/* CONTENT - Repositioned for mobile thumb reach */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 text-amber-400">
                  {cat.count} Original Pieces
                </p>
                <h3 className="text-3xl md:text-6xl font-black tracking-tighter leading-none transition-transform duration-500 group-hover:translate-x-3">
                  {cat.name}
                </h3>
              </div>

              {/* FLOATING ACTION ICON - Hidden on small mobile to reduce clutter */}
              <div className="absolute top-8 right-8 md:top-10 md:right-10 hidden md:block">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                   <span className="text-white text-2xl">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* PROMO FOOTER CARD - Smoother mobile padding */}
        <div className="mt-16 md:mt-20 p-12 md:p-24 rounded-[3.5rem] md:rounded-[5rem] bg-amber-950 text-center text-white overflow-hidden relative shadow-2xl">
          <div className="relative z-10">
             <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-6 md:mb-8 max-w-2xl mx-auto leading-tight">
               Not sure what fits <br className="hidden md:block"/> your space?
             </h2>
             <Link href="/shop" className="inline-block px-10 py-5 md:px-12 md:py-6 bg-amber-600 rounded-full font-black uppercase text-[10px] md:text-sm tracking-widest hover:bg-white hover:text-amber-950 transition-all shadow-xl hover:-translate-y-1">
               Explore All Crafts
             </Link>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[20rem] font-black opacity-[0.03] select-none pointer-events-none tracking-tighter">
            HAVEN
          </div>
        </div>
      </div>
    </div>
  );
}