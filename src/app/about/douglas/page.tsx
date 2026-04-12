/*eslint-disable react/no-unescaped-entities*/
"use client";

import NextLink from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion"; 
import {  
  Wrench, 
  Rocket, 
  BriefcaseBusiness, 
  Mail, 
  ArrowLeft, 
  ExternalLink,
  Phone 
} from "lucide-react";

export default function DouglasShowcase() {
  const skills = [
    { name: "React", url: "https://react.dev" },
    { name: "Next.js", url: "https://nextjs.org" },
    { name: "Node.js", url: "https://nodejs.org" },
    { name: "MongoDB", url: "https://www.mongodb.com" },
    { name: "TailwindCSS", url: "https://tailwindcss.com" },
    { name: "API Design", url: "https://restfulapi.net" },
    { name: "Full-Stack Architecture", url: "https://aws.amazon.com/what-is/full-stack" }
  ];

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-24 md:pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden font-sans">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-amber-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-amber-100/60 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* NAV */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-16 relative z-10">
        <NextLink href="/" className="inline-flex items-center gap-2 group p-2 rounded-xl text-stone-500 hover:text-stone-900 transition-colors">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-black uppercase text-[10px] tracking-wider">The Workshop</span>
        </NextLink>
      </div>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto mb-20 md:mb-32 grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
        <div className="md:col-span-4 flex justify-center md:justify-end">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-8 border-white shadow-2xl overflow-hidden shadow-amber-950/10 bg-stone-100">
            <Image 
              src="/douglas-justice.jpeg" 
              alt="Douglas Justice" 
              fill 
              priority
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover" 
            />
          </div>
        </div>
        <div className="md:col-span-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
             <span className="text-2xl" role="img" aria-label="Ghana Flag">🇬🇭</span>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">Based in Ghana</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-stone-950 leading-[0.85]">
            DOUGLAS <br /> <span className="text-amber-600 italic">JUSTICE</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-xl font-bold text-stone-500 mt-6 md:mt-8 uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto md:mx-0">
            Full-Stack Engineer | Mechanical Enthusiast | Problem Solver
          </p>
          
          <div className="flex gap-4 justify-center md:justify-start mt-8">
            <a href="mailto:kobbybhills462@gmail.com" className="p-4 bg-white shadow-sm border border-stone-200 rounded-full text-stone-600 hover:text-amber-600 hover:shadow-md transition-all">
              <Mail size={20} />
            </a>
            <a href="https://www.linkedin.com/in/douglas-justice-6749a42b1" target="_blank" rel="noopener noreferrer" className="p-4 bg-white shadow-sm border border-stone-200 rounded-full text-stone-600 hover:text-blue-600 hover:shadow-md transition-all">
              <ExternalLink size={20} /> 
            </a>
            <a href="tel:+233242368360" className="p-4 bg-white shadow-sm border border-stone-200 rounded-full text-stone-600 hover:text-green-600 hover:shadow-md transition-all">
              <Phone size={20} />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-24 md:space-y-40 relative z-10">
        
        {/* TECH ARTIFACTS - Compact Row Layout */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-y border-stone-200/60 py-12"
        >
          <div className="max-w-xs">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">Tech Stack</h2>
            <p className="text-xs font-medium text-stone-500 uppercase tracking-widest">Selected Artifacts</p>
          </div>
          
          <nav className="flex flex-wrap gap-2 md:justify-end">
            {skills.map((skill) => (
              <a 
                key={skill.name} 
                href={skill.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-stone-200 rounded-full hover:border-amber-600 hover:text-amber-600 transition-all group"
              >
                <span className="font-black uppercase tracking-tight text-[11px] text-stone-900 group-hover:text-amber-600">{skill.name}</span>
                <ExternalLink size={12} className="opacity-30 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>
        </motion.section>

        {/* PAST BUILDS - Smaller Horizontal Layout */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Recent Projects</h2>
            <div className="h-px flex-1 bg-stone-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Wellness Tracker", desc: "API architecture & secure session management.", icon: Rocket },
              { title: "Handcrafted Haven", desc: "Digital marketplace for master artisans.", icon: BriefcaseBusiness }
            ].map((proj) => (
              <div key={proj.title} className="group bg-white border border-stone-200 p-6 rounded-2xl flex gap-6 items-center hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300">
                <div className="shrink-0 w-16 h-16 bg-stone-950 rounded-xl flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                  <proj.icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-black uppercase tracking-tight text-stone-900">{proj.title}</h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium leading-relaxed">{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* MECHANICAL GRIT */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="bg-amber-100/40 backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border border-amber-200/50 grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
        >
          <div className="md:col-span-7 text-center md:text-left">
             <div className="p-3 bg-white inline-block rounded-xl shadow-sm mb-6"><Wrench size={24} className="text-amber-600" /></div>
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-stone-950 leading-none">Mechanical Grit</h2>
             <p className="text-sm md:text-lg text-stone-700 leading-relaxed font-medium italic max-w-lg">
                "Software and mechanics both require the ability to diagnose invisible problems. I thrive in both worlds."
             </p>
          </div>
          <div className="md:col-span-5 bg-stone-950 aspect-4/3 rounded-3xl p-6 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-transparent" />
             <p className="text-amber-500 text-center font-black uppercase tracking-[0.2em] text-[10px] leading-[2.5]">
                Diagnostic<br/>Troubleshooting<br/>Patience<br/>Craftsmanship
             </p>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="text-center pt-20 border-t border-stone-200/60">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 mb-10">End of Transmission <br /> Talk to me </p>
           <a href="mailto:kobbybhills462@gmail.com" className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter text-stone-950 hover:text-amber-600 transition-all block px-4">
              LET'S BUILD SOMETHING.
           </a>
        </footer>
      </main>
    </div>
  );
}