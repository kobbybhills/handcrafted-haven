"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface AddProductFormProps {
  initialData?: {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
  } | null;
  onSuccess: () => void;
}

export default function AddProductForm({ initialData, onSuccess }: AddProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setImgPreview(initialData.image);
    } else {
      setImgPreview("");
    }
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const url = initialData ? `/api/products/${initialData._id}` : "/api/products";
    const method = initialData ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        // --- Premium Custom Toast ---
        toast.success(initialData ? "Workshop records updated!" : "New creation listed in the Haven!", {
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

        onSuccess(); 
        if (!initialData) {
          (e.target as HTMLFormElement).reset();
          setImgPreview("");
        }
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "The kiln cooled down... try again.");
      }
    } catch (err) {
      toast.error("Failed to connect to the workshop.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form 
      key={initialData?._id || "new"} 
      onSubmit={handleSubmit} 
      className="space-y-6 max-w-lg bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
          {initialData ? "Refine Craft" : "Add Creation"}
        </h2>
        {initialData && (
          <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-3 py-1 rounded-full uppercase tracking-widest">
            Edit Mode
          </span>
        )}
      </div>

      {/* --- Image Preview Section --- */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Visual Preview</label>
        <div className="w-full h-56 border-2 border-dashed border-gray-100 rounded-4xl overflow-hidden flex items-center justify-center bg-[#fafaf9] transition-all duration-500 hover:border-amber-200">
          {imgPreview ? (
            <div className="relative w-full h-full group">
              <Image 
                src={imgPreview} 
                alt="Preview" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                onError={() => setImgPreview("")}
              />
            </div>
          ) : (
            <div className="text-center p-6">
              <div className="text-3xl mb-2 opacity-20">🖼️</div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Awaiting Artifact URL</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Product Title</label>
          <input 
            name="name" 
            defaultValue={initialData?.name || ""} 
            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder-gray-300" 
            placeholder="e.g. Midnight Stoneware Vase"
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Price ($)</label>
            <input 
              name="price" 
              type="number" 
              step="0.01"
              defaultValue={initialData?.price || ""} 
              className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all" 
              placeholder="0.00"
              required 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Category</label>
            <input 
              name="category" 
              defaultValue={initialData?.category || ""} 
              className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all" 
              placeholder="e.g. Ceramics"
              required 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Source Image URL</label>
          <input 
            name="image" 
            defaultValue={initialData?.image || ""} 
            onChange={(e) => setImgPreview(e.target.value)} 
            className="w-full px-5 py-3 bg-amber-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder-amber-200" 
            placeholder="https://images.unsplash.com/..." 
            required 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">The Story / Description</label>
          <textarea 
            name="description" 
            defaultValue={initialData?.description || ""} 
            className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder-gray-300" 
            rows={3} 
            placeholder="Tell the story of this craft..."
            required 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gray-900 text-white py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-amber-600 disabled:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-gray-200"
      >
        {loading ? "Syncing with Vault..." : initialData ? "Confirm Changes" : "Forge New Listing"}
      </button>
    </form>
  );
}