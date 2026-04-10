"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Our member data
const teamMembers = [
  {
    slug: "douglas-justice", 
    name: "Douglas Justice",
    role: "Full-Stack Developer",
    specialty: "Database Architecture & API Design",
    image: "/team/douglas.jpg", 
  },
  {
    slug: "quadri-kolawole-adisa",
    name: "Quadri Kolawole Adisa",
    role: "Full-Stack Developer",
    specialty: "Frontend Finery & UI/UX",
    image: "/team/quadri.jpg",
  },
  {
    slug: "chidiebere-jared-iheke-egu",
    name: "Chidiebere Jared Iheke Egu",
    role: "Full-Stack Developer",
    specialty: "API Architecture & Backend Logic",
    image: "/team/jared.jpg",
  }
];

export default function AboutUsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-stone-100 border-t-amber-600 rounded-full animate-spin"></div>
          <p className="text-stone-900 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
            Introducing the Developers...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-32 pb-20 px-6 font-sans text-stone-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 md:mb-24 border-b border-stone-200 pb-10 md:pb-16">
          <h1 className="text-3xl md:text-7xl font-black text-stone-900 uppercase tracking-tighter mb-4 italic leading-none">
            The Haven <span className="text-amber-600">Developers</span>
          </h1>
          <p className="text-stone-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px] mb-8 md:mb-12">
            Behind the Handcrafted Vault
          </p>

          <div className="relative max-w-4xl pt-2">
            <span className="absolute -top-3 md:-top-12 -left-1 md:-left-8 text-[3rem] md:text-[12rem] text-amber-100 font-serif leading-none select-none pointer-events-none opacity-50">
              &ldquo;
            </span>
            
            <blockquote className="relative z-10">
              <p className="text-sm md:text-3xl font-medium text-stone-800 leading-relaxed md:leading-[1.3] tracking-tight">
                We are <span className="text-amber-600 font-black italic">Software Development</span> students at BYU-Idaho, currently in WDD 430 Web Full-Stack Development. 
                We built this platform to celebrate{' '}
                <a 
                  href="https://www.globalcrafts.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline decoration-amber-200 decoration-2 md:decoration-4 underline-offset-2 md:underline-offset-8 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  global craft
                </a>.
              </p>
            </blockquote>

            <div className="mt-4 md:mt-10 flex items-center gap-3">
              <div className="h-px md:h-[1.5px] w-4 md:w-12 bg-amber-600"></div>
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-stone-400">
                TEAM 14
              </span>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {teamMembers.map((member) => (
            <Link href={`/about/${member.slug}`} key={member.slug} className="group">
              {/* Card Container: Frame-less on mobile, Boxed on desktop */}
              <div className="bg-transparent md:bg-white p-0 md:p-8 rounded-none md:rounded-[3rem] border-none md:border md:border-amber-50 shadow-none md:shadow-sm transition-all duration-300 hover:shadow-none md:hover:shadow-2xl md:hover:-translate-y-3">
                
                {/* Image Wrapper */}
                <div className="h-80 md:h-64 rounded-4xl md:rounded-[2.5rem] overflow-hidden bg-stone-100 mb-6 md:mb-8 relative border-none md:border-4 md:border-white shadow-none md:shadow-inner">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={400} 
                    height={400} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-stone-900/80 px-4 py-2 rounded-full">
                      View Profile
                    </span>
                  </div>
                </div>
                
                {/* Text Content */}
                <h3 className="text-2xl md:text-xl font-black text-stone-900 group-hover:text-amber-700 transition-colors leading-tight">
                  {member.name}
                </h3>
                <p className="text-[12px] md:text-[11px] font-black text-amber-600 uppercase tracking-widest mt-1 mb-4">
                  {member.role}
                </p>
                
                <div className="border-t border-stone-200 md:border-stone-100 pt-4 mt-auto">
                  <p className="text-sm md:text-sm font-medium text-stone-500 leading-relaxed">
                    Specializes in {member.specialty}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}