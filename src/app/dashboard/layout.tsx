export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <nav className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-haven-dark-green mb-6">Seller Dashboard</h2>
          <ul className="space-y-2">
            <li><a href="/dashboard" className="block py-2 px-4 hover:bg-haven-cream rounded">Overview</a></li>
            <li><a href="/dashboard/products" className="block py-2 px-4 hover:bg-haven-cream rounded">My Products</a></li>
            <li><a href="/dashboard/orders" className="block py-2 px-4 hover:bg-haven-cream rounded">Orders</a></li>
            <li><a href="/dashboard/reviews" className="block py-2 px-4 hover:bg-haven-cream rounded">Reviews</a></li>
            <li><a href="/dashboard/settings" className="block py-2 px-4 hover:bg-haven-cream rounded">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-haven-cream">
        {children}
      </main>
    </div>
  );
}