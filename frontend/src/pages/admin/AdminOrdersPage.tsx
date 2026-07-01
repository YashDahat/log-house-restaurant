import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';

// Define types based on the instruction's implied API responses
interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

type OrderStatus = 'PENDING' | 'PREPARING' | 'READY_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

interface OrderResponse {
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  orderDate: string; // Assuming an order date field
}

interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

const AdminOrdersPage = (): React.ReactElement => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null); // Stores orderId being updated

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<OrderResponse[]>('/api/v1/admin/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdatingStatus(orderId);
    try {
      await axios.patch(`/api/v1/admin/orders/${orderId}/status`, { status: newStatus } as UpdateOrderStatusRequest);
      // Optimistically update UI or refetch
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(`Failed to update status for order ${orderId}:`, err);
      setError(`Failed to update status for order ${orderId}.`);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const orderStatuses: OrderStatus[] = ['PENDING', 'PREPARING', 'READY_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Order Management</h1>

      <section className="py-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-700">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p className="text-lg">{error}</p>
              <Button onClick={fetchOrders} className="mt-4 bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold">
                Retry
              </Button>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-700">No orders found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-gray-700 font-semibold">Order ID</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Customer Name</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Total Amount</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Items</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.orderId} className="hover:bg-gray-50 transition-all duration-200">
                      <TableCell className="font-medium">{order.orderId.substring(0, 8)}...</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        {order.orderItems.length} item(s)
                        {/* Could add a popover/dialog here for details if needed */}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(newStatus: OrderStatus) => handleUpdateStatus(order.orderId, newStatus)}
                          disabled={isUpdatingStatus === order.orderId}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {orderStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.replace(/_/g, ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
                          disabled={isUpdatingStatus === order.orderId}
                        >
                          View Details
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