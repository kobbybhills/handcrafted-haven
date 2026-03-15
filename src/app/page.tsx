export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-haven-cream p-8">
      <div className="bg-white p-12 rounded-2xl shadow-xl border-t-8 border-haven-green text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-haven-dark-green mb-4">
          Handcrafted Haven
        </h1>
        <p className="text-haven-terracotta text-lg font-semibold mb-8">
          Project Dashboard Ready
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-haven-cream rounded-lg border border-haven-green/20">
            <p className="font-bold text-haven-green">Developer</p>
            <p className="text-gray-700">Douglas Justice</p>
          </div>
          <div className="p-4 bg-haven-cream rounded-lg border border-haven-green/20">
            <p className="font-bold text-haven-green">Developer</p>
            <p className="text-gray-700">Quadri Kolawole Adisa</p>
          </div>
          <div className="p-4 bg-haven-cream rounded-lg border border-haven-green/20">
            <p className="font-bold text-haven-green">Developer</p>
            <p className="text-gray-700">Chidiebere Jared Iheke Egu</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Colors: Earthy Green • Terracotta • Cream
          </p>
        </div>
      </div>
    </main>
  );
}