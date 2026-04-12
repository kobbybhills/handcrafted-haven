import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';
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

          <Navbar />

          <main className="grow">
            {children}
          </main>

          {/* Optimized Footer to match reference UI */}
          <footer className="bg-stone-900 text-stone-100 py-16 md:py-24 border-t border-stone-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                
                {/* About Handcrafted Haven Column */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-tighter italic underline decoration-amber-500 underline-offset-8">About Handcrafted Haven</h3>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    A marketplace connecting talented artisans with customers who appreciate unique, handmade products.
                  </p>
                </div>

                {/* Quick Links Column */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-8">Quick Links</h3>
                  <ul className="space-y-4 text-sm font-bold">
                    <li><Link href="/shop" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Shop All Products</Link></li>
                    <li><Link href="/categories" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Browse Categories</Link></li>
                    <li><Link href="/about" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">About Us</Link></li>
                  </ul>
                </div>

                {/* Customer Service Column */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-8">Customer Service</h3>
                  <ul className="space-y-4 text-sm font-bold">
                    <li><Link href="/contact" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Contact Us</Link></li>
                    <li><Link href="/shipping" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Shipping Info</Link></li>
                    <li><Link href="/returns" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">Returns Policy</Link></li>
                    <li><Link href="/faq" className="hover:text-amber-500 transition-colors opacity-80 hover:opacity-100">FAQ</Link></li>
                  </ul>
                </div>

                {/* Stay Connected / Newsletter Column */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-8">Stay Connected</h3>
                  <p className="text-xs text-stone-400 font-medium mb-6">Subscribe to our newsletter for new arrivals and exclusive offers.</p>
                  
                  {/* Simple Social Links Area */}
                  <div className="flex gap-4 mb-8">
                    <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">f</div>
                    <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">in</div>
                    <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">X</div>
                  </div>

                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500 mb-4">Workshop Team</h3>
                  <ul className="space-y-2 text-[10px] font-black uppercase tracking-widest text-stone-400"> 
                    <li className="hover:text-amber-500 transition-colors">
                      <Link href="/about/douglas"> Douglas Justice </Link> 
                    </li>
                    <li className="hover:text-amber-500 transition-colors">
                      <Link href="/about/quadri"> Quadri Kolawole Adisa </Link>
                    </li>
                    <li className="hover:text-stone-200 transition-colors">Chidiebere Jared Iheke Egu</li>
                  </ul>
                </div>
              </div>

              {/* Bottom Copyright */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 border-t border-stone-800/50 pt-10">
                <p>© {new Date().getFullYear()} Handcrafted Haven. Connecting artisans and customers.</p>
                <div className="flex gap-8">
                  <Link href="/terms" className="hover:text-amber-500 transition-colors">Terms</Link>
                  <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy</Link>
                  <span className="text-stone-800">v1.0.5</span>
                </div>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}