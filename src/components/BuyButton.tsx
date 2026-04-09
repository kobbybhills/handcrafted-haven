"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        alert("Success! Your order has been placed.");
        router.push("/dashboard"); // Take them to see their new order
      } else {
        const data = await res.json();
        alert(data.error || "Purchase failed. Are you logged in?");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to process checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handlePurchase}
      disabled={loading}
      className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold hover:bg-amber-700 transition duration-300 disabled:bg-gray-400"
    >
      {loading ? "Processing..." : "Add to Collection"}
    </button>
  );
}