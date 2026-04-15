"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast"; // Added for better UI
import { useRouter } from "next/navigation"; // Added to refresh the list

export default function ReviewForm({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (res.ok) {
        toast.success("Review submitted successfully!"); // Modern notification
        setComment("");
        setRating(5);
        router.refresh(); // Automatically updates the review list on the page
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg text-center">
        <p className="text-amber-800">Please log in to leave a review for this treasure.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5 Stars)</label>
        <input 
          type="number" min="1" max="5" 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-20 border border-gray-300 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500 text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
        <textarea 
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 text-black"
          placeholder="What makes this item special?"
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-amber-600 text-white font-semibold py-3 rounded-md hover:bg-amber-700 transition-colors disabled:bg-gray-400"
      >
        {isSubmitting ? "Sending..." : "Post Review"}
      </button>
    </form>
  );
}