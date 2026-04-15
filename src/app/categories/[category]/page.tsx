/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";
import ProductCard from "../../ui/product-card";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route"; // Added this import

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function CategoryPage({ params }: CategoryPageProps) {
  await delay(1500); 
  
  await connectDB();
  
  // Passing authOptions here is critical for the session to see the 'role'
  const session = await getServerSession(authOptions); 
  const userRole = (session?.user as { role?: string })?.role;

  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;

  const filteredProducts = await Product.find({ 
    category: { $regex: new RegExp(`^${categorySlug}$`, 'i') } 
  }).lean();

  return (
    <div className="px-6 py-12 md:p-10 md:pt-32 min-h-screen bg-[#fafaf9]">
      
      {/* Header Section */}
      <header className="mb-10 md:mb-16">
        <h1 className="text-4xl md:text-7xl font-black mb-4 capitalize tracking-tighter text-gray-900 italic leading-none">
          {categorySlug} <span className="text-amber-600">Collection</span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-amber-600"></span>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px]">
            {filteredProducts.length} Artisan Artifacts Found
          </p>
        </div>
      </header>

      {filteredProducts.length === 0 ? (
        <div className="bg-transparent md:bg-white p-12 md:p-20 rounded-[3rem] border-2 border-dashed border-stone-200 text-center">
          <p className="text-stone-400 text-base md:text-lg font-medium italic">
            The vault is currently empty for &quot;{categorySlug}&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10">
          {filteredProducts.map((product: any) => (
            <div key={product._id.toString()}>
              <ProductCard
                id={product._id.toString()}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                isLoggedIn={!!session}
                // FIXED: Now matches your signup/DB role
                isCustomer={userRole === "customer"} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}