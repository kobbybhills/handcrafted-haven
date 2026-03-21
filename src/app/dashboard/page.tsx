export default function Dashboard() {
  // In real app, this would come from auth context/session
  const userRole = "seller"; // or "buyer" — temporary hardcoded

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {userRole === "seller" ? "Seller Dashboard" : "Your Account"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
          <p className="text-3xl font-bold text-amber-600 mt-2">$0.00</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">
            {userRole === "seller" ? "Active Products" : "Orders"}
          </h3>
          <p className="text-3xl font-bold text-amber-600 mt-2">0</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Pending Actions</h3>
          <p className="text-3xl font-bold text-amber-600 mt-2">3</p>
        </div>
      </div>

      {/* Next sections - placeholders */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          {userRole === "seller" ? "Recent Orders" : "Recent Purchases"}
        </h2>
        <p className="text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
}