"use client";

import { useEffect, useState } from "react";

interface Review {
  _id: string;
  userName: string;
  userEmail: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export default function FeedbackModule() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getReviews() {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
      setLoading(false);
    }
    getReviews();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold text-amber-900">Listening to customer whispers...</div>;

  return (
    <div className="bg-white rounded-3xl p-8 border border-amber-100 shadow-sm">
      <h2 className="text-2xl font-black text-gray-900 mb-8">Customer Feedback</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div key={rev._id} className="p-6 bg-amber-50/30 rounded-2xl border border-amber-100 relative">
            <div className="flex text-amber-500 mb-3">
              {[...Array(rev.rating)].map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
            </div>
            
            <p className="text-gray-700 italic mb-4 leading-relaxed">
              &quot;{rev.comment}&quot;
            </p>
            
            <div className="border-t border-amber-100 pt-4 mt-auto">
              <p className="font-black text-gray-900 text-sm">{rev.userName}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="py-20 text-center text-gray-400 italic">
          No feedback yet. Your crafts are waiting for their first reviews!
        </div>
      )}
    </div>
  );
}