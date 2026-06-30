import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateReservation } from '../hooks/useReservations';
import { CreateReservationPayload } from '../types/reservation';
import { toast } from 'react-toastify';
import clsx from 'clsx';

function ReservationPage(): JSX.Element {
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
      toast.error(error?.message || 'Failed to place reservation. Please try again.');
    }
  }, [isError, error]);

  const onSubmit: SubmitHandler<CreateReservationPayload> = (data) => {
    // The datetime-local input provides a string in 'YYYY-MM-DDTHH:mm' format.
    // This is a valid partial ISO 8601 string and should be acceptable as per the type definition.
    mutate(data);
  };

  // Get current date and time for min attribute of datetime-local input
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C2A] mb-4 text-center">
              Book Your Table
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8 text-center">
              Reserve your spot for a delightful meal at Log House Restaurant. We look forward to welcoming you!
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className={clsx(
                    'w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4A261]',
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  )}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
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
                  className={clsx(
                    'w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4A261]',
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?\d{10,15}$/, // Basic international phone number pattern
                      message: 'Invalid phone number format (10-15 digits)',
                    },
                  })}
                  className={clsx(
                    'w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4A261]',
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  )}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="numberOfGuests" className="block text-gray-700 text-sm font-semibold mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="numberOfGuests"
                  {...register('numberOfGuests', {
                    required: 'Number of guests is required',
                    min: { value: 1, message: 'Minimum 1 guest' },
                    valueAsNumber: true, // Ensure it's treated as a number
                  })}
                  className={clsx(
                    'w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4A261]',
                    errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                  )}
                  min="1"
                />
                {errors.numberOfGuests && <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="reservationTime" className="block text-gray-700 text-sm font-semibold mb-2">
                  Reservation Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="reservationTime"
                  {...register('reservationTime', {
                    required: 'Reservation date and time is required',
                  })}
                  className={clsx(
                    'w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4A261]',
                    errors.reservationTime ? 'border-red-500' : 'border-gray-300'
                  )}
                  min={minDateTime} // Prevent selecting past dates/times
                />
                {errors.reservationTime && <p className="text-red-500 text-sm mt-1">{errors.reservationTime.message}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="notes" className="block text-gray-700 text-sm font-semibold mb-2">
                  Special Requests/Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  {...register('notes')}
                  className={clsx(
                    'w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4A261]',
                    errors.notes ? 'border-red-500' : 'border-gray-300'
                  )}
                ></textarea>
                {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#F4A261] hover:bg-[#E76F51] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Book Now'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ReservationPage;