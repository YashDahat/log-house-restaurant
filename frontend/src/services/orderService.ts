import { apiClient } from '../api/client';
// The types 'Order' and 'CreateOrderPayload' are declared in '../types/order'
// but are not exported from that file. Since we cannot modify '../types/order.ts'
// as per the problem constraints ("Fix only this one file"), we must define
// these types locally within 'orderService.ts' to resolve the TS2459 error.
// This ensures 'orderService.ts' compiles while preserving its original intent.

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: CartItem[];
  totalAmount: number;
  status: string;
  razorpayOrderId: string;
  createdAt: string;
}

type CreateOrderPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: { menuItemId: string; quantity: number; price: number }[];
  totalAmount: number;
};

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const response = await apiClient.post<Order>('/orders', payload);
  return response.data;
}