import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Welcome to Log House Restaurant Admin Portal</h1>
      <p className="text-lg text-gray-700 mb-8">Manage your menu, reservations, orders, and promotions efficiently.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Card 1: Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Recent Orders</h2>
          <p className="text-gray-600">No new orders in the last hour.</p>
          <button className="mt-4 text-[#F7C548] hover:text-[#E0B03C] transition-all duration-200">View All Orders</button>
        </div>

        {/* Placeholder Card 2: Upcoming Reservations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Upcoming Reservations</h2>
          <p className="text-gray-600">2 reservations for tonight.</p>
          <button className="mt-4 text-[#F7C548] hover:text-[#E0B03C] transition-all duration-200">View All Reservations</button>
        </div>

        {/* Placeholder Card 3: Menu Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Menu Items</h2>
          <p className="text-gray-600">5 items currently unavailable.</p>
          <button className="mt-4 text-[#F7C548] hover:text-[#E0B03C] transition-all duration-200">Manage Menu</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;