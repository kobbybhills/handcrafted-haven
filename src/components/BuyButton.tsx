"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // Added for premium notifications

interface BuyButtonProps {
  productId: string;
  price: number;
}

export default function BuyButton({ productId, price }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlePurchase() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ productId, totalPrice: price }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        // --- Premium Custom Toast ---
        toast.success("Creation secured! Your order is placed.", {
          duration: 4000,
          style: {
            borderRadius: '1.5rem',
            background: '#1c1917', // stone-900
            color: '#fff',
            padding: '16px 24px',
            fontWeight: '900',
            fontSize: '12px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            border: '1px solid #78350f', // amber-900
          },
          iconTheme: {
            primary: '#d97706', // amber-600
            secondary: '#fff',
          },
        });
        
        // Brief delay so they see the success toast before the redirect
        setTimeout(() => {
          router.push("/dashboard"); 
        }, 1500);

      } else {
        const data = await res.json();
        toast.error(data.error || "Workshop error... Check your login status.", {
          style: {
            borderRadius: '1.5rem',
            fontWeight: '900',
            fontSize: '12px',
          }
        });
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to connect to the vault.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handlePurchase}
      disabled={loading}
      className="w-full bg-stone-900 text-white py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-amber-600 disabled:bg-stone-200 transition-all active:scale-95 shadow-lg shadow-stone-200"
    >
      {loading ? "Securing Artifact..." : "Add to Collection"}
    </button>
  );
}