"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import AddProductForm from "../../components/AddProductForm";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Star,
  Plus,
  Trash2,
  Edit3,
  Search,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// --- Types ---
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

interface Order {
  _id: string;
  customer?: { name: string; email: string };
  product?: { name: string; image: string; price: number };
  total: number;
  createdAt: string;
}

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  productId: string;
  createdAt: string;
}

interface ChartDataPoint {
  date: string;
  amount: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // --- State ---
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [totalSales, setTotalSales] = useState(0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const userRole = (session?.user as { role?: string })?.role || "buyer";

  // --- Data Fetching (Wrapped in useCallback to prevent re-renders) ---
  const fetchProducts = useCallback(async () => {
    const res = await fetch("/api/products");
    if (res.ok) setProducts(await res.json());
  }, []);

  const fetchReviews = useCallback(async () => {
    const res = await fetch("/api/reviews");
    if (res.ok) setReviews(await res.json());
  }, []);

  const fetchOrders = useCallback(async () => {
    const res = await fetch("/api/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
      setTotalSales(data.reduce((acc: number, curr: Order) => acc + (curr.total ?? 0), 0));
    }
  }, []);

  const fetchStats = useCallback(async () => {
    const res = await fetch("/api/admin/stats");
    if (res.ok) {
      const data = await res.json();
      setChartData(data.chartData || [
        { date: "Mon", amount: 400 }, { date: "Tue", amount: 300 },
        { date: "Wed", amount: 600 }, { date: "Thu", amount: 800 },
        { date: "Fri", amount: 500 },
      ]);
    }
  }, []);

  // --- Security & Data Loading ---
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && userRole !== "seller") router.push("/");

    const initDashboard = async () => {
      if (status === "authenticated" && userRole === "seller") {
        // Fixes the ESLint error by running fetches in parallel and async
        await Promise.all([
          fetchProducts(),
          fetchStats(),
          fetchReviews(),
          fetchOrders()
        ]);
      }
    };

