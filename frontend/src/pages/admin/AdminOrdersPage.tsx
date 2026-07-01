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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { clsx } from 'clsx';

// Define interfaces based on the expected API responses and requests
interface OrderItem {
  menuItemName: string;
  quantity: number;
  price: number;
}

interface OrderResponse {
  orderId: string; // Assuming UUID as string
  customerName: string;
  totalAmount: number;
  status: string;
  orderItems: OrderItem[];
  orderDate: string; // Assuming ISO string date
}

interface UpdateOrderStatusRequest {
  status: string;
}

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const orderStatuses = ['RECEIVED', 'PREPARING', 'READY_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/admin/orders');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: OrderResponse[] = await response.json();
      setOrders(data);
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

  const handleUpdateStatusClick = (order: OrderResponse) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsUpdateModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;

    setIsUpdating(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/admin/orders/${selectedOrder.orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus } as UpdateOrderStatusRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh orders after successful update
      fetchOrders();
      setIsUpdateModalOpen(false);
    } catch (err) {
      console.error('Failed to update order status:', err);
      setError('Failed to update order status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusClass = (status: string) => {
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
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Order Management</h1>

      <section className="py-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading orders...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && orders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No orders found.</p>
            </div>
          )}

          {!isLoading && !error && orders.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 text-gray-700 font-semibold">
                    <TableHead className="w-[150px]">Order ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order Items</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell className="font-medium">{order.orderId.substring(0, 8)}...</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={clsx("px-2 py-1 rounded-full text-xs font-medium", getStatusClass(order.status))}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside text-sm">
                          {order.orderItems.map((item, index) => (
                            <li key={index}>{item.menuItemName} (x{item.quantity})</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleUpdateStatusClick(order)}
                          className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-3 py-1 text-sm transition-all duration-200"
                        >
                          Update Status
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

      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {selectedOrder?.orderId.substring(0, 8)}...
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select onValueChange={setNewStatus} value={newStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsUpdateModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-4 py-2 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleStatusUpdate}
              disabled={isUpdating}
              className="bg-[#F7C548] hover:bg-[#E0B03C] text-[#4A2C2A] font-semibold rounded-md px-4 py-2 transition-all duration-200"
            >
              {isUpdating ? 'Updating...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrdersPage;