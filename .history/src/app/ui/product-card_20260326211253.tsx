import Image from "next/image";

export default function ProductCard({ name, price, image }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="relative w-full h-48">
        <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
      </div>

      <h3 className="mt-4 font-semibold">{name}</h3>
      <p className="text-haven-terracotta">${price}</p>
    </div>
  );
}
