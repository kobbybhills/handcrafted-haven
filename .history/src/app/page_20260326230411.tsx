import Image from "next/image";

const categories = [
  { name: "Jewelry", slug: "jewelry", img: "/categories/jewelry.jpg" },
  { name: "Home Decor", slug: "decor", img: "/categories/decor.jpg" },
  {
    name: "Clothing & Textiles",
    slug: "textiles",
    img: "/categories/textiles.jpg",
  },
  {
    name: "Pottery & Ceramics",
    slug: "pottery",
    img: "/categories/pottery.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-haven-cream">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explore Popular Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="group bg-haven-cream rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="h-48 w-full relative">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold group-hover:text-haven-terracotta">
                    {cat.name}
                  </h3>
                  <a
                    href={`/categories/${cat.slug}`}
                    className="mt-4 inline-block text-haven-green hover:text-haven-terracotta"
                  >
                    View All →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
