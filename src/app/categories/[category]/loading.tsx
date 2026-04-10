export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* The Rotating Ring - Matches your artisan theme */}
        <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
        
        <div className="text-center">
          <p className="text-stone-900 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
            Curating Collection
          </p>
          <p className="text-stone-400 font-bold italic text-xs mt-1">
            Handcrafted Haven
          </p>
        </div>
      </div>
    </div>
  );
}