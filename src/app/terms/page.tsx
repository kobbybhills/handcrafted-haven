export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 md:mb-16 border-l-4 border-amber-600 pl-6 md:pl-8">
          <h1 className="text-2xl md:text-6xl font-black text-stone-900 uppercase tracking-tighter leading-none">
            Service <span className="text-stone-400">&</span> <span className="text-amber-600"> Terms</span>
          </h1>
          <p className="text-stone-600 font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] mt-4">
            The Handcrafted Haven Protocol
          </p>
        </div>

        {/* Content Section: Container removed on mobile, card style on desktop */}
        <div className="space-y-10 md:space-y-12 bg-transparent md:bg-white md:p-12 md:rounded-[3rem] md:border md:border-stone-100 md:shadow-sm text-stone-600 font-medium">
          
          <section>
            <h2 className="text-x0.5 md:text-2xl font-black text-stone-900 mb-3 md:mb-4 italic">
              1. Artifact Ownership
            </h2>
            <p className="leading-relaxed text-sm md:text-base">
              Once a piece is acquired from the Artisan Collection, ownership of the physical artifact transfers to you. However, the artisan retains the intellectual rights to the design.
            </p>
          </section>

          <section>
            <h2 className="text-x0.5 md:text-2xl font-black text-stone-900 mb-3 md:mb-4 italic">
              2. Community Conduct
            </h2>
            <p className="leading-relaxed text-sm md:text-base">
              Any feedback provided in the Feedback Module must be authentic. We reserve the right to remove any &quot;customer whispers&quot; that violate our community standards.
            </p>
          </section>
          
          <section>
            <h2 className="text-x0.5 md:text-2xl font-black text-stone-900 mb-3 md:mb-4 italic">
              3. Privacy Policy
            </h2>
            <p className="leading-relaxed text-sm md:text-base">
              Your data is handled with the same care as our artifacts. We do not sell your personal information to third parties.
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
}