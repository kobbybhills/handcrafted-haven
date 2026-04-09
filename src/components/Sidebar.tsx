'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const sellerMenu = [
    { name: "Overview", href: "/dashboard", icon: "🏠" },
    { name: "My Products", href: "/dashboard/products", icon: "🛍️" },
    { name: "Orders", href: "/dashboard/orders", icon: "📋" },
    { name: "Reviews", href: "/dashboard/reviews", icon: "⭐" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 p-8 hidden md:flex flex-col h-screen sticky top-0">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-haven-dark-green">Seller Dashboard</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {sellerMenu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-[#CC7351] text-white font-bold shadow-md" 
                  : "text-gray-600 hover:bg-haven-cream hover:text-haven-dark-green"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-gray-100">
        <p className="text-xs text-gray-400">Need help?</p>
        <Link href="/contact" className="text-sm text-haven-green hover:underline">
          Contact Support
        </Link>
      </div>
    </aside>
  );
}