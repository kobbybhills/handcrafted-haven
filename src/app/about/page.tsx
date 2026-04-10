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
    role: "Vault Security",
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
    <div className="min-h-screen bg-[#fafaf9] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 border-b border-stone-200 pb-12">
          <h1 className="text-4xl md:text-7xl font-black text-stone-900 uppercase tracking-tighter mb-4 italic leading-none">
            The Haven <span className="text-amber-600">Developers</span>
          </h1>
          <p className="text-stone-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] mb-8">
            Behind the Handcrafted Vault
          </p>
          <p className="text-xl font-medium text-stone-700 leading-relaxed max-w-3xl bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            We are Software Development students at BYU-Idaho, currently in WDD 430 Web Full-Stack Development. 
            We built this platform to celebrate global craft.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member) => (
            <Link href={`/about/${member.slug}`} key={member.slug} className="group">
              <div className="bg-white p-8 rounded-[3rem] border border-amber-50 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-3">
                <div className="h-64 rounded-[2.5rem] overflow-hidden bg-stone-100 mb-8 relative border-4 border-white shadow-inner">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={400} 
                    height={400} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-stone-900/80 px-4 py-2 rounded-full">
                      Meet Developer
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-stone-900 group-hover:text-amber-700 transition-colors">
                  {member.name}
                </h3>
                <p className="text-[11px] font-black text-amber-600 uppercase tracking-widest mt-1 mb-4">
                  {member.role}
                </p>
                <div className="border-t border-stone-100 pt-4 mt-auto">
                  <p className="text-sm font-medium text-stone-500">
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