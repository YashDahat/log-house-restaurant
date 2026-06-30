import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import axios from 'axios'; // Assuming axios is installed and used for API calls

// --- Type Definitions (inferred from instruction) ---
type OrderStatus = 'RECEIVED' | 'PREPARING' | 'READY_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

interface OrderItem {
  menuItemName: string;
  quantity: number;
  price: number;
}

interface OrderResponse {
  id: string; // Corresponds to orderId
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  orderItems: OrderItem[];
}

interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<OrderResponse[]>('/api/v1/admin/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await axios.patch(`/api/v1/admin/orders/${orderId}/status`, { status: newStatus } as UpdateOrderStatusRequest);
      // Optimistically update the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(`Failed to update status for order ${orderId}:`, err);
      setError('Failed to update order status. Please try again.');
      // Refetch to ensure data consistency if optimistic update failed
      fetchOrders();
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'RECEIVED':
        return 'bg-blue-100 text-blue-800';
      case 'PREPARING':
        return 'bg-yellow-100 text-yellow-800';
      case 'READY_FOR_DELIVERY':
        return 'bg-green-100 text-green-800';
      case 'DELIVERED':
        return 'bg-purple-100 text-purple-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Order Management</h1>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#F7C548]" />
              <p className="ml-2 text-gray-700">Loading orders...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">No orders found.</p>
              <p className="text-gray-500">Check back later for new orders.</p>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 text-gray-700 font-semibold">
                    <TableHead className="w-[150px]">Order ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Order Items</TableHead>
                    <TableHead className="w-[180px]">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside text-sm text-gray-800">
                          {order.orderItems.map((item, index) => (
                            <li key={index}>
                              {item.menuItemName} (x{item.quantity}) - ${item.price.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(newStatus: OrderStatus) => handleStatusChange(order.id, newStatus)}
                          disabled={updatingOrderId === order.id}
                        >
                          <SelectTrigger className={clsx("w-[140px] capitalize", getStatusColor(order.status))}>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {['RECEIVED', 'PREPARING', 'READY_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map((statusOption) => (
                              <SelectItem key={statusOption} value={statusOption} className="capitalize">
                                {statusOption.replace(/_/g, ' ').toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-gray-100 transition-all duration-200"
                          disabled={updatingOrderId === order.id}
                        >
                          {updatingOrderId === order.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'View Details'
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminOrdersPage;