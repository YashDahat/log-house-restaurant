import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOrder } from '../services/orderService';
import { Order, CreateOrderPayload } from '../types/order';
import { useCart } from '../context/CartContext';

export function useCreateOrder(): UseMutationResult<Order, Error, CreateOrderPayload> {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  return useMutation<Order, Error, CreateOrderPayload>({
    mutationFn: createOrder,
    onSuccess: async (data: Order, variables: CreateOrderPayload) => {
      // Dynamically load Razorpay script if not already available
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.head.appendChild(script);

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => {
            console.error("Failed to load Razorpay script.");
            toast.error("Failed to load payment gateway. Please try again.");
            reject(new Error("Failed to load Razorpay script."));
          };
        });
      }

      const options = {
        key: 'rzp_test_YOUR_KEY_ID', // Placeholder: Replace with actual Razorpay Key ID from environment variables
        amount: data.totalAmount * 100, // Razorpay expects amount in paisa
        name: 'Log House Restaurant',
        order_id: data.razorpayOrderId,
        handler: function (response: any) {
          // Payment successful, backend webhook will handle verification
          console.log('Razorpay payment successful:', response);
          // No explicit frontend call needed for verification as per instruction
        },
        prefill: {
          name: variables.customerName,
          email: variables.customerEmail,
          contact: variables.customerPhone,
        },
        theme: {
          color: '#D2691E', // From design tokens
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // Clear cart after successful order initiation (payment modal opened)
      clearCart();

      // Navigate to order confirmation page
      navigate(`/order-confirmation/${data.id}`);
    },
    onError: (error: Error) => {
      console.error("Error creating order:", error);
      toast.error("Failed to place order: " + error.message);
    },
  });
}