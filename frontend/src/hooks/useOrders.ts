import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { createOrder } from '../services/orderService';
import { Order, CreateOrderPayload } from '../types/order';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

export function useCreateOrder(): UseMutationResult<Order, Error, CreateOrderPayload> {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  return useMutation<Order, Error, CreateOrderPayload>({
    mutationFn: createOrder,
    onSuccess: async (data: Order, variables: CreateOrderPayload) => {
      await loadRazorpayScript();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.totalAmount * 100,
        currency: 'INR',
        name: 'Log House Restaurant',
        description: 'Order Payment',
        order_id: data.razorpayOrderId,
        handler: function (response: any) {
          console.log('Razorpay payment successful:', response);
          toast.success('Payment successful! Your order is confirmed.');
        },
        prefill: {
          name: variables.customerName,
          email: variables.customerEmail,
          contact: variables.customerPhone,
        },
        theme: {
          color: '#D2691E',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error('Razorpay payment failed:', response.error);
        toast.error('Payment failed: ' + response.error.description);
      });
      rzp.open();

      clearCart();
      navigate(`/order-confirmation/${data.id}`);
    },
    onError: (error: Error) => {
      console.error('Error creating order:', error);
      toast.error('Failed to place order: ' + error.message);
    },
  });
}
