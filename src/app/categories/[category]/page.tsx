/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";
import ProductCard from "../../ui/product-card";
import { getServerSession } from "next-auth";
// import { authOptions } from "../../api/auth/[...nextauth]/route"; // Ensure you import your auth config

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  await connectDB();
  
  // Get the session on the server to check login status
  const session = await getServerSession(); 
  const userRole = (session?.user as { role?: string })?.role;

  const resolvedParams = await params;
  const categorySlug = resolvedParams.category.toLowerCase();

  const filteredProducts = await Product.find({ 
    category: { $regex: new RegExp(`^${categorySlug}$`, 'i') } 
  }).lean();

  return (
    <div className="p-10 pt-32 min-h-screen bg-[#fafaf9]">
      <header className="mb-16">
        <h1 className="text-7xl font-black mb-4 capitalize tracking-tighter text-gray-900">
          {categorySlug} <span className="text-amber-600">Collection</span>
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
          {filteredProducts.length} unique pieces available
        </p>
      </header>

      {filteredProducts.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-dashed border-gray-200 text-center">
          <p className="text-gray-500 text-lg italic">
            No products found in the {categorySlug} category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product: any) => (
            <div key={product._id.toString()} className="group">
              <ProductCard
                id={product._id.toString()}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                // We pass the session data down to the card so the "Buy" 
                // button knows if the user is a logged-in customer.
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