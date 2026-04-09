"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">Join the Haven</h2>
        <p className="text-gray-400 font-bold mb-8">Start your journey with authentic crafts.</p>
        
        {error && <p className="text-red-500 font-bold mb-4 bg-red-50 p-3 rounded-xl text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="Enter your name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="email@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-amber-600 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-bold text-gray-400">
          Already have an account? <Link href="/login" className="text-amber-600 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}