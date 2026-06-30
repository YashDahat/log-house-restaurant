import { useMutation, UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { useCart } from '../context/CartContext';

// The types 'CartItem', 'Order', and 'CreateOrderPayload' are declared in
// '../types/order.ts' but are not exported from that file.
// Similarly, 'orderService.ts' defines them locally but does not export them.
// As per the problem constraints ("Fix only this one file") and the lack of exports,
// we must define these types locally within 'useOrders.ts' to resolve TS errors.
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

export function useCreateOrder(): UseMutationResult<Order, Error, CreateOrderPayload> {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  return useMutation<Order, Error, CreateOrderPayload>(
    createOrder,
    {
      onSuccess: async (data: Order, variables: CreateOrderPayload) => {
        // Dynamically load Razorpay script if not already available
        const loadRazorpayScript = () => {
          return new Promise<void>((resolve) => {
            if ((window as any).Razorpay) {
              resolve();
              return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve();
            document.head.appendChild(script);
          });
        };

        await loadRazorpayScript();

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID', // Placeholder for Razorpay Key ID
          amount: data.totalAmount * 100, // amount in paisa
          currency: 'INR', // Assuming INR as common for Razorpay, not explicitly specified
          name: 'Log House Restaurant',
          order_id: data.razorpayOrderId,
          handler: function (response: any) {
            // Payment successful, backend webhook will handle verification.
            // No explicit frontend API call needed here as per instruction.
            console.log('Razorpay payment successful:', response);
          },
          prefill: {
            name: variables.customerName,
            email: variables.customerEmail,
            contact: variables.customerPhone,
          },
          theme: {
            color: '#D2691E', // Brand accent color
          },
        };

        const r = new (window as any).Razorpay(options);
        r.open();

        // Clear the cart after successfully initiating the order/payment process
        clearCart();

        // Navigate to the order confirmation page
        navigate(`/order-confirmation/${data.id}`);
      },
      onError: (error: Error) => {
        console.error('Error creating order:', error);
        // Display a user-friendly error message.
        // As per rules, no external libraries like `toast` unless explicitly listed in imports.
        // Therefore, only logging the error.
      },
    }
  );
}