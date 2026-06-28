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