import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '../context/CartContext';
import { useCreateOrder } from '../hooks/useOrders';
import { CreateOrderPayload } from '../types/order';
import clsx from 'clsx';

const OrderPage: React.FC = () => {
  const { cartItems, totalAmount, removeItem, updateItemQuantity } = useCart();
  const { mutate, isLoading, isError, error } = useCreateOrder();

  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');

  const isFormValid = customerName && customerEmail && customerPhone && deliveryAddress;
  const isOrderButtonDisabled = isLoading || cartItems.length === 0 || !isFormValid;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0 || !isFormValid) {
      return;
    }

    const payload: CreateOrderPayload = {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      items: cartItems.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
    };

    mutate(payload);
  };

  return (
    <Layout>
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
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <div className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-all duration-200"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-all duration-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-all duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-right text-2xl font-bold text-[#D2691E] pt-4 border-t border-gray-200">
                Total: ₹{totalAmount.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-8">Delivery Information</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customerName" className="block text-gray-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="customerName"
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent w-full"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="customerEmail" className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="customerEmail"
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent w-full"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="customerPhone" className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="customerPhone"
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent w-full"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="deliveryAddress" className="block text-gray-700 text-sm font-medium mb-2">
                Delivery Address
              </label>
              <textarea
                id="deliveryAddress"
                rows={4}
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent w-full"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
              ></textarea>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#FDFBF6]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-8">Confirm & Pay</h2>
          <p className="text-gray-700 text-xl mb-6">
            Your final total: <span className="font-bold text-[#D2691E]">₹{totalAmount.toFixed(2)}</span>
          </p>
          <button
            onClick={handlePlaceOrder}
            className={clsx(
              "bg-[#FFC107] text-[#5A3A2B] font-semibold rounded-full px-8 py-3 transition-all duration-200",
              {
                "hover:bg-[#E0A800]": !isOrderButtonDisabled,
                "opacity-50 cursor-not-allowed": isOrderButtonDisabled,
              }
            )}
            disabled={isOrderButtonDisabled}
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
          {isError && (
            <p className="mt-4 text-red-500">Error: {error?.message || 'Failed to place order.'}</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default OrderPage;