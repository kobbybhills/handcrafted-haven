/*eslint-disable*/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Importing our new components
import Navbar from "../components/Navbar";
import AuthProvider from "../components/AuthProvider";

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
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <AuthProvider>
          {/* The Navbar component now handles all header logic and auth states */}
          <Navbar />

          {/* Main content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-emerald-900 text-orange-50 py-10 mt-auto border-t border-emerald-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Handcrafted Haven</h3>
                  <p className="text-sm opacity-90">
                    Connecting artisans with buyers for authentic handmade treasures.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/shop" className="hover:underline">Shop</a></li>
                    <li><a href="/categories" className="hover:underline">Categories</a></li>
                    <li><a href="/about" className="hover:underline">About Us</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                    <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                    <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Our Team</h3>
                  <ul className="space-y-1 text-xs">
                    <li>Douglas Justice</li>
                    <li>Quadri Kolawole Adisa</li>
                    <li>Chidiebere Jared Iheke Egu</li>
                  </ul>
                </div>
              </div>

              <div className="text-center text-sm opacity-80 border-t border-white/20 pt-6">
                <p>© {new Date().getFullYear()} Handcrafted Haven. Built with ❤️ by Team 14</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}