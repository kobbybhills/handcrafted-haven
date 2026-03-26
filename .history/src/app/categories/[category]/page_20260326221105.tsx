import { products } from "@/lib/data";
import ProductCard from "@/app/ui/product-card";

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Next.js 13 uses React server components, so we can just use params directly
  const categorySlug = params.category;

  // Filter products by category slug
  const filteredProducts = products.filter(
    (product) => product.category === categorySlug,
  );

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold capitalize mb-8">
        {categorySlug.replace("-", " ")} Products
      </h1>

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
    </div>
  );
}
