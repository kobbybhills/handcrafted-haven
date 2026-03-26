import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative h-64 w-full">
        <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-haven-terracotta font-medium">${price}</p>
      </div>
    </div>
  );
}
