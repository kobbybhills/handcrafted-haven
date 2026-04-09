// src/app/dashboard/products/page.tsx
// export default function ProductsPage() {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold text-haven-dark-green">My Products</h1>
//         <button className="bg-haven-green text-white px-6 py-3 rounded-xl font-medium">
//           + Add New Product
//         </button>
//       </div>
//       <p className="text-gray-500">Your listed crafts will appear here.</p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ProductStatus = "active" | "draft";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  materials: string;
  createdAt: string;
}

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: ProductStatus;
  description: string;
  materials: string;
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const SEED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Hand-woven Raffia Basket",
    category: "Weaving",
    price: 4500,
    stock: 12,
    status: "active",
    description: "Traditional Yoruba raffia basket, naturally dyed with earthy tones.",
    materials: "Raffia, natural dye",
    createdAt: "2025-03-10",
  },
  {
    id: "2",
    name: "Adire Indigo Fabric (2 yds)",
    category: "Textile",
    price: 6800,
    stock: 5,
    status: "active",
    description: "Authentic tie-dye adire cloth from Abeokuta artisans.",
    materials: "Cotton, indigo dye",
    createdAt: "2025-03-18",
  },
  {
    id: "3",
    name: "Carved Iroko Serving Tray",
    category: "Woodwork",
    price: 12000,
    stock: 3,
    status: "active",
    description: "Hand-carved hardwood tray with geometric relief patterns.",
    materials: "Iroko wood, linseed oil",
    createdAt: "2025-04-01",
  },
  {
    id: "4",
    name: "Beaded Gele Headpiece",
    category: "Accessories",
    price: 8500,
    stock: 0,
    status: "draft",
    description: "Festive gele adorned with hand-strung seed beads.",
    materials: "Aso-oke, seed beads",
    createdAt: "2025-04-05",
  },
];

const CATEGORIES = [
  "Weaving",
  "Textile",
  "Woodwork",
  "Pottery",
  "Accessories",
  "Leather",
  "Jewellery",
  "Other",
];

const EMPTY_FORM: ProductFormData = {
  name: "",
  category: "",
  price: "",
  stock: "",
  status: "active",
  description: "",
  materials: "",
};

