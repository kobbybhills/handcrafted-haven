/*eslint-disable*/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Handcrafted Haven - Unique Handmade Treasures",
  description: "Connect artisans with buyers for authentic handmade products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        {/* Top Navbar - visible on all pages */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/" className="text-2xl font-bold text-amber-700">
                  Handcrafted Haven
                </a>
              </div>

              {/* Navigation - we'll make this dynamic later */}
              <nav className="hidden md:flex space-x-8">
                <a href="/shop" className="text-gray-700 hover:text-amber-700">
                  Shop
                </a>
                <a href="/categories" className="text-gray-700 hover:text-amber-700">
                  Categories
                </a>
                <a href="/about" className="text-gray-700 hover:text-amber-700">
                  About
                </a>
              </nav>

              {/* Auth / User area */}
              <div className="flex items-center space-x-4">
                <a href="/login" className="text-gray-700 hover:text-amber-700">
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[var(--haven-dark-green)] text-[var(--haven-cream)] py-10 mt-auto border-t border-[var(--haven-green)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Full footer content for public pages */}
            {/* {!isDashboard && ( */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Column 1: About */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Handcrafted Haven</h3>
                  <p className="text-sm opacity-90">
                    Connecting artisans with buyers for authentic handmade treasures.
                  </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/shop" className="hover:underline">Shop</a></li>
                    <li><a href="/categories" className="hover:underline">Categories</a></li>
                    <li><a href="/about" className="hover:underline">About Us</a></li>
                  </ul>
                </div>

                {/* Column 3: Support */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                    <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                    <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                  </ul>
                </div>

                {/* Column 4: Team (small version) */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Our Team</h3>
                  <ul className="space-y-1 text-xs">
                    <li>Douglas Justice</li>
                    <li>Quadri Kolawole Adisa</li>
                    <li>Chidiebere Jared Iheke Egu</li>
                  </ul>
                </div>
              </div>
            {/* )} */}

            {/* Always show copyright */}
            <div className="text-center text-sm opacity-80 border-t border-white/20 pt-6">
              <p>© {new Date().getFullYear()} Handcrafted Haven. Built with ❤️ by Team 14</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}