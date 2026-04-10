"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Array of team images
const teamImages = [
  "/team/1.jpg",
  "/team/2.jpg",
  "/team/3.jpg",
  "/team/4.jpg",
  "/team/5.jpg",
  "/team/6.jpg",
  "/team/7.jpg",
  "/team/8.jpg",
  "/team/9.jpg",
  "/team/10.jpg",
  "/team/11.jpg",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Initial loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Image rotation logic: switches every 4 seconds
  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % teamImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [loading]);

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
    <div className="min-h-screen bg-[#fafaf9] flex flex-col md:flex-row font-sans overflow-x-hidden">
      
      {/* LEFT SIDE: Brand Zone with Cross-Fade Gallery */}
      <section className="relative w-full md:w-[45%] pt-24 md:pt-40 pb-10 md:pb-20 px-6 md:px-20 flex flex-col justify-between overflow-hidden">
        
        {/* CROSS-FADE LAYER: Stacked images for smooth transition */}
        <div className="hidden md:block absolute inset-0 z-0 bg-stone-100">
          {teamImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-all duration-2000ms ease-in-out transform
                ${currentImageIndex === index 
                  ? (isFocused ? 'opacity-80 scale-110' : 'opacity-42 scale-100') 
                  : 'opacity-0 scale-105'}
              `}
            >
              <Image 
                src={src} 
                alt={`Artisan ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Branding Content */}
        <div className="relative z-10 md:sticky md:top-40">
          <div className="mb-8">
            <p className="text-amber-800 font-serif italic text-lg md:text-xl border-l-2 border-amber-200 pl-4 py-1 max-w-sm">
              &quot;Every handmade piece has a story, we are here to help you find yours.&quot;
            </p>
          </div>

          <h1 className="text-3xl md:text-7xl font-black text-stone-900 italic mb-2 md:mb-6 tracking-tighter leading-tight">
            Contact <span className="text-amber-600">Us</span>
          </h1>
          
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-amber-600"></div>
            <p className="text-stone-700 uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-black">
              Reach out to the artisan vault
            </p>
          </div>
        </div>

        <div className="relative z-10 hidden md:block mt-20">
          <p className="text-stone-900 font-black uppercase tracking-[1em] text-[9px]">
            Handcrafted Haven / Team 14
          </p>
        </div>
      </section>

      {/* RIGHT SIDE: Form Zone */}
      <section className="flex-1 bg-transparent md:bg-white pt-4 md:pt-40 pb-20 px-6 md:px-24 md:border-l md:border-stone-100">
        <div className="max-w-xl mx-auto md:mx-0">
          <form 
            className="space-y-10 md:space-y-14"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-900 mb-2 md:mb-4 group-focus-within:text-amber-600 transition-colors">
                Full Name
              </label>
              <input 
                type="text" 
                className="w-full p-4 md:p-0 md:pb-4 bg-white md:bg-transparent border border-stone-100 md:border-none md:border-b md:border-stone-200 focus:outline-none focus:border-amber-600 transition-all text-sm md:text-lg font-bold text-stone-900 placeholder:text-stone-400" 
                placeholder="Your name..." 
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-900 mb-2 md:mb-4 group-focus-within:text-amber-600 transition-colors">
                Message
              </label>
              <textarea 
                className="w-full p-4 md:p-0 md:pb-4 bg-white md:bg-transparent border border-stone-100 md:border-none md:border-b md:border-stone-200 rounded-2xl md:rounded-none h-32 md:h-40 focus:outline-none focus:border-amber-600 transition-all text-sm md:text-lg font-bold text-stone-900 resize-none placeholder:text-stone-400" 
                placeholder="How can our curators help?"
              ></textarea>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <button className="w-full md:w-auto px-12 py-4 md:py-5 bg-stone-900 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-stone-200/50">
                Send Message
              </button>

              <div className="hidden md:block h-px w-10 bg-stone-200"></div>

              <a href="mailto:Team14@handcraftedhaven.com" className="text-[10px] font-black uppercase tracking-widest text-stone-600 hover:text-amber-600 transition-colors">
                Direct Email Support
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}