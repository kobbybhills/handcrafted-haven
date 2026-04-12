"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I know the products are authentic?",
    answer: "Every item on Handcrafted Haven is vetted for authenticity. We work directly with master artisans who provide details about their process, materials, and workshop locations."
  },
  {
    question: "Can I request a custom-made item?",
    answer: "Yes! Many of our artisans accept commissions. You can contact an artisan directly through their product page to discuss custom designs."
  },
  {
    question: "What are the shipping costs?",
    answer: "Shipping costs vary depending on the artisan's location. You can view the exact shipping calculation at checkout before completing your purchase."
  },
  {
    question: "How do I track my order?",
    answer: "Once an artisan ships your treasure, you will receive an email with a tracking number. You can also monitor your order status in your personal Dashboard."
  },
  {
    question: "Is my payment secure?",
    answer: "Absolutely. We use industry-standard encryption to process all payments, and your financial details are never shared directly with the sellers."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      {/* Header Section */}
      <div className="pt-20 pb-12 px-6 border-b border-stone-200/50 bg-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter italic">FAQ</h1>
          <p className="text-amber-600 font-bold uppercase tracking-[0.2em] text-[10px]">
            Master Artisan Support
          </p>
        </div>
      </div>

      {/* Modern List Arrangement */}
      <div className="grow px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-stone-200 last:border-0"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 text-left flex justify-between items-start gap-4 group"
              >
                <span className={`font-bold text-base transition-colors ${openIndex === index ? 'text-amber-600' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <span className={`mt-1 text-xl transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-amber-500' : 'text-stone-300'}`}>
                  +
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 pb-6' : 'max-h-0'}`}
              >
                <p className="text-sm text-stone-500 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Footer CTA */}
      <div className="p-8 border-t border-stone-100 bg-stone-50">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-6">Still confused?</p>
          <Link 
            href="/contact" 
            className="w-full sm:w-auto bg-gray-900 text-white text-center font-black py-4 px-12 rounded-2xl hover:bg-amber-600 transition-all text-xs uppercase tracking-widest shadow-lg"
          >
            Ask the Workshop
          </Link>
          <Link href="/" className="mt-8 text-[9px] font-bold text-stone-400 uppercase tracking-widest hover:text-amber-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}