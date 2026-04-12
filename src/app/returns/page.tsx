"use client";

import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      {/* Header Section - Matches FAQ style */}
      <div className="pt-20 pb-12 px-6 border-b border-stone-200/50 bg-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tighter italic">
            Returns & Exchanges
          </h1>
          <p className="text-amber-600 font-bold uppercase tracking-[0.2em] text-[10px]">
            Our commitment to authentic craftsmanship
          </p>
        </div>
      </div>

      {/* Main Content - Fluid List Style */}
      <div className="grow px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-16">
          
          <section className="relative">
            <h2 className="text-[10px] font-black text-amber-600 mb-4 tracking-widest uppercase">
              01. The Artisan Guarantee
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed">
              Because our products are handcrafted by individual artisans, each piece is unique. 
              We want you to love your find. If an item arrives damaged or significantly different 
              from the description, we are here to make it right.
            </p>
          </section>

          <section className="relative">
            <h2 className="text-[10px] font-black text-amber-600 mb-4 tracking-widest uppercase">
              02. 30-Day Return Window
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 font-medium leading-relaxed">
                To ensure fairness to our artisans, we maintain a specific window for returns:
              </p>
              <ul className="space-y-4 border-l-2 border-stone-200 pl-6 py-2">
                <li className="text-sm font-bold text-gray-800">
                  Items must be returned within <span className="text-amber-600">30 days</span> of delivery.
                </li>
                <li className="text-sm font-bold text-gray-800">
                  Products must be in their original, unused condition.
                </li>
                <li className="text-sm font-bold text-gray-800">
                  Custom-made or personalized commissions are non-refundable.
                </li>
              </ul>
            </div>
          </section>

          <section className="relative">
            <h2 className="text-[10px] font-black text-amber-600 mb-4 tracking-widest uppercase">
              03. How to Start a Return
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed mb-8">
              To initiate a return, please visit your <Link href="/dashboard" className="text-gray-900 underline decoration-amber-500 underline-offset-4 font-black">Customer Dashboard</Link> or 
              contact our support team with your order number.
            </p>
            <Link 
              href="/contact" 
              className="inline-block w-full sm:w-auto bg-gray-900 text-white font-black py-4 px-10 rounded-2xl hover:bg-amber-600 transition-all shadow-lg text-xs uppercase tracking-widest text-center"
            >
              Contact Support
            </Link>
          </section>

          <section className="pt-10 border-t border-stone-200">
            <h2 className="text-[10px] font-black text-amber-600 mb-4 tracking-widest uppercase">
              04. Refunds
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed">
              Once your return is received and inspected by the artisan, your refund will be processed 
              to your original payment method within 5-7 business days.
            </p>
          </section>

        </div>
      </div>

      {/* Simplified Footer Navigation */}
      <div className="p-12 border-t border-stone-100 bg-stone-50 text-center">
        <Link href="/shop" className="text-[10px] font-black text-stone-400 hover:text-amber-600 uppercase tracking-widest transition-colors">
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}