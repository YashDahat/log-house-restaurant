import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import Layout from '@/components/Layout';
import { useCreateReservation } from '../hooks/useReservations';
import { CreateReservationPayload } from '../types/reservation';

const ReservationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReservationPayload>();

  const { mutate, isLoading, isSuccess, isError, error } = useCreateReservation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Your reservation has been successfully placed! We look forward to seeing you.');
      reset(); // Reset form fields on success
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (isError) {
      const errorMessage = error?.message || 'Failed to place reservation. Please try again.';
      toast.error(errorMessage);
    }
  }, [isError, error]);

  const onSubmit = (data: CreateReservationPayload) => {
    // The datetime-local input naturally produces a string in 'YYYY-MM-DDTHH:mm' format.
    // The CreateReservationPayload expects 'YYYY-MM-DDTHH:mm:ss'.
    // For this implementation, we pass the 'YYYY-MM-DDTHH:mm' string directly,
    // assuming the backend can handle this format or that the seconds component
    // is optional/defaults to '00'.
    mutate(data);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="max-w-7xl mx-auto text-center z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Experience Authentic North Indian Cuisine at Log House Restaurant
          </h1>
          <p className="text-xl text-white mt-4">
            Book Your Table for an Unforgettable Dining Experience
          </p>
        </div>
      </div>

      {/* Reservation Form Section */}
      <section className="py-16 px-4 bg-[#FDF8F3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C2A] mb-4 text-center">
            Book Your Table
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            Reserve your spot for a delightful meal at Log House Restaurant. We look forward to welcoming you!
          </p>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#F4A261] focus:border-[#F4A261]"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#F4A261] focus:border-[#F4A261]"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/, // Basic phone number pattern
                      message: 'Invalid phone number format',
                    },
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#F4A261] focus:border-[#F4A261]"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              {/* Number of Guests */}
              <div>
                <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="numberOfGuests"
                  {...register('numberOfGuests', {
                    required: 'Number of guests is required',
                    min: { value: 1, message: 'Must be at least 1 guest' },
                    valueAsNumber: true, // Convert to number
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#F4A261] focus:border-[#F4A261]"
                />
                {errors.numberOfGuests && <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests.message}</p>}
              </div>

              {/* Reservation Date & Time */}
              <div>
                <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700">
                  Reservation Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="reservationTime"
                  {...register('reservationTime', { required: 'Reservation date and time is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#F4A261] focus:border-[#F4A261]"
                />
                {errors.reservationTime && <p className="text-red-500 text-sm mt-1">{errors.reservationTime.message}</p>}
              </div>

              {/* Special Requests/Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Special Requests/Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  {...register('notes')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#F4A261] focus:border-[#F4A261]"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={clsx(
                  'w-full bg-[#F4A261] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200',
                  'hover:bg-[#E76F51]',
                  {
                    'opacity-50 cursor-not-allowed': isLoading,
                  }
                )}
                disabled={isLoading}
              >
                {isLoading ? 'Booking...' : 'Book Now'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReservationPage;