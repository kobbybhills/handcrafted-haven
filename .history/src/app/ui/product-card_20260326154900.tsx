import Image from "next/image";

export default function ProductCard() {
  return (
    <div>
      <Image src="/images/basket.jpg" alt="Basket" width={300} height={300} />
      <p>Handmade Basket</p>
    </div>
  );
}
