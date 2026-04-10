export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 md:mb-16 border-l-4 border-amber-600 pl-6 md:pl-8">
          <h1 className="text-2xl md:text-6xl font-black text-stone-900 uppercase tracking-tighter leading-none">
            Privacy <span className="text-stone-400">&</span> <span className="text-amber-600"> Security</span>
          </h1>
          <p className="text-stone-400 font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] mt-4">
            Protecting the Artisan Identity
          </p>
        </div>

        {/* Content Section: Card-less on mobile, Card-styled on desktop */}
        <div className="space-y-10 md:space-y-12 bg-transparent md:bg-white md:p-12 md:rounded-[3rem] md:border md:border-stone-100 md:shadow-sm text-stone-600 font-medium">
          
          <section>
            <h2 className="text-x0.5 md:text-2xl font-black text-stone-900 mb-3 md:mb-4 italic">
              Data Collection
            </h2>
            <p className="leading-relaxed text-sm md:text-base">
              We only collect data necessary to deliver your handcrafted treasures. Your email and preferences are kept in our secure vault and are never shared with third-party merchants.
            </p>
          </section>

          <section>
            <h2 className="text-x0.5 md:text-2xl font-black text-stone-900 mb-3 md:mb-4 italic">
              Cookie Usage
            </h2>
            <p className="leading-relaxed text-sm md:text-base">
              We use small digital &quot;fingerprints&quot; (cookies) solely to remember your curated collection and keep your artisan session active.
            </p>
          </section>

          <section>
            <h2 className="text-x0.5 md:text-2xl font-black text-stone-900 mb-3 md:mb-4 italic">
              Vault Security
            </h2>
            <p className="leading-relaxed text-sm md:text-base">
              Our infrastructure is built with modern encryption standards to ensure that your interactions with Handcrafted Haven remain private and untraceable by outside entities.
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
}