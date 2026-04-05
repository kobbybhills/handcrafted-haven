"use client";
import { useState, useEffect } from "react";

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
  // State to track the image URL for the live preview
  const [imgPreview, setImgPreview] = useState("");

  // Update preview when initialData changes (entering/leaving Edit Mode)
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
        alert(initialData ? "Product updated!" : "Product added to Handcrafted Haven!");
        onSuccess(); 
        if (!initialData) {
          (e.target as HTMLFormElement).reset();
          setImgPreview(""); // Clear preview after successful addition
        }
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Something went wrong");
      }
    } catch (err) {
      alert("Failed to process request");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form 
      key={initialData?._id || "new"} 
      onSubmit={handleSubmit} 
      className="space-y-4 max-w-lg bg-white p-6 rounded-lg shadow-sm border border-amber-100"
    >
      <h2 className="text-xl font-bold mb-4 text-amber-900">
        {initialData ? "Edit Craft" : "Add New Craft"}
      </h2>

      {/* --- Image Preview Section --- */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Image Preview</label>
        <div className="w-full h-48 border-2 border-dashed border-amber-100 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
          {imgPreview ? (
            <img 
              src={imgPreview} 
              alt="Preview" 
              className="w-full h-full object-cover" 
              onError={() => setImgPreview("")} // Resets if URL is broken
            />
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-400 text-sm">No image to preview</p>
              <p className="text-gray-300 text-xs italic">Paste a valid URL below</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
        <input 
          name="name" 
          defaultValue={initialData?.name || ""} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none" 
          required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Price ($)</label>
        <input 
          name="price" 
          type="number" 
          defaultValue={initialData?.price || ""} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none" 
          required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
        <input 
          name="category" 
          defaultValue={initialData?.category || ""} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none" 
          required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
        <input 
          name="image" 
          defaultValue={initialData?.image || ""} 
          onChange={(e) => setImgPreview(e.target.value)} // Live updates the preview
          placeholder="https://images.unsplash.com/..." 
          className="w-full p-2 border rounded border-amber-200 focus:ring-2 focus:ring-amber-500 outline-none" 
          required 
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
        <textarea 
          name="description" 
          defaultValue={initialData?.description || ""} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none" 
          rows={3} 
          required 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-amber-600 text-white py-2 rounded font-bold hover:bg-amber-700 disabled:bg-gray-400 transition-colors"
      >
        {loading ? "Processing..." : initialData ? "Update Product" : "List Product"}
      </button>
    </form>
  );
}