"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface UserWithRole {
  role?: string;
  [key: string]: string | undefined;
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Authorization check for the Dashboard link
  const isSeller = (session?.user as UserWithRole)?.role === "seller";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
              Handcrafted <span className="text-amber-600">Haven</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-amber-600 transition-colors">Shop</Link>
            <Link href="/categories" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-amber-600 transition-colors">Collections</Link>
            
            {/* Show Dashboard link ONLY to Douglas/Sellers */}
            {isSeller && (
              <Link href="/dashboard" className="text-xs font-black uppercase tracking-widest text-amber-600 animate-pulse">
                Artisan Dashboard
              </Link>
            )}
          </div>

          {/* AUTH BUTTONS */}
          <div className="hidden md:flex items-center gap-6 border-l border-gray-100 pl-8">
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Welcome</p>
                  <p className="text-sm font-black text-gray-900">{session.user?.name}</p>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="bg-gray-900 text-white text-[10px] font-black px-5 py-2.5 rounded-xl hover:bg-red-500 transition-all shadow-md"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-xs font-black uppercase tracking-widest text-gray-900 hover:text-amber-600">
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-amber-600 text-white text-xs font-black px-6 py-3 rounded-2xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-100"
                >
                  JOIN NOW
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 focus:outline-none">
              <span className="text-2xl">{isMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 p-6 space-y-4 animate-in slide-in-from-top-2">
          <Link href="/shop" className="block text-sm font-black uppercase text-gray-900">Shop</Link>
          {isSeller && <Link href="/dashboard" className="block text-sm font-black uppercase text-amber-600">Dashboard</Link>}
          <div className="pt-4 border-t border-gray-50">
            {status === "authenticated" ? (
              <button onClick={() => signOut()} className="w-full text-left text-sm font-black text-red-500">LOGOUT</button>
            ) : (
              <div className="space-y-4">
                <Link href="/login" className="block text-sm font-black uppercase">Sign In</Link>
                <Link href="/signup" className="block text-sm font-black uppercase text-amber-600">Join Now</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}