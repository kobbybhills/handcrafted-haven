export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 border-l-4 border-amber-600 pl-8">
          <h1 className="text-6xl font-black text-stone-900 uppercase tracking-tighter">
            Service <span className="text-stone-400">&</span> Terms
          </h1>
          <p className="text-stone-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
            The Handcrafted Haven Protocol
          </p>
        </div>

        <div className="space-y-12 bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm text-stone-600 font-medium">
          <section>
            <h2 className="text-2xl font-black text-stone-900 mb-4 italic">1. Artifact Ownership</h2>
            <p className="leading-relaxed">
              Once a piece is acquired from the Artisan Collection, ownership of the physical artifact transfers to you. However, the artisan retains the intellectual rights to the design.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-stone-900 mb-4 italic">2. Community Conduct</h2>
            <p className="leading-relaxed">
              Any feedback provided in the Feedback Module must be authentic. We reserve the right to remove any &quot;customer whispers&quot; that violate our community standards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}