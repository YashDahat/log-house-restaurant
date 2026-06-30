import Layout from '@/components/Layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateReservation } from '../hooks/useReservations';
import { CreateReservationPayload } from '../types/reservation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservationPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

  const onSubmit: SubmitHandler<CreateReservationPayload> = (data) => {
    // datetime-local input typically provides YYYY-MM-DDTHH:mm.
    // Append ':00' to conform to YYYY-MM-DDTHH:mm:ss ISO 8601 format expected by the backend.
    const formattedReservationTime = data.reservationTime + ':00';
    mutate({ ...data, reservationTime: formattedReservationTime });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center px-4">
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C2A] mb-4 text-center">
            Book Your Table
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8 text-center max-w-2xl mx-auto">
            Reserve your spot for a delightful meal at Log House Restaurant. We look forward to welcoming you!
          </p>

          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: 'Invalid phone number format (e.g., +1234567890)',
                    },
                  })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="numberOfGuests"
                  {...register('numberOfGuests', {
                    required: 'Number of guests is required',
                    min: { value: 1, message: 'Must be at least 1 guest' },
                    valueAsNumber: true, // Ensure the value is treated as a number
                  })}
                  min="1"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm"
                />
                {errors.numberOfGuests && <p className="mt-1 text-sm text-red-600">{errors.numberOfGuests.message}</p>}
              </div>

              <div>
                <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Reservation Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="reservationTime"
                  {...register('reservationTime', { required: 'Reservation date and time is required' })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm"
                />
                {errors.reservationTime && <p className="mt-1 text-sm text-red-600">{errors.reservationTime.message}</p>}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests/Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  {...register('notes')}
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F4A261] hover:bg-[#E76F51] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
};

export default ReservationPage;