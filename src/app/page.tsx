import Image from "next/image";
import Link from "next/link";

const categories = [
  { 
    name: "Jewelry", 
    slug: "jewelry", 
    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    name: "Home Decor", 
    slug: "home-decor", 
    img: "https://th.bing.com/th/id/OIP.Hb5pvZ1HNNCT2q8JiISzpQHaHa?w=170&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
  },
  { 
    name: "Clothing & Textiles", 
    slug: "textiles", 
    img: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800" 
  },
  { 
    name: "Pottery & Ceramics", 
    slug: "pottery", 
    img: "https://th.bing.com/th/id/OIP.333ZlfpQMV19z3fNyQ9IYAHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" 
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-350 mx-auto px-6 lg:px-16">
          
          <div className="mb-20">
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-6">
              Explore Popular <br />
              <span className="text-amber-600">Categories</span>
            </h2>
            <p className="text-gray-400 font-bold italic text-lg max-w-xl border-l-4 border-amber-100 pl-6">
              Discover the soul of African craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="h-72 w-full relative overflow-hidden bg-gray-100">
                  {cat.img ? (
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 font-black">IMAGE PENDING</div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 mb-2 block">
                    Collection
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4 group-hover:text-amber-600 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                    View All <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}