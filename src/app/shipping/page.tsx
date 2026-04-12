"use client";

import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      {/* Header Section */}
      <div className="pt-20 pb-12 px-6 border-b border-stone-200/50 bg-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tighter italic flex items-center gap-3">
            Shipping Info 🚢
          </h1>
          <p className="text-amber-600 font-bold uppercase tracking-[0.2em] text-[10px]">
            Delivering handcrafted soul to your door
          </p>
        </div>
      </div>

      {/* Fluid Content Section */}
      <div className="grow px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-16">
          
          {/* Global Reach */}
          <section>
            <h2 className="text-[10px] font-black text-amber-600 mb-4 tracking-widest uppercase flex items-center gap-2">
              <span>🌍</span> Global Artisan Network
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed">
              Because our artisans are located all over the world, shipping times and costs vary by workshop. 
              Each item is packed with care by the creator themselves to ensure it reaches you safely.
            </p>
          </section>

          {/* Delivery Times */}
          <section>
            <h2 className="text-[10px] font-black text-amber-600 mb-4 tracking-widest uppercase flex items-center gap-2">
              <span>⏱️</span> Estimated Timelines
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-stone-100">
                <span className="text-2xl">📦</span>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase">Standard Delivery</h3>
                  <p className="text-sm text-stone-500 font-medium">7–14 business days depending on origin.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase">Custom Commissions</h3>
                  <p className="text-sm text-stone-500 font-medium">Please allow an extra 5–10 days for creation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tracking Info */}
          <section className="bg-amber-50/50 p-8 rounded-4xl border border-amber-100/50">
            <h2 className="text-[10px] font-black text-amber-600 mb-4 tracking-widest uppercase flex items-center gap-2">
              <span>📍</span> Real-Time Tracking
            </h2>
            <p className="text-sm text-gray-700 font-medium leading-relaxed mb-6">
              Once your item leaves the artisan&apos;s workshop, you&apos;ll receive a tracking number via email. 
              You can also track your package directly in your dashboard.
            </p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-gray-900 text-white font-black py-3 px-8 rounded-xl hover:bg-amber-600 transition-all text-[10px] uppercase tracking-widest"
            >
              Check Dashboard
            </Link>
          </section>

          {/* Sustainability Note */}
          <section className="pt-10 border-t border-stone-200">
            <h2 className="text-[10px] font-black text-amber-600 mb-4 tracking-widest uppercase flex items-center gap-2">
              <span>🌿</span> Eco-Conscious Packaging
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed">
              Our artisans are encouraged to use recycled and biodegradable materials for shipping. 
              We believe the journey of a handmade item should be as beautiful as the piece itself.
            </p>
          </section>

        </div>
      </div>

      {/* Simple Footer Nav */}
      <div className="p-12 border-t border-stone-100 bg-stone-50 text-center">
        <Link href="/shop" className="text-[10px] font-black text-stone-400 hover:text-amber-600 uppercase tracking-widest transition-colors">
          ← Back to Marketplace
        </Link>
      </div>
    </div>
  );
}