"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";

function FadeIn({ children }: { children: ReactNode }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.1 } // Triggers the animation when 10% of the element is visible
    );

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-amber-100">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-4">Manifesto</p>
          <h1 className="text-5xl md:text-7xl font-black text-stone-950 tracking-tight leading-[0.9] mb-8">
            The <br /> <span className="text-amber-500 underline decoration-stone-100 underline-offset-8">Haven.</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-stone-600 max-w-xl leading-relaxed italic">
            Celebrating handcrafted excellence through a community of passionate artisans.
          </p>
        </FadeIn>
      </section>

      {/* 2. OUR STORY JOURNEY - Full Points Restored */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-stone-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          <div className="md:col-span-4">
            <FadeIn>
              <h2 className="text-xs font-black text-amber-600 uppercase tracking-[0.3em]">Our Journey</h2>
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn>
              <h3 className="text-3xl md:text-4xl font-black text-stone-950 tracking-tighter mb-8 leading-none uppercase">
                Started in 2020.
              </h3>
              <div className="space-y-6 text-base md:text-lg text-stone-700 font-medium leading-relaxed">
                <p>
                  Handcrafted Haven was born from a simple but powerful belief: that handmade goods possess a unique value and soul that mass-produced items can never match.
                </p>
                <p>
                  In 2020, we set out to create a digital workshop: a place where master artisans could share their dedication, skill, and care with a global community.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. IMPACT NUMBERS - Sharp Transition, No Gradients */}
      <section className="py-24 bg-stone-950 text-white border-y border-stone-900">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-16 md:gap-8">
            <FadeIn>
              <span className="block text-5xl md:text-6xl font-black text-amber-500 tracking-tighter">$4M+</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-2">Paid to Artisans</p>
            </FadeIn>
            <FadeIn>
              <span className="block text-5xl md:text-6xl font-black tracking-tighter text-white">10K+</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-2">Happy Customers</p>
            </FadeIn>
            <FadeIn>
              <span className="block text-5xl md:text-6xl font-black tracking-tighter text-white">50+</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-2">Communities Supported</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. OUR VALUES - All 3 Points Restored */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-xs font-black text-amber-600 uppercase tracking-[0.3em] mb-16 text-center">Core Principles</h2>
        </FadeIn>
        
        <div className="space-y-24">
          {[
            { id: "01", title: "Community First", desc: "We foster a supportive environment where artisans and customers connect meaningfully, ensuring that the human element remains at the center of every transaction." },
            { id: "02", title: "Quality Craft", desc: "Every item on our platform is handcrafted with exceptional skill. We vet every artisan to ensure that attention to detail and traditional trades are preserved." },
            { id: "03", title: "Sustainability", desc: "We promote eco-friendly practices and support local, sustainable production. By choosing handmade, you are reducing waste and supporting mindful consumption." }
          ].map((val) => (
            <div key={val.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-2 text-5xl md:text-6xl font-black text-stone-400 leading-none">{val.id}</div>
              <div className="md:col-span-4">
                <FadeIn>
                  <h4 className="text-xl font-black text-stone-900 uppercase tracking-tight mb-2">{val.title}</h4>
                </FadeIn>
              </div>
              <div className="md:col-span-6 border-l border-amber-500 pl-8">
                <FadeIn>
                  <p className="text-base md:text-lg text-stone-500 font-medium leading-relaxed">
                    {val.desc}
                  </p>
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MINIMAL CTA */}
      <section className="py-24 px-6 text-center border-t border-stone-100">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-black text-stone-950 tracking-tighter mb-10 uppercase leading-none">
            Join the <span className="text-stone-400 italic">Haven.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link 
              href="/shop" 
              className="w-full md:w-auto text-stone-950 font-black text-[10px] uppercase tracking-[0.3em] border-2 border-black px-12 py-4 rounded-lg hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
            >
              Explore Shop
            </Link>
            <Link 
              href="/signup" 
              className="w-full md:w-auto text-stone-950 font-black text-[10px] uppercase tracking-[0.3em] border-2 border-black px-12 py-4 rounded-lg hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
            >
              Join Us
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}