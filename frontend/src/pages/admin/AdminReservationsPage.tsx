import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import clsx from 'clsx';

// Mock DTOs based on the instruction
interface ReservationResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationTime: string; // ISO 8601 string
  numberOfGuests: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

interface UpdateReservationStatusRequest {
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

const AdminReservationsPage = (): JSX.Element => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const fetchReservations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call
      const response = await new Promise<ReservationResponse[]>((resolve) =>
        setTimeout(() => {
          resolve([
            {
              id: 'res-123',
              customerName: 'Alice Smith',
              customerEmail: 'alice@example.com',
              customerPhone: '123-456-7890',
              reservationTime: '2024-07-20T19:00:00Z',
              numberOfGuests: 4,
              status: 'PENDING',
            },
            {
              id: 'res-124',
              customerName: 'Bob Johnson',
              customerEmail: 'bob@example.com',
              customerPhone: '098-765-4321',
              reservationTime: '2024-07-21T18:30:00Z',
              numberOfGuests: 2,
              status: 'CONFIRMED',
            },
            {
              id: 'res-125',
              customerName: 'Charlie Brown',
              customerEmail: 'charlie@example.com',
              customerPhone: '555-123-4567',
              reservationTime: '2024-07-22T20:00:00Z',
              numberOfGuests: 6,
              status: 'CANCELLED',
            },
          ]);
        }, 1000)
      );
      setReservations(response);
    } catch (err) {
      setError('Failed to fetch reservations.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusChange = async (
    reservationId: string,
    newStatus: ReservationResponse['status']
  ) => {
    setIsUpdating(true);
    try {
      // Mock API call for status update
      const payload: UpdateReservationStatusRequest = { status: newStatus };
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
      console.log(
        `Updating reservation ${reservationId} status to ${newStatus} with payload:`,
        payload
      );
      // Optimistically update UI or re-fetch
      setReservations((prev) =>
        prev.map((res) =>
          res.id === reservationId ? { ...res, status: newStatus } : res
        )
      );
    } catch (err) {
      setError(`Failed to update status for reservation ${reservationId}.`);
      console.error(err);
      // Revert UI change if optimistic update was used, or re-fetch to get actual state
      fetchReservations();
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColorClass = (status: ReservationResponse['status']) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100';
      case 'CONFIRMED':
        return 'text-green-600 bg-green-100';
      case 'CANCELLED':
        return 'text-red-600 bg-red-100';
      case 'COMPLETED':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">
            Reservations Management
          </h1>

          {isLoading && (
            <div className="text-center py-8">
              <p className="text-lg text-gray-700">Loading reservations...</p>
              {/* Basic spinner */}
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F7C548] mx-auto mt-4"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {!isLoading && !error && reservations.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No reservations found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by taking your first reservation!
              </p>
            </div>
          )}

          {!isLoading && !error && reservations.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 hover:bg-gray-100">
                    <TableHead className="text-gray-700 font-semibold">
                      Customer Name
                    </TableHead>
                    <TableHead className="text-gray-700 font-semibold">
                      Email
                    </TableHead>
                    <TableHead className="text-gray-700 font-semibold">
                      Phone
                    </TableHead>
                    <TableHead className="text-gray-700 font-semibold">
                      Time
                    </TableHead>
                    <TableHead className="text-gray-700 font-semibold">
                      Guests
                    </TableHead>
                    <TableHead className="text-gray-700 font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="text-gray-700 font-semibold">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">
                        {reservation.customerName}
                      </TableCell>
                      <TableCell>{reservation.customerEmail}</TableCell>
                      <TableCell>{reservation.customerPhone}</TableCell>
                      <TableCell>
                        {new Date(reservation.reservationTime).toLocaleString()}
                      </TableCell>
                      <TableCell>{reservation.numberOfGuests}</TableCell>
                      <TableCell>
                        <span
                          className={clsx(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            getStatusColorClass(reservation.status)
                          )}
                        >
                          {reservation.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={reservation.status}
                          onValueChange={(value: ReservationResponse['status']) =>
                            handleStatusChange(reservation.id, value)
                          }
                          disabled={isUpdating}
                        >
                          <SelectTrigger className="w-[180px] h-9 border border-gray-300 rounded-md px-3 py-1 text-sm bg-white hover:bg-gray-50 transition-all duration-200">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminReservationsPage;