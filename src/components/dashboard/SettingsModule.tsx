"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsModule() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  // Local state for the form
  const [workshopName, setWorkshopName] = useState("Handcrafted Haven");
  const [artisanBio, setArtisanBio] = useState("Crafting timeless treasures with wood, clay, and soul.");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call for now
    setTimeout(() => {
      setIsSaving(false);
      alert("Workshop settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Personalize your artisan profile and workshop details</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Section */}
        <section className="bg-white rounded-3xl p-8 border border-amber-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="p-2 bg-amber-50 rounded-lg text-amber-600">👤</span>
            Artisan Profile
          </h3>
          <div className="flex items-center gap-6 mb-8">
            <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-amber-100 to-amber-200 border-2 border-white shadow-sm flex items-center justify-center text-3xl font-black text-amber-700">
              {session?.user?.name?.charAt(0) || "D"}
            </div>
            <div>
              <p className="text-xl font-black text-gray-900">{session?.user?.name}</p>
              <p className="text-sm text-gray-500 font-medium">{session?.user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {(session?.user as {role?: string})?.role || "Artisan"}
              </span>
            </div>
          </div>
        </section>

        {/* Workshop Section */}
        <section className="bg-white rounded-3xl p-8 border border-amber-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="p-2 bg-amber-50 rounded-lg text-amber-600">🏠</span>
            Workshop Details
          </h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Workshop Name</label>
              <input 
                type="text" 
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none font-medium transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Artisan Bio</label>
              <textarea 
                rows={4}
                value={artisanBio}
                onChange={(e) => setArtisanBio(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none font-medium transition resize-none"
              />
            </div>
            <button 
              type="submit"
              disabled={isSaving}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition active:scale-95 disabled:bg-gray-400"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </section>

        {/* Account Security Placeholder */}
        <section className="p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="flex justify-between items-center text-gray-400">
            <div>
              <p className="font-bold">Password & Security</p>
              <p className="text-xs italic">Authentication managed via NextAuth</p>
            </div>
            <button disabled className="text-xs font-bold uppercase tracking-widest opacity-50">Manage</button>
          </div>
        </section>
      </div>
    </div>
  );
}