"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    role: "buyer" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?message=Account created! Please sign in.");
      } else {
        setError(data.error || "Something went wrong.");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] selection:bg-amber-100">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl w-full max-w-md border border-gray-100 animate-in fade-in zoom-in duration-500">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter italic">Join the Haven</h2>
        <p className="text-gray-400 font-bold mb-8">Start your journey with authentic crafts.</p>
        
        {error && (
          <div className="text-red-500 font-bold mb-6 bg-red-50 p-4 rounded-2xl text-xs uppercase tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FULL NAME */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2 px-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all font-medium"
              placeholder="Enter your name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2 px-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all font-medium"
              placeholder="email@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2 px-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all font-medium"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* ACCOUNT TYPE - STYLED DROPDOWN */}
          <div className="relative group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2 px-1">
              Account Type
            </label>
            <div className="relative">
              <select
                value={formData.role}
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none appearance-none cursor-pointer font-bold text-gray-700 transition-all hover:border-amber-200"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="buyer">Purchaser (I want to buy)</option>
                <option value="seller">Artisan (I want to sell)</option>
              </select>
              
              {/* Custom Chevron Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-400 group-hover:text-amber-600 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Dynamic Helper Text */}
            <div className="mt-3 flex items-center gap-2 px-2">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${formData.role === 'seller' ? 'bg-amber-500' : 'bg-stone-300'}`}></div>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">
                {formData.role === "buyer" 
                  ? "Access to curated handmade collections" 
                  : "Dashboard to manage your workshop & sales"}
              </p>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl hover:bg-amber-600 active:scale-[0.98] transition-all shadow-lg shadow-gray-200 disabled:opacity-50 uppercase tracking-widest text-xs mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-10 text-center text-[11px] font-bold text-gray-400 uppercase tracking-tight">
          Already a member? <Link href="/login" className="text-amber-600 hover:text-amber-700 underline underline-offset-4">Sign In</Link>
        </p>
      </div>
    </div>
  );
}