    initDashboard();
  }, [status, userRole, router, fetchProducts, fetchStats, fetchReviews, fetchOrders]);

  // --- Handlers ---
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to remove this craft?")) return;
    setDeletingId(productId);
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Craft removed");
    }
    setDeletingId(null);
  };

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="font-black text-amber-600 animate-pulse uppercase tracking-tighter">
          Synchronizing Workshop...
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "my-products", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "reviews", label: "Feedback", icon: Star },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white md:bg-[#fafaf9]">
      {/* DESKTOP SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 p-10 hidden md:flex flex-col shrink-0 h-full">
        <h2 className="text-xl font-black text-amber-950 uppercase tracking-tighter mb-14">Handcrafted</h2>
        <nav className="space-y-3 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all duration-200 ${
                activeTab === item.id 
                ? "bg-amber-600 text-white shadow-xl translate-x-1" 
                : "text-gray-400 hover:bg-amber-50"
              }`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MOBILE STICKY HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tight capitalize">
          {isAddingProduct ? "New Product" : activeTab.replace("-", " ")}
        </h1>
        {isAddingProduct && (
          <button onClick={() => setIsAddingProduct(false)} className="text-sm font-bold text-amber-600">Cancel</button>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto h-full pt-20 pb-24 md:pt-16 md:px-16 scroll-smooth">
        <div className="max-w-6xl mx-auto px-6 md:px-0">
          
          {/* DESKTOP TITLE */}
          <header className="hidden md:flex justify-between items-end mb-16">
            <div>
              <h1 className="text-6xl font-black text-gray-900 capitalize tracking-tighter">
                {activeTab.replace("-", " ")}
              </h1>
              <p className="text-gray-400 font-bold mt-2">Artisan: <span className="text-amber-600">{session?.user?.name}</span></p>
            </div>
            <Link href="/" className="px-8 py-3 bg-white border border-gray-200 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all">
              View Shop
            </Link>
          </header>

          <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 divide-y md:divide-y-0 border-y md:border-y-0 border-gray-100">
                  <div className="py-6 md:bg-white md:p-8 md:rounded-3xl md:shadow-sm md:border-l-4 md:border-amber-600">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Sales</h3>
                    <p className="text-4xl font-black text-gray-900 mt-1">${totalSales.toFixed(2)}</p>
                  </div>
                  <div className="py-6 md:bg-white md:p-8 md:rounded-3xl md:shadow-sm md:border-l-4 md:border-amber-600">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Products</h3>
                    <p className="text-4xl font-black text-gray-900 mt-1">{products.length}</p>
                  </div>
                  <div className="py-6 md:bg-white md:p-8 md:rounded-3xl md:shadow-sm md:border-l-4 md:border-amber-600">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reviews</h3>
                    <p className="text-4xl font-black text-gray-900 mt-1">{reviews.length}</p>
                  </div>
                </div>

                    <div className="md:bg-white md:p-10 md:rounded-[2.5rem] md:border border-gray-50">
                      <h2 className="text-xl md:text-2xl font-black mb-8">Revenue Analytics</h2>
                      
                      <div className="h-64 md:h-80 w-full min-h-75">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                            <YAxis hide={true} />
                            <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="amount" stroke="#d97706" strokeWidth={4} fill="#d9770610" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
              </div>
            )}

            {/* PRODUCT INVENTORY */}
            {activeTab === "my-products" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className={isAddingProduct ? "hidden md:block" : "block"}>
                  <div className="relative mb-6">
                    <Search className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search items..." 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      className="w-full pl-8 md:pl-12 pr-4 py-3 bg-transparent md:bg-gray-50 border-b md:border-none border-gray-100 rounded-none md:rounded-2xl outline-none" 
                    />
                  </div>
                  <div className="divide-y divide-gray-100 md:divide-y-0 md:space-y-4">
                    {filteredProducts.map((product) => (
                      <div key={product._id} className="flex items-center justify-between py-5 md:p-4 md:bg-white md:rounded-3xl md:shadow-sm active:scale-[0.98] transition-transform">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-gray-100">
                                <Image 
                                  src={product.image || "https://placehold.co/400x400?text=No+Image"} 
                                  alt={product.name} 
                                  fill 
                                  sizes="64px" 
                                  className="object-cover" 
                                />
                              </div>
                          <div className="flex gap-4 mt-1">
                              {/* Edit Button */}
                              <button 
                                onClick={() => {setEditingProduct(product); setIsAddingProduct(true)}} 
                                className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-1"
                              >
                                <Edit3 size={12}/> Edit
                              </button>

                              {/* Delete Button - Updated for logic and linter fix */}
                              <button 
                                onClick={() => handleDelete(product._id)} 
                                disabled={deletingId === product._id}
                                className="text-[10px] font-black uppercase text-red-400 flex items-center gap-1 disabled:opacity-50"
                              >
                                {deletingId === product._id ? (
                                  <>
                                    <span className="animate-spin inline-block">...</span> Removing
                                  </>
                                ) : (
                                  <>
                                    <Trash2 size={12}/> Delete
                                  </>
                                )}
                              </button>
                            </div>
                        </div>
                        <p className="font-black text-gray-900">${product.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${isAddingProduct ? 'block' : 'hidden md:block'} md:sticky md:top-10 h-fit bg-white md:p-8 md:rounded-[2.5rem] md:border border-gray-100`}>
                  <AddProductForm initialData={editingProduct} onSuccess={() => { setEditingProduct(null); setIsAddingProduct(false); fetchProducts(); }} />
                </div>
              </div>
            )}

            {/* ORDERS & REVIEWS */}
            {(activeTab === "orders" || activeTab === "reviews") && (
              <div className="divide-y divide-gray-100 md:divide-y-0 md:space-y-4">
                {activeTab === "orders" ? (
                  orders.map((order) => (
                    <div key={order._id} className="flex items-center justify-between py-5 md:p-6 md:bg-white md:rounded-3xl md:border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs uppercase">
                          {order.customer?.name?.charAt(0) || "G"}
                        </div>
                        <div>
                          <p className="font-bold text-sm md:text-base">{order.product?.name || "Bespoke Item"}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{order.customer?.name}</p>
                        </div>
                      </div>
                      <p className="font-black text-sm md:text-lg">${(order.total ?? 0).toFixed(2)}</p>
                    </div>
                  ))
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="py-6 md:p-8 md:bg-white md:rounded-3xl md:border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-bold text-sm md:text-base">{review.userName}</p>
                        <div className="flex text-amber-500 text-[10px]">{"★".repeat(review.rating)}</div>
                      </div>
                      <p className="text-gray-500 text-sm italic leading-relaxed">{"\""}{review.comment}{"\""}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* MOBILE FAB */}
      {activeTab === "my-products" && !isAddingProduct && (
        <button 
          onClick={() => setIsAddingProduct(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-amber-600 text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all z-50 md:hidden"
        >
          <Plus size={28} />
        </button>
      )}

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center px-4 pb-8 pt-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {setActiveTab(item.id); setIsAddingProduct(false)}}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id ? "text-amber-600 scale-110" : "text-gray-300"
            }`}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}