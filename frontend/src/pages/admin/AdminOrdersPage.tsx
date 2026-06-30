import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

// Define interfaces based on the API contract
interface OrderItem {
  menuItemName: string;
  quantity: number;
  price: number;
}

interface OrderResponse {
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  orderItems: OrderItem[];
}

interface UpdateOrderStatusRequest {
  status: string;
}

const AdminOrdersPage = (): JSX.Element => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/admin/orders'); // order-management-api
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: OrderResponse[] = await response.json();
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      const requestBody: UpdateOrderStatusRequest = { status };
      const response = await fetch(`/api/v1/admin/orders/${orderId}/status`, { // order-management-api
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the orders list after successful update
      fetchOrders();
      setEditingOrderId(null); // Close the status editor
    } catch (err) {
      setError('Failed to update order status. Please try again.');
      console.error('Error updating order status:', err);
    }
  };

  const availableStatuses = ['RECEIVED', 'PREPARING', 'READY_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Order Management</h1>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F7C548] mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading orders...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <div className="text-center py-16">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Looks like there are no new orders to manage yet.
          </p>
        </div>
      )}

      {!isLoading && !error && orders.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Order Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.orderId.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {editingOrderId === order.orderId ? (
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#F7C548] focus:border-[#F7C548] sm:text-sm rounded-md"
                      >
                        {availableStatuses.map((statusOption) => (
                          <option key={statusOption} value={statusOption}>
                            {statusOption}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'DELIVERED'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <ul className="list-disc list-inside">
                      {order.orderItems.map((item, index) => (
                        <li key={index}>
                          {item.quantity}x {item.menuItemName} (${item.price.toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingOrderId === order.orderId ? (
                      <>
                        <button
                          onClick={() => handleStatusChange(order.orderId, newStatus)}
                          className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-3 py-1 mr-2 transition-all duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingOrderId(null)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-3 py-1 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingOrderId(order.orderId);
                          setNewStatus(order.status);
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-3 py-1 transition-all duration-200"
                      >
                        Update Status
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;