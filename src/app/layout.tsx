/*eslint-disable*/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";
import { Toaster } from "react-hot-toast"; //

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
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#fafaf9] text-gray-900`}>
        <AuthProvider>
          {/* Global Notification Provider */}
          <Toaster 
            position="top-center" 
            reverseOrder={false}
            toastOptions={{
              // Default styling for all toasts
              duration: 4000,
              style: {
                fontFamily: 'inherit',
              },
            }}
          />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Footer - Updated with a more premium Artisan aesthetic */}
          <footer className="bg-stone-900 text-stone-100 py-16 mt-auto border-t border-stone-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Handcrafted Haven</h3>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    Connecting master artisans with buyers seeking authentic, soulful, and handmade treasures.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">Quick Links</h3>
                  <ul className="space-y-3 text-sm font-bold">
                    <li><a href="/shop" className="hover:text-amber-500 transition-colors">Shop</a></li>
                    <li><a href="/categories" className="hover:text-amber-500 transition-colors">Categories</a></li>
                    <li><a href="/about" className="hover:text-amber-500 transition-colors">About Us</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">Support</h3>
                  <ul className="space-y-3 text-sm font-bold">
                    <li><a href="/contact" className="hover:text-amber-500 transition-colors">Contact</a></li>
                    <li><a href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
                    <li><a href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">The Workshop Team</h3>
                  <ul className="space-y-2 text-xs font-black uppercase tracking-widest text-stone-400">
                    <li>Douglas Justice</li>
                    <li>Quadri Kolawole Adisa</li>
                    <li>Chidiebere Jared Iheke Egu</li>
                  </ul>
                </div>
              </div>

              <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 border-t border-stone-800 pt-8">
                <p>© {new Date().getFullYear()} Handcrafted Haven. Built with ❤️ by Team 14</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}