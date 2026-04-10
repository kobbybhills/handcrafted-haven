export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6">
        
        {/* The Rotating Ring - Consistent with your amber-600 accent */}
        <div className="w-10 h-10 md:w-12 md:h-12 border-[3px] md:border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
        
        <div className="text-center">
          {/* Scaled tracking for better mobile readability */}
          <p className="text-stone-900 font-black uppercase tracking-[0.25em] md:tracking-[0.3em] text-[9px] md:text-[10px] animate-pulse">
            Curating Collection
          </p>
          <p className="text-stone-400 font-bold italic text-[10px] md:text-xs mt-2">
            Handcrafted Haven
          </p>
        </div>

      </div>
    </div>
  );
}