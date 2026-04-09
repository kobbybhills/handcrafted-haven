export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 border-l-4 border-amber-600 pl-8">
          <h1 className="text-6xl font-black text-stone-900 uppercase tracking-tighter">
            Privacy <span className="text-stone-400">&</span> Security
          </h1>
          <p className="text-stone-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
            Protecting the Artisan Identity
          </p>
        </div>

        <div className="space-y-12 bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm text-stone-600 font-medium">
          <section>
            <h2 className="text-2xl font-black text-stone-900 mb-4 italic">Data Collection</h2>
            <p className="leading-relaxed">
              We only collect data necessary to deliver your handcrafted treasures. Your email and preferences are kept in our secure vault and are never shared with third-party merchants.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-stone-900 mb-4 italic">Cookie Usage</h2>
            <p className="leading-relaxed">
              We use small digital &quot;fingerprints&quot; (cookies) solely to remember your curated collection and keep your artisan session active.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}