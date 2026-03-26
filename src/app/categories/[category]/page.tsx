import { products } from "../../../lib/data";
import ProductCard from "../../ui/product-card";

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Unwrap the promise
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category.toLowerCase();

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categorySlug,
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {categorySlug} Products
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      )}
    </div>
  );
}
