import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboardPage = (): JSX.Element => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Welcome to Log House Restaurant Admin Portal</h1>
      <p className="text-lg text-gray-700 mb-8">Manage your menu, reservations, orders, and promotions efficiently.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Card 1: Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h2 className="text-xl font-semibold text-[#4A2C2A] mb-2">Recent Orders</h2>
          <p className="text-gray-800 leading-relaxed">No recent orders to display.</p>
          <button className="mt-4 bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200">
            View All Orders
          </button>
        </div>

        {/* Placeholder Card 2: Upcoming Reservations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h2 className="text-xl font-semibold text-[#4A2C2A] mb-2">Upcoming Reservations</h2>
          <p className="text-gray-800 leading-relaxed">No upcoming reservations.</p>
          <button className="mt-4 bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200">
            View All Reservations
          </button>
        </div>

        {/* Placeholder Card 3: Menu Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h2 className="text-xl font-semibold text-[#4A2C2A] mb-2">Menu Items</h2>
          <p className="text-gray-800 leading-relaxed">Currently 0 items on the menu.</p>
          <button className="mt-4 bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200">
            Manage Menu
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;