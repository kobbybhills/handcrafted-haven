import "./globals.css";

export default function Home() {
  return (
    <main className="min-h-screen bg-haven-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-haven-cream via-haven-cream to-haven-green/10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-haven-dark-green mb-6 leading-tight">
            Discover Handmade Treasures <br />
            Made with Love
          </h1>
          <p className="text-xl md:text-2xl text-haven-terracotta mb-10 max-w-3xl mx-auto">
            Unique, authentic creations from talented artisans around the world
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/shop"
              className="bg-haven-terracotta text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-haven-terracotta/90 transition"
            >
              Start Shopping
            </a>
            <a
              href="/sell"
              className="bg-transparent border-2 border-haven-dark-green text-haven-dark-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-haven-dark-green hover:text-white transition"
            >
              Sell Your Crafts
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories (placeholder cards) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-haven-dark-green mb-12">
            Explore Popular Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Jewelry", img: "/categories/jewelry.jpg" },
              { name: "Home Decor", img: "/categories/decor.jpg" },
              { name: "Clothing & Textiles", img: "/categories/textiles.jpg" },
              { name: "Pottery & Ceramics", img: "/categories/pottery.jpg" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="group bg-haven-cream rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder – replace with real images later */}
                  <p className="text-haven-dark-green font-medium">{cat.name}</p>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-haven-dark-green group-hover:text-haven-terracotta">
                    {cat.name}
                  </h3>
                  <a href={`/categories/${cat.name.toLowerCase().replace(" ", "-")}`} className="mt-4 inline-block text-haven-green hover:text-haven-terracotta">
                    View All →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action / Mission Snippet */}
      <section className="py-16 bg-haven-dark-green text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Support Artisans, Own Something Unique
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Every piece tells a story. Join our community of makers and collectors today.
          </p>
          <a
            href="/register"
            className="bg-white text-haven-dark-green px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Join Handcrafted Haven
          </a>
        </div>
      </section>
    </main>
  );
}