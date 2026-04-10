"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
  };
  product: {
    name: string;
    image: string;
    price: number;
  };
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function OrdersModule() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState(""); 
  const [imageStates, setImageStates] = useState<Record<string, {loading: boolean; error: boolean}>>({});


  useEffect(() => {
    if (_error) {
      console.error("Orders fetch error:", _error);
    }
  }, [_error]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
        // Initialize image states for all orders
        const initialImageStates: Record<string, {loading: boolean; error: boolean}> = {};
        data.forEach((order: Order) => {
          initialImageStates[order._id] = { loading: true, error: false };
        });
        setImageStates(initialImageStates);
      } catch (_error) {
        setError("Could not load orders. Check your connection.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="h-12 w-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-amber-900 font-bold tracking-tight">Loading orders...</p>
      </div>
    );
  }

  if (_error) {
    return (
      <div className="p-8 bg-red-50 border border-red-100 rounded-2xl text-red-700 font-medium text-center">
        {_error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-amber-100 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Orders</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and track your handcrafted sales</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-5 py-2 rounded-2xl border border-amber-100">
          <span className="h-2 w-2 bg-amber-600 rounded-full animate-ping"></span>
          <span className="text-amber-900 font-black text-sm uppercase tracking-widest">
            {orders.length} Total Sales
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              <th className="px-4 pb-2">Product Details</th>
              <th className="px-4 pb-2">Customer Info</th>
              <th className="px-4 pb-2">Order Date</th>
              <th className="px-4 pb-2 text-right">Revenue</th>
              <th className="px-4 pb-2 text-center">Fulfillment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order._id} className="group hover:bg-gray-50/80 transition-all duration-200">
                <td className="px-4 py-5 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-100 border border-amber-50">
                    {(() => {
                      const orderId = order._id;
                      const imgState = imageStates[orderId] || { loading: true, error: false };
                      const imgSrc = order.product?.image;
                      const imgAlt = order.product?.name || 'Product';

                      const setImageLoaded = (success: boolean) => {
                        setImageStates(prev => ({
                          ...prev,
                          [orderId]: { loading: false, error: !success }
                        }));
                      };

                      if (imgState.loading) {
                        return (
                          <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 animate-pulse rounded-md" />
                        );
                      }

                      if (imgState.error || !imgSrc) {
                        return (
                          <div className="w-full h-full bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center text-xs font-black text-amber-600">
                            🏺
                          </div>
                        );
                      }

                      return (
                        <Image
                          src={imgSrc}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          alt={imgAlt}
                          fill
                          unoptimized
                          onLoad={() => setImageLoaded(true)}
                          onError={() => setImageLoaded(false)}
                        />
                      );
                    })()}
                  </div>
                  <div>
                    <div className="font-black text-gray-900 leading-tight">{order.product?.name}</div>
                    <div className="text-xs text-amber-600 font-bold mt-1 uppercase">ID: {order._id.slice(-6)}</div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="text-sm font-black text-gray-900">{order.customer?.name}</div>
                  <div className="text-xs text-gray-500 font-medium italic">{order.customer?.email}</div>
                </td>
                <td className="px-4 py-5 text-sm font-bold text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-4 py-5 text-right">
                  <span className="text-lg font-black text-amber-900 italic">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200' 
                    : 'bg-green-100 text-green-700 ring-1 ring-green-200'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {orders.length === 0 && (
        <div className="py-32 text-center">
          <div className="text-5xl mb-4 opacity-30">🏺</div>
          <p className="text-gray-400 text-lg font-medium italic">
            The kiln is cold. No orders have been placed yet.
          </p>
        </div>
      )}
    </div>
  );
}