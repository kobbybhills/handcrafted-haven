"use client";
import { useEffect, useState } from "react";
import AddProductForm from "../../components/AddProductForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

interface ChartDataPoint {
  date: string;
  amount: number;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("overview"); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [totalSales, setTotalSales] = useState(0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userRole = (session?.user as unknown as { role?: string })?.role || "buyer";

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setTotalSales(data.totalSales || 1080.50);
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
    fetchProducts();
    if (userRole === "seller") {
      fetchStats();
    }
  }, [userRole]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to remove this craft from the shop?")) return;
    setDeletingId(productId);
    try {
      const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setActiveTab("my-products");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafaf9]">
      
      {/* FIXED SIDEBAR */}
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
                : "text-gray-400 hover:bg-amber-50 hover:text-amber-800"
              }`}
            >
              <span className="text-xl">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Artisan Profile</p>
          <p className="font-black text-gray-900">{session?.user?.name || "Douglas"}</p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA - INDEPENDENT SCROLL */}
      <main className="flex-1 p-10 lg:p-16 overflow-y-auto h-full scroll-smooth">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-end mb-16">
            <div>
              <h1 className="text-6xl font-black text-gray-900 capitalize tracking-tighter">
                {activeTab.replace("-", " ")}
              </h1>
              <p className="text-gray-400 font-bold mt-2 italic">Welcome back, <span className="text-amber-600">{session?.user?.name || "Artisan"}</span></p>
            </div>
            <Link href="/" className="px-8 py-3 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all">
              View Public Shop
            </Link>
          </header>

          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-500 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-4 border-amber-600">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Sales</h3>
                  <p className="text-4xl font-black text-gray-900 mt-2">
                    ${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-4 border-amber-600">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Products</h3>
                  <p className="text-4xl font-black text-gray-900 mt-2">{products.length}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-4 border-amber-600">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Pending Actions</h3>
                  <p className="text-4xl font-black text-gray-900 mt-2">3</p>
                </div>
              </div>

              {userRole === "seller" && (
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
                  <h2 className="text-2xl font-black mb-8 text-gray-800">Revenue Trend</h2>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d97706" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="amount" stroke="#d97706" strokeWidth={4} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "my-products" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <h2 className="text-2xl font-black text-gray-800">Inventory</h2>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search crafts..." 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      className="pl-4 pr-10 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-500 outline-none w-full sm:w-64 transition-all" 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {loading ? (
                    <div className="py-20 text-center text-gray-400 font-bold animate-pulse">Loading workshop...</div>
                  ) : filteredProducts.map((product) => (
                    <div key={product._id} className="group p-4 flex items-center justify-between hover:bg-gray-50 rounded-3xl transition-all">
                      <div className="flex items-center gap-5">
                        <img src={product.image} className="w-16 h-16 object-cover rounded-2xl shadow-sm" alt="" />
                        <div>
                          <p className="font-black text-gray-900">{product.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <Link href={`/shop/${product._id}`} className="text-[10px] font-black uppercase text-amber-600 hover:underline">View</Link>
                            <button onClick={() => handleEditClick(product)} className="text-[10px] font-black uppercase text-blue-600">Edit</button>
                            <button 
                              onClick={() => handleDelete(product._id)} 
                              className="text-[10px] font-black uppercase text-red-400"
                            >
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

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 h-fit sticky top-0">
                <h2 className="text-2xl font-black mb-6 text-gray-800">
                  {editingProduct ? "Edit Craft" : "Add New Creation"}
                </h2>
                <AddProductForm 
                  initialData={editingProduct} 
                  onSuccess={() => { setEditingProduct(null); fetchProducts(); fetchStats(); }} 
                />
                {editingProduct && (
                  <button 
                    onClick={() => setEditingProduct(null)} 
                    className="mt-4 w-full py-3 text-sm font-black text-gray-400 hover:text-gray-600 transition"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>
            </div>
          )}

          {["orders", "reviews", "settings"].includes(activeTab) && (
            <div className="bg-white p-32 text-center rounded-[3rem] border-4 border-dashed border-gray-50 text-gray-300 font-black text-3xl uppercase tracking-tighter animate-in fade-in">
              Module Under Construction
            </div>
          )}
        </div>
      </main>
    </div>
  );
}