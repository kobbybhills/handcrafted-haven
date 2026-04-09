"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
          <p className="text-stone-900 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Establishing Connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm">
        <h1 className="text-5xl font-black text-stone-900 italic mb-4">Contact <span className="text-amber-600">Us</span></h1>
        <p className="text-stone-500 mb-12 uppercase tracking-widest text-xs font-bold">Reach out to the Artisan Vault</p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Full Name</label>
            <input type="text" className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-amber-600 transition-all" placeholder="Your name..." />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Message</label>
            <textarea className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl h-32 focus:outline-none focus:border-amber-600 transition-all" placeholder="How can our curators help?"></textarea>
          </div>
          <button className="w-full py-5 bg-stone-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-95">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}