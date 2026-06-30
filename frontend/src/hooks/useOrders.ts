import { useMutation, UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOrder } from '../services/orderService';
import { useCart } from '../context/CartContext';
import { Order, CreateOrderPayload } from '../types/order';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = () => {
  return new Promise<void>((resolve) => {
    if (document.getElementById('razorpay-checkout-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve();
    };
    document.head.appendChild(script);
  });
};

export function useCreateOrder(): UseMutationResult<Order, Error, CreateOrderPayload> {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  return useMutation<Order, Error, CreateOrderPayload>(
    createOrder,
    {
      onSuccess: async (data: Order, variables: CreateOrderPayload) => {
        await loadRazorpayScript();

        if (window.Razorpay) {
          const options = {
            key: process.env.RAZORPAY_KEY_ID,
            amount: data.totalAmount * 100, // amount in paisa
            currency: 'INR',
            name: 'Log House Restaurant',
            description: 'Order Payment',
            order_id: data.razorpayOrderId,
            handler: function (response: any) {
              console.log('Razorpay Payment ID:', response.razorpay_payment_id);
              console.log('Razorpay Order ID:', response.razorpay_order_id);
              console.log('Razorpay Signature:', response.razorpay_signature);
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

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          toast.error('Razorpay script failed to load. Please try again.');
          console.error('Razorpay script not loaded.');
        }

        clearCart();
        navigate(`/order-confirmation/${data.id}`);
      },
      onError: (error: Error) => {
        console.error('Order creation failed:', error);
        toast.error('Failed to place order: ' + error.message);
      },
    }
  );
}