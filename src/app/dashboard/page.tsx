"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Added for optimization
import { toast } from "react-hot-toast"; // Added for notifications
import AddProductForm from "../../components/AddProductForm";
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

  const userRole = (session?.user as { role?: string })?.role || "buyer";

  // --- Security ---
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated" && userRole !== "seller") {
      router.push("/");
    }
  }, [status, userRole, router]);

  // --- Data Fetching ---
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        const total = data.reduce((acc: number, curr: Order) => acc + (curr.total ?? 0), 0);
        setTotalSales(total);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setChartData(data.chartData || [
          { date: "Mon", amount: 400 },
          { date: "Tue", amount: 300 },
          { date: "Wed", amount: 600 },
          { date: "Thu", amount: 800 },
          { date: "Fri", amount: 500 },
        ]);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && userRole === "seller") {
      fetchProducts();
      fetchStats();
      fetchReviews();
      fetchOrders();
    }
  }, [status, userRole]);

  // --- Handlers ---
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (productId: string) => {
    // Keep standard confirm for safety, but use Toast for the result
    if (!confirm("Are you sure you want to remove this craft from the workshop?")) return;
    
    setDeletingId(productId);
    try {
      const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Craft removed from inventory", {
          style: {
            borderRadius: '1rem',
            background: '#1c1917',
            color: '#fff',
            fontWeight: '900',
            fontSize: '11px',
            textTransform: 'uppercase',
          }
        });
      } else {
        toast.error("Could not remove item");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setActiveTab("my-products");
    toast("Editing mode enabled", { icon: '✏️' });
  };

  if (status === "loading" || (status === "authenticated" && userRole !== "seller")) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="font-black text-amber-600 animate-pulse text-2xl tracking-tighter uppercase">
          Verifying Workshop Access...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafaf9]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 p-10 hidden md:flex flex-col shrink-0 h-full">
        <div className="mb-14">
          <h2 className="text-xl font-black text-amber-950 uppercase tracking-tighter">Handcrafted</h2>
        </div>
        
        <nav className="space-y-3 flex-1 overflow-y-auto">
          {[
            { id: "overview", label: "Dashboard", icon: "📊" },
            { id: "my-products", label: "Inventory", icon: "🎨" },
            { id: "orders", label: "Orders", icon: "📦" },
            { id: "reviews", label: "Feedback", icon: "⭐" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl font-black transition-all duration-300 ${
                activeTab === tab.id 
                ? "bg-amber-600 text-white shadow-xl shadow-amber-200 translate-x-2" 
                : "text-gray-400 hover:bg-amber-50"
              }`}
            >
              <span className="text-xl">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-50">
          <p className="font-black text-gray-900">{session?.user?.name}</p>
          <p className="text-[9px] text-amber-600 font-bold uppercase tracking-widest">{userRole}</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 lg:p-16 overflow-y-auto h-full scroll-smooth">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-end mb-16">
            <div>
              <h1 className="text-6xl font-black text-gray-900 capitalize tracking-tighter">
                {activeTab.replace("-", " ")}
              </h1>
              <p className="text-gray-400 font-bold mt-2">
                Artisan: <span className="text-amber-600">{session?.user?.name}</span>
              </p>
            </div>
            <Link href="/" className="px-8 py-3 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all">
              View Public Shop
            </Link>
          </header>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-500 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-4 border-amber-600">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Sales</h3>
                  <p className="text-4xl font-black text-gray-900 mt-2">${totalSales.toFixed(2)}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-4 border-amber-600">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Products</h3>
                  <p className="text-4xl font-black text-gray-900 mt-2">{products.length}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-4 border-amber-600">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Customer Reviews</h3>
                  <p className="text-4xl font-black text-gray-900 mt-2">{reviews.length}</p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
                <h2 className="text-2xl font-black mb-8 text-gray-800">Revenue Trend</h2>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                      <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="amount" stroke="#d97706" strokeWidth={4} fill="#d9770620" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY */}
          {activeTab === "my-products" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                <input 
                  type="text" 
                  placeholder="Search inventory..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-4 py-3 mb-6 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all" 
                />
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-3xl transition-all">
                      <div className="flex items-center gap-5">
                        <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-2xl shadow-sm">
                           <Image 
                             src={product.image} 
                             alt={product.name}
                             fill
                             className="object-cover"
                           />
                        </div>
                        <div>
                          <p className="font-black text-gray-900">{product.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <button onClick={() => handleEditClick(product)} className="text-[10px] font-black uppercase text-blue-600">Edit</button>
                            <button onClick={() => handleDelete(product._id)} className="text-[10px] font-black uppercase text-red-400">
                              {deletingId === product._id ? "..." : "Delete"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="font-black text-xl text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 h-fit sticky top-10">
                <h2 className="text-2xl font-black mb-6 text-gray-800">{editingProduct ? "Edit Craft" : "Add New Creation"}</h2>
                <AddProductForm initialData={editingProduct} onSuccess={() => { setEditingProduct(null); fetchProducts(); }} />
              </div>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === "orders" && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 animate-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-black mb-8 text-gray-800">Recent Sales</h2>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="py-20 text-center text-gray-300 font-bold">No orders found.</div>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-amber-200 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-sm">
                           <Image 
                             src={order.product?.image || "/placeholder.png"} 
                             alt="Order"
                             fill
                             className="object-cover"
                           />
                        </div>
                        <div>
                          <p className="font-black text-gray-900">{order.product?.name || "Artisan Item"}</p>
                          <p className="text-xs text-gray-400 font-bold">Buyer: {order.customer?.name || "Guest User"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-gray-900 text-lg">
                          ${(order?.total ?? 0).toFixed(2)}
                        </p>
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Paid</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* FEEDBACK */}
          {activeTab === "reviews" && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 animate-in fade-in duration-500">
              <h2 className="text-2xl font-black mb-8 text-gray-800">Shop Feedback</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review._id} className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-black text-gray-900 text-lg">{review.userName}</p>
                      <div className="text-amber-500">{"★".repeat(review.rating)}</div>
                    </div>
                    <p className="text-gray-600 italic leading-relaxed">&quot;{review.comment}&quot;</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 animate-in fade-in">
              <h2 className="text-2xl font-black mb-8 text-gray-800">Workshop Configuration</h2>
              <div className="space-y-8 max-w-md">
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                    <p className="font-bold text-amber-900">System Live</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 px-2">Account Email</label>
                  <div className="p-4 bg-gray-50 rounded-2xl font-bold text-gray-500 border border-gray-100">{session?.user?.email}</div>
                </div>
                <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-amber-600 transition-all shadow-lg shadow-gray-200">
                  Save Artisan Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}