const CATEGORY_COLORS: Record<string, string> = {
  Weaving:     "bg-amber-100 text-amber-800",
  Textile:     "bg-blue-100 text-blue-800",
  Woodwork:    "bg-orange-100 text-orange-800",
  Pottery:     "bg-rose-100 text-rose-800",
  Accessories: "bg-purple-100 text-purple-800",
  Leather:     "bg-yellow-100 text-yellow-800",
  Jewellery:   "bg-pink-100 text-pink-800",
  Other:       "bg-gray-100 text-gray-600",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Stock Badge ──────────────────────────────────────────────────────────────
function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
        Out of stock
      </span>
    );
  if (stock <= 5)
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
        {stock} left
      </span>
    );
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
      {stock} in stock
    </span>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ProductStatus }) {
  return status === "active" ? (
    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-haven-green/10 text-haven-green border border-haven-green/20">
      Active
    </span>
  ) : (
    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
      Draft
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}) {
  const catColor = CATEGORY_COLORS[product.category] ?? CATEGORY_COLORS.Other;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 hover:border-haven-green/40 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image / thumbnail area */}
      <div className="h-36 bg-gradient-to-br from-haven-green/5 to-haven-terracotta/10 flex items-center justify-center relative">
        <span className="text-5xl select-none opacity-50">🪡</span>
        <div className="absolute top-3 right-3">
          <StatusBadge status={product.status} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Category pill */}
        <span
          className={`self-start text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${catColor}`}
        >
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-semibold text-haven-dark-green text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Materials */}
        <p className="text-xs text-gray-400 italic line-clamp-1">{product.materials}</p>

        {/* Price + stock row */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <p className="text-base font-bold text-haven-dark-green">{formatNaira(product.price)}</p>
          <StockBadge stock={product.stock} />
        </div>

        {/* Action buttons — revealed on hover */}
        <div className="flex gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 text-xs font-semibold py-1.5 rounded-lg border border-haven-green/30 text-haven-green hover:bg-haven-green/5 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 text-xs font-semibold py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add / Edit Slide-in Panel ────────────────────────────────────────────────
function ProductFormPanel({
  initial,
  onSave,
  onClose,
}: {
  initial?: Product;
  onSave: (data: ProductFormData) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProductFormData>(
    initial
      ? {
          name: initial.name,
          category: initial.category,
          price: String(initial.price),
          stock: String(initial.stock),
          status: initial.status,
          description: initial.description,
          materials: initial.materials,
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  function set(field: keyof ProductFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof ProductFormData, string>> = {};
    if (!form.name.trim()) e.name = "Product name is required.";
    if (!form.category) e.category = "Select a category.";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Enter a valid price.";
    if (form.stock === "" || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      e.stock = "Enter a valid stock quantity.";
    if (!form.description.trim()) e.description = "Add a short description.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSave(form);
  }

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-haven-cream px-3 py-2.5 text-sm text-haven-dark-green placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-haven-green/30 focus:border-haven-green transition";

  const labelCls = "block text-xs font-semibold text-haven-dark-green mb-1.5";

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(27,58,27,0.2)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        className="relative h-full w-full max-w-md bg-haven-cream shadow-2xl flex flex-col overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-haven-dark-green">
              {initial ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {initial
                ? "Update your listing details."
                : "List a new handcrafted item for buyers to discover."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="flex-1 px-6 py-6 flex flex-col gap-5">

          <div>
            <label className={labelCls}>Product name *</label>
            <input
              className={inputCls}
              placeholder="e.g. Hand-woven Raffia Basket"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className={labelCls}>Category *</label>
            <select
              className={inputCls}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Price (₦) *</label>
              <input
                className={inputCls}
                type="number"
                min="0"
                placeholder="4500"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className={labelCls}>Stock qty *</label>
              <input
                className={inputCls}
                type="number"
                min="0"
                placeholder="10"
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
              />
              {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Materials used</label>
            <input
              className={inputCls}
              placeholder="e.g. Raffia, natural dye, bamboo"
              value={form.materials}
              onChange={(e) => set("materials", e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Description *</label>
            <textarea
              className={`${inputCls} resize-none`}
              rows={4}
              placeholder="Describe your craft — its story, technique, and what makes it special…"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Status toggle */}
          <div>
            <label className={labelCls}>Listing status</label>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              {(["active", "draft"] as ProductStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("status", s)}
                  className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-colors ${
                    form.status === s
                      ? "bg-haven-green text-white"
                      : "bg-white text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              {form.status === "active"
                ? "Visible to buyers in the shop immediately."
                : "Saved privately — publish when you're ready."}
            </p>
          </div>

          {/* CTA row */}
          <div className="pt-2 flex gap-3 sticky bottom-0 bg-haven-cream pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-haven-terracotta hover:bg-[#b5613f] text-white text-sm font-semibold transition-colors"
            >
              {initial ? "Save changes" : "Add product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-haven-green/8 flex items-center justify-center text-4xl mb-5 select-none">
        🧵
      </div>
      <h3 className="text-lg font-bold text-haven-dark-green mb-2">No products yet</h3>
      <p className="text-sm text-gray-400 max-w-xs mb-6">
        Start listing your handcrafted work. Each listing helps buyers discover what makes your craft unique.
      </p>
      <button
        onClick={onAdd}
        className="bg-haven-terracotta hover:bg-[#b5613f] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
      >
        + Add your first product
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | undefined>(undefined);
  const [filter, setFilter] = useState<"all" | "active" | "draft">("all");
  const [search, setSearch] = useState("");

  const totalActive = products.filter((p) => p.status === "active").length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  const visible = products.filter((p) => {
    const matchFilter = filter === "all" || p.status === filter;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  function openAdd() {
    setEditTarget(undefined);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditTarget(p);
    setShowForm(true);
  }

  function handleSave(data: ProductFormData) {
    if (editTarget) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editTarget.id
            ? { ...p, ...data, price: Number(data.price), stock: Number(data.stock) }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: generateId(),
        name: data.name,
        category: data.category,
        price: Number(data.price),
        stock: Number(data.stock),
        status: data.status,
        description: data.description,
        materials: data.materials,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setShowForm(false);
  }

  function handleDelete(id: string) {
    if (confirm("Remove this product from your listings?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-haven-dark-green">My Products</h1>
          <p className="text-sm text-gray-400 mt-1">
            {products.length} listing{products.length !== 1 ? "s" : ""} · {totalActive} active
          </p>
        </div>
        <button
          onClick={openAdd}
          className="self-start sm:self-auto bg-haven-terracotta hover:bg-[#b5613f] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
        >
          + Add New Product
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total listings", value: products.length, color: "text-haven-dark-green" },
          { label: "Active", value: totalActive, color: "text-haven-green" },
          { label: "Low stock", value: lowStock, color: "text-amber-600" },
          { label: "Out of stock", value: outOfStock, color: "text-red-500" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 px-4 py-4 shadow-sm"
          >
            <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 3a6 6 0 100 12A6 6 0 009 3zM1 9a8 8 0 1114.32 4.906l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A8 8 0 011 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white text-haven-dark-green placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-haven-green/30 focus:border-haven-green transition"
          />
        </div>

        <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden self-start">
          {(["all", "active", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                filter === f
                  ? "bg-haven-green text-white"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <EmptyState onAdd={openAdd} />
      ) : visible.length === 0 ? (
        <div className="py-20 text-center text-gray-400 text-sm">
          No products match your search or filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onEdit={openEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Slide-in form panel */}
      {showForm && (
        <ProductFormPanel
          initial={editTarget}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
