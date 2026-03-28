// src/app/categories/[category]/page.tsx
import ProductCard from "../../ui/product-card";
import { products } from "../../../lib/data";

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Now params.category is available correctly
  const category = params.category.toLowerCase();

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category,
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold capitalize mb-8">
        {category.replace("-", " ")} Products
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-lg text-gray-500">
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
