import Image from "next/image";

export default function ProductCard() {
  return (
    <div>
      <Image src="/images/pottery.jpg" alt="Basket" width={300} height={300} />
      <p>Handmade Ceramics</p>
    </div>
  );
}
