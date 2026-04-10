/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";
import ProductCard from "../../ui/product-card";
import { getServerSession } from "next-auth";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// 1. Artisan Delay: Forces the loading.tsx spinner to stay for a premium feel
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Trigger the rotating loader for 1.5 seconds
  await delay(1500); 
  
  await connectDB();
  
  // Get session to pass to ProductCard for role-based logic
  const session = await getServerSession(); 
  const userRole = (session?.user as { role?: string })?.role;

  // Resolve params for Next.js 15 compatibility
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;

  // Fetch products matching the category (case-insensitive)
  const filteredProducts = await Product.find({ 
    category: { $regex: new RegExp(`^${categorySlug}$`, 'i') } 
  }).lean();

  return (
    <div className="p-10 pt-32 min-h-screen bg-[#fafaf9]">
      <header className="mb-16">
        <h1 className="text-7xl font-black mb-4 capitalize tracking-tighter text-gray-900 italic">
          {categorySlug} <span className="text-amber-600">Collection</span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-amber-600"></span>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            {filteredProducts.length} Artisan Artifacts Found
          </p>
        </div>
      </header>

      {filteredProducts.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-stone-200 text-center shadow-inner">
          <p className="text-stone-400 text-lg font-medium italic">
            The vault is currently empty for &quot;{categorySlug}&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product: any) => (
            <div key={product._id.toString()}>
              <ProductCard
                id={product._id.toString()}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                isLoggedIn={!!session}
                isCustomer={userRole === "buyer"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}