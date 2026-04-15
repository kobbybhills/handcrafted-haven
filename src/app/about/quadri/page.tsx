"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  ExternalLink,
  ArrowLeft, 
} from "lucide-react";

import {
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp, 
  FaFacebook, 
  FaInstagram
} from "react-icons/fa";

import Link from "next/link";

export default function QuadriShowcase() {
  const skills = [
    { name: "React", url: "https://react.dev" },
    { name: "Next.js", url: "https://nextjs.org" },
    { name: "TypeScript", url: "https://www.typescriptlang.org" },
    { name: "Node.js", url: "https://nodejs.org" },
    { name: "TailwindCSS", url: "https://tailwindcss.com" },
    { name: "SQL", url: "https://www.mysql.com" },
    { name: "Data Analysis", url: "https://en.wikipedia.org/wiki/Data_analysis" }
  ];

  const projects = [
    {
      name: "Next.js Dashboard",
      desc: "Modern dashboard built with Next.js, TypeScript and Tailwind.",
      link: "https://github.com/adiquatech/nextjs-dashboard"
    },
    {
      name: "E-commerce API",
      desc: "Backend API for managing products, users and orders.",
      link: "https://github.com/adiquatech/ecom-api"
    },
    {
      name: "Poultry Management System",
      desc: "System for managing farm operations and records.",
      link: "https://github.com/adiquatech/poultry-management"
    },
    {
      name: "Contact API",
      desc: "REST API for handling user messages and contact forms.",
      link: "https://github.com/adiquatech/contact-api"
    }
  ];

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-24 pb-20 px-6 relative overflow-hidden">

      {/* NAV */}
      <div className="max-w-6xl mx-auto mb-10">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-black">
          <ArrowLeft size={16} /> Back to Workshop
        </Link>
      </div>

      {/* HERO */}
      <header className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-24">
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-center"
        >
          <div className="w-56 h-56 rounded-full overflow-hidden border-8 border-white shadow-xl">
            <Image
              src="/team/quadri.jpg"
              alt="Quadri"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            QUADRI <br />
            <span className="text-amber-600 italic">ADISA</span>
          </h1>

          <p className="uppercase tracking-widest text-gray-500 mt-6 text-sm">
            Full-Stack Developer • Data Enthusiast • Builder
          </p>

          <div className="flex gap-4 justify-center md:justify-start mt-6">
            <a href="mailto:quadrikolawoleadisa@gmail.com" className="p-3 bg-white rounded-full shadow hover:text-red-600">
              <Mail />
            </a>
            <a href="https://github.com/adiquatech" target="_blank" className="p-3 bg-white rounded-full shadow hover:text-black">
              <FaGithub size={22} />
            </a>
            <a href="www.linkedin.com/in/quadri-kolawole" target="_blank" className="p-3 bg-white rounded-full shadow hover:text-blue-600">
              <FaLinkedin size={22} />
            </a>
            <a href="https://wa.me/2348108111008" target="_blank" className="p-3 bg-white rounded-full shadow hover:text-green-600">
              <FaWhatsapp size={22} />
            </a>
            <a href="https://wwww.facebook.com/share/1HxPHtJrgR" target="_blank" className="p-3 bg-white rounded-full shadow hover:text-blue-500">
              <FaFacebook size={22} />
            </a>
            <a href="https://www.instagram.com/adisaquadri42?igsh=cm5iZXQ2MDQ3MHV5" target="_blank" className="p-3 bg-white rounded-full shadow hover:text-pink-600">
              <FaInstagram size={22} />
            </a>
          </div>
        </motion.div>
      </header>

      {/* TECH STACK */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto mb-24"
      >
        <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <a
              key={skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-white border rounded-full flex items-center gap-2 hover:border-amber-600 hover:text-amber-600 transition"
            >
              {skill.name}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto mb-24"
      >
        <h2 className="text-2xl font-bold mb-6">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <a
              key={proj.name}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white border rounded-2xl hover:shadow-xl transition"
            >
              <h3 className="font-bold text-lg group-hover:text-amber-600">
                {proj.name}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {proj.desc}
              </p>

              <span className="text-xs text-amber-600 mt-4 inline-block">
                View on GitHub →
              </span>
            </a>
          ))}
        </div>
      </motion.section>

      {/* PERSONAL STATEMENT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto mb-24 bg-amber-100 p-10 rounded-3xl"
      >
        <h2 className="text-3xl font-black mb-4">More About Me</h2>
        <p className="text-gray-700 leading-relaxed">
         I see development as more than just writing code. 
         For me, it is about building systems that solve real problems and can grow into something meaningful. 
         I am currently exploring how web development, data, and business can work together to create useful digital products.
        </p>
      </motion.section>

      {/* CONTACT */}
      <section className="text-center">
        <h2 className="text-xl mb-6">Connect With Me</h2>

        <div className="flex justify-center gap-6 flex-wrap">

          <a href="https://github.com/adiquatech" target="_blank" className="p-4 bg-white rounded-full shadow hover:text-black">
            <FaGithub size={22} />
          </a>

          <a href="www.linkedin.com/in/quadri-kolawole" target="_blank" className="p-4 bg-white rounded-full shadow hover:text-blue-600">
            <FaLinkedin size={22} />
          </a>

          <a href="mailto:quadrikolawolaadisa@mail.com" className="p-4 bg-white rounded-full shadow hover:text-red-600">
            <Mail size={22} />
          </a>

          <a href="https://wa.me/2348108111008" target="_blank" className="p-4 bg-white rounded-full shadow hover:text-green-600">
            <FaWhatsapp size={22} />
          </a>

          <a href="https://wwww.facebook.com/share/1HxPHtJrgR" target="_blank" className="p-4 bg-white rounded-full shadow hover:text-blue-500">
            <FaFacebook size={22} />
          </a>

          <a href="https://www.instagram.com/adisaquadri42?igsh=cm5iZXQ2MDQ3MHV5" target="_blank" className="p-4 bg-white rounded-full shadow hover:text-pink-600">
            <FaInstagram size={22} />
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center mt-20">
        <p className="text-gray-400 text-sm mb-6">Let’s build something impactful.</p>
      </footer>
    </div>
  );
}
