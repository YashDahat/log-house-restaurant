import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '../context/CartContext';
import { useCreateOrder } from '../hooks/useOrders';
import { CreateOrderPayload } from '../types/order';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

const OrderPage: React.FC = () => {
  const { cartItems, totalAmount, removeItem, updateItemQuantity } = useCart();
  const { mutate, isPending: isLoading, isError, error } = useCreateOrder();

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      // The button should be disabled, but this is a safeguard.
      return;
    }

    const payload: CreateOrderPayload = {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      items: cartItems.map((item) => ({
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
      <section
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Your Log House Order</h1>
          <p className="mt-4 text-xl text-white">
            Review your delicious North Indian selections and complete your order.
          </p>
        </div>
      </section>

      {/* Cart Summary Section */}
      <section className="py-16 px-4 bg-[#FDFBF6]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-8">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-700 text-lg leading-relaxed">
              Your cart is empty. Please add some delicious items from our{' '}
              <Link to="/menu" className="text-[#D2691E] hover:underline transition-all duration-200">
                menu
              </Link>
              !
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="flex items-center p-4 shadow-sm border border-gray-100">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-all duration-200"
                      >
                        -
                      </Button>
                      <span className="mx-3 text-lg font-medium text-gray-800">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-all duration-200"
                      >
                        +
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all duration-200"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <p className="font-bold text-xl text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                </Card>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-8 text-right">
              <p className="text-2xl font-bold text-[#D2691E]">Total: ₹{totalAmount.toFixed(2)}</p>
            </div>
          )}
        </div>
      </section>

      {/* Customer Details Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-8">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="customerName" className="block text-lg font-medium text-gray-700 mb-2">
                Name
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
              <label htmlFor="customerEmail" className="block text-lg font-medium text-gray-700 mb-2">
                Email
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
            <div>
              <label htmlFor="customerPhone" className="block text-lg font-medium text-gray-700 mb-2">
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
            <div>
              <label htmlFor="deliveryAddress" className="block text-lg font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <Textarea
                id="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                rows={4}
                className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#FFC107] focus:border-transparent"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Place Order Section */}
      <section className="py-16 px-4 bg-[#FDFBF6]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#D2691E] mb-8">Confirm & Pay</h2>

          <div className="flex justify-between items-center mb-8">
            <p className="text-2xl font-bold text-gray-800">Final Total:</p>
            <p className="text-3xl font-bold text-[#D2691E]">₹{totalAmount.toFixed(2)}</p>
          </div>

          {isError && (
            <div className="mb-4 text-red-600 font-medium">
              Error: {error?.message || 'Failed to place order.'}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className={clsx(
              "w-full",
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
        </div>
      </section>
    </Layout>
  );
};

export default OrderPage;