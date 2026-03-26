import { products } from "../../../lib/data";
import ProductCard from "../../ui/product-card";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category;

  const filteredProducts = products.filter(
    (product: any) => product.category === category,
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold capitalize mb-8">
        {category} Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product: any) => (
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
