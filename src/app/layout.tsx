/*eslint-disable*/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader'; // Optional: adds a sleek loading bar at the top
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Handcrafted Haven - Unique Handmade Treasures",
  description: "Connect artisans with buyers for authentic handmade products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#fafaf9] text-gray-900 flex flex-col min-h-screen`}>
        <NextTopLoader color="#d97706" showSpinner={false} />
        <AuthProvider>
          {/* Global Notification Provider */}
          <Toaster 
            position="top-center" 
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'inherit',
                borderRadius: '1rem',
                background: '#1c1917',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              },
            }}
          />

          {/* Navigation */}
          <Navbar />

          {/* Main content - flex-grow ensures footer stays at bottom */}
          <main className="grow">
            {children}
          </main>

          {/* Footer - Optimized for Mobile & Desktop */}
          <footer className="bg-stone-900 text-stone-100 py-12 md:py-20 border-t border-stone-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              
              {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Handcrafted <span className="text-amber-500">Haven</span></h3>
                  <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
                    Connecting master artisans with buyers seeking authentic, soulful, and handmade treasures.
                  </p>
                </div>

                {/* Links Columns - Stacked nicely on mobile */}
                <div className="grid grid-cols-2 gap-8 sm:block sm:space-y-0">
                  <div className="mb-8">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6">Explore</h3>
                    <ul className="space-y-3 text-sm font-bold">
                      <li><a href="/shop" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Shop</a></li>
                      <li><a href="/categories" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Categories</a></li>
                      <li><a href="/about" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">About Us</a></li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6">Support</h3>
                  <ul className="space-y-3 text-sm font-bold">
                    <li><a href="/contact" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Contact</a></li>
                    <li><a href="/terms" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Terms of Service</a></li>
                    <li><a href="/privacy" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Privacy Policy</a></li>
                  </ul>
                </div>

                {/* Team Column */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6">The Workshop Team</h3>
                  <ul className="space-y-2 text-[10px] font-black uppercase tracking-widest text-stone-400">
                    <li className="hover:text-amber-500 transition-colors">
                      <Link href="/about/douglas"> Douglas Justice </Link> 
                      </li>
                    <li className="hover:text-stone-200 transition-colors">Quadri Kolawole Adisa</li>
                    <li className="hover:text-stone-200 transition-colors">Chidiebere Jared Iheke Egu</li>
                  </ul>
                </div>
              </div>

              {/* Bottom Copyright */}
              <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 border-t border-stone-800/50 pt-8">
                <p>© {new Date().getFullYear()} Handcrafted Haven. Built by Team 14</p>
                <div className="flex gap-6">
                  <span className="text-amber-600/50">Master Artisan Certified</span>
                  <span className="text-stone-700">v1.0.4</span>
                </div>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}