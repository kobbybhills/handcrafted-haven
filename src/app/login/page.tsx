"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Please check your email and password.");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafaf9] p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">
            Welcome <span className="text-amber-600">Back</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            The Artisan Fortress Awaits
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
            <p className="text-red-600 text-xs font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all duration-300 font-bold text-gray-900 placeholder-gray-300"
              placeholder="artisan@haven.com"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-600 focus:bg-white transition-all duration-300 font-bold text-gray-900 placeholder-gray-300"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-gray-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-gray-200 disabled:opacity-50 disabled:translate-y-0"
          >
            {isLoading ? "Authenticating..." : "Sign In to Haven"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-tighter">
            New to the workshop?{" "}
            <Link 
              href="/signup" 
              className="text-amber-600 hover:text-gray-900 transition-colors ml-1"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}