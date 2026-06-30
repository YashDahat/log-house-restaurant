import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '../context/CartContext';
import { useCreateOrder } from '../hooks/useOrders';
import { CartItem, CreateOrderPayload } from '../types/order';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

function OrderPage(): JSX.Element {
  const { cartItems, totalAmount, removeItem, updateItemQuantity } = useCart();
  const { mutate, isLoading, isError, error } = useCreateOrder();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const isFormValid =
    customerName.trim() !== '' &&
    customerEmail.trim() !== '' &&
    customerPhone.trim() !== '' &&
    deliveryAddress.trim() !== '' &&
    cartItems.length > 0;

  const handlePlaceOrder = () => {
    if (!isFormValid) {
      return;
    }

    const orderItems = cartItems.map((item) => ({
      menuItemId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const payload: CreateOrderPayload = {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      items: orderItems,
      totalAmount,
    };

    mutate(payload);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Your Log House Order</h1>
          <p className="mt-4 text-xl text-white">Review your delicious North Indian selections and complete your order.</p>
        </div>
      </section>

      {/* Cart Summary Section */}
      <section className="py-16 px-4 bg-[#FDFBF6]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-8">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-700 text-lg">
              Your cart is empty. Please add some delicious items from our{' '}
              <Link to="/menu" className="text-[#D2691E] hover:underline">
                menu
              </Link>
              !
            </p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex items-center bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="bg-[#D2691E] hover:bg-[#B85C1A] text-white font-semibold rounded-full px-3 py-1 transition-all duration-200 text-lg"
                        size="sm"
                      >
                        -
                      </Button>
                      <span className="mx-4 text-lg font-medium text-gray-800">{item.quantity}</span>
                      <Button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="bg-[#D2691E] hover:bg-[#B85C1A] text-white font-semibold rounded-full px-3 py-1 transition-all duration-200 text-lg"
                        size="sm"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full px-4 py-2 transition-all duration-200"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right mt-8 pt-4 border-t border-gray-200">
                <p className="text-2xl font-bold text-gray-800">Total: ₹{totalAmount.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Customer Details Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-8">Delivery Information</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customerName" className="block text-gray-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <Input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="customerEmail" className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="customerPhone" className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                id="customerPhone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="deliveryAddress" className="block text-gray-700 text-sm font-medium mb-2">
                Delivery Address
              </label>
              <Textarea
                id="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={4}
                required
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Place Order Section */}
      <section className="py-16 px-4 bg-[#FDFBF6]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-8">Confirm & Pay</h2>
          <p className="text-3xl font-bold text-gray-800 mb-8">Final Total: ₹{totalAmount.toFixed(2)}</p>
          <Button
            onClick={handlePlaceOrder}
            disabled={!isFormValid || isLoading}
            className={clsx(
              "bg-[#FFC107] hover:bg-[#E0A800] text-[#5A3A2B] font-semibold rounded-full px-8 py-3 transition-all duration-200",
              { "opacity-50 cursor-not-allowed": !isFormValid || isLoading }
            )}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              'Place Order'
            )}
          </Button>
          {isError && (
            <p className="text-red-500 mt-4 text-lg">Error: {error?.message || 'Failed to place order.'}</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default OrderPage;