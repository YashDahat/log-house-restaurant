import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useCreateOrder } from '../hooks/useOrders';
import clsx from 'clsx';

const OrderPage: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const { cartItems, totalAmount, removeItem, updateItemQuantity } = useCart();
  const { mutate, isLoading, isError, error } = useCreateOrder();

  const isFormValid = customerName && customerEmail && customerPhone && deliveryAddress;

  const handlePlaceOrder = () => {
    if (!isFormValid || cartItems.length === 0) {
      return;
    }

    const payload = {
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
      {/* Hero Section */}
      <section className="relative h-64 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Your Log House Order</h1>
          <p className="mt-4 text-xl text-white">Review your delicious North Indian selections and complete your order.</p>
        </div>
      </section>

      {/* Cart Summary Section */}
      <section className="py-16 px-4 bg-[#FDFBF6]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#D2691E] mb-8">Your Cart</h2>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <svg className="w-20 h-20 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <p className="text-gray-700 text-lg">Your cart is empty. Please add some delicious items from our <Link to="/menu" className="text-[#D2691E] hover:underline transition-all duration-200">menu</Link>!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center bg-white rounded-xl shadow-md border border-gray-100 p-4">
                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-all duration-200"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="font-medium text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-all duration-200"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-all duration-200"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right text-2xl font-bold text-gray-800">
                Total: <span className="text-[#D2691E]">₹{totalAmount.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Customer Details Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#D2691E] mb-8">Delivery Information</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customerName" className="block text-gray-700 font-medium mb-2">Full Name</label>
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
              <label htmlFor="customerEmail" className="block text-gray-700 font-medium mb-2">Email</label>
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
              <label htmlFor="customerPhone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
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
              <label htmlFor="deliveryAddress" className="block text-gray-700 font-medium mb-2">Delivery Address</label>
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

      {/* Place Order Section */}
      <section className="py-16 px-4 bg-[#FDFBF6]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#D2691E] mb-8">Confirm & Pay</h2>
          <div className="flex justify-between items-center mb-8">
            <p className="text-xl font-semibold text-gray-800">Final Total:</p>
            <p className="text-3xl font-bold text-[#D2691E]">₹{totalAmount.toFixed(2)}</p>
          </div>

          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error?.message || 'Failed to place order.'}</span>
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={!isFormValid || isLoading || cartItems.length === 0}
            className={clsx(
              "w-full bg-[#FFC107] hover:bg-[#E0A800] text-[#5A3A2B] font-semibold rounded-full px-8 py-3 transition-all duration-200 text-lg",
              { "opacity-50 cursor-not-allowed": !isFormValid || isLoading || cartItems.length === 0 }
            )}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#5A3A2B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Placing Order...
              </span>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default OrderPage;