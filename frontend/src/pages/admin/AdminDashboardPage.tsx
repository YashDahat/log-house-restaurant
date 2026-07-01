import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Welcome to Log House Restaurant Admin Portal</h1>
      <p className="text-lg text-gray-700 mb-8">Manage your menu, reservations, orders, and promotions efficiently.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Orders</h2>
          <p className="text-gray-600">No recent orders to display.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Upcoming Reservations</h2>
          <p className="text-gray-600">No upcoming reservations.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Menu Items</h2>
          <p className="text-gray-600">View and manage your menu items.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;