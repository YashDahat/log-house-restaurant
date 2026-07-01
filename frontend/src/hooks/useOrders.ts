import { useMutation, UseMutationResult } from 'react-query';
import { createOrder } from '../services/orderService';
import { Order, CreateOrderPayload } from '../types/order';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Declare Razorpay on window for TypeScript to avoid 'Property 'Razorpay' does not exist on type 'Window''
declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * Dynamically loads the Razorpay checkout script if it's not already available.
 * @returns A Promise that resolves when the script is loaded.
 */
const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve();
    };
    document.head.appendChild(script);
  });
};

/**
 * Custom React Query hook for creating an order and handling the subsequent payment process.
 * It manages loading, success, and error states for the checkout process.
 *
 * @returns A UseMutationResult object providing mutation function, loading state, error state, etc.
 */
export function useCreateOrder(): UseMutationResult<Order, Error, CreateOrderPayload> {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  return useMutation<Order, Error, CreateOrderPayload>(
    createOrder, // The mutation function that calls the API service
    {
      onSuccess: async (data, variables) => {
        // Load Razorpay script dynamically
        await loadRazorpayScript();

        // Prepare Razorpay checkout options
        const options = {
          // Razorpay Key ID is typically an environment variable.
          // Assuming VITE_RAZORPAY_KEY_ID is configured in the project's environment.
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.totalAmount * 100, // Razorpay expects amount in paisa (e.g., 10000 for ₹100.00)
          currency: 'INR', // Common currency for Razorpay
          name: 'Log House Restaurant',
          description: 'Order Payment',
          order_id: data.razorpayOrderId, // The order ID received from the backend
          handler: function (response: any) {
            // This handler is called by Razorpay upon successful payment.
            // The backend's order-management-core feature will handle verification via a webhook,
            // so no explicit frontend call is needed here.
            console.log('Razorpay payment successful:', response);
            toast.success('Payment successful! Your order is confirmed.');
          },
          prefill: {
            name: variables.customerName,
            email: variables.customerEmail,
            contact: variables.customerPhone,
          },
          theme: {
            color: '#D2691E', // Brand accent color for the Razorpay modal
          },
        };

        // Initialize and open Razorpay checkout modal
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          console.error('Razorpay payment failed:', response.error);
          toast.error('Payment failed: ' + response.error.description);
        });
        rzp.open();

        // Clear the cart and navigate to the order confirmation page
        // This happens immediately after the order is created and Razorpay modal is opened,
        // as per the instruction's sequence.
        clearCart();
        navigate(`/order-confirmation/${data.id}`);
      },
      onError: (error) => {
        console.error('Error creating order:', error);
        toast.error('Failed to place order: ' + error.message);
      },
    }
  );
}