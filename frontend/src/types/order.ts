export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
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

export type CreateOrderPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: { menuItemId: string; quantity: number; price: number }[];
  totalAmount: number;
};
