import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
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
} from '@/components/ui/select';
import axios from 'axios';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

interface ReservationResponse {
  id: string; // UUID
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationTime: string; // ISO string
  numberOfGuests: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'SEATED' | 'COMPLETED';
}

type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'SEATED' | 'COMPLETED';

const AdminReservationsPage = (): JSX.Element => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // To track which reservation is being updated

  const fetchReservations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<ReservationResponse[]>('/api/v1/admin/reservations');
      setReservations(response.data);
    } catch (err) {
      console.error('Failed to fetch reservations:', err);
      setError('Failed to load reservations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusChange = async (reservationId: string, newStatus: ReservationStatus) => {
    setIsUpdating(reservationId);
    try {
      await axios.patch(`/api/v1/admin/reservations/${reservationId}/status`, { status: newStatus });
      // Refresh the list after successful update
      fetchReservations();
    } catch (err) {
      console.error(`Failed to update reservation ${reservationId} status to ${newStatus}:`, err);
      setError('Failed to update reservation status. Please try again.');
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Reservations Management</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-[#4A2C2A]" />
              <p className="ml-2 text-gray-700">Loading reservations...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p className="text-lg font-semibold mb-2">No reservations found.</p>
              <p>Check back later or ensure the API is running.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 hover:bg-gray-100">
                    <TableHead className="text-gray-700 font-semibold">Customer Name</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Email</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Phone</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Time</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Guests</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id} className="hover:bg-gray-50 transition-all duration-200">
                      <TableCell className="font-medium text-gray-800">{reservation.customerName}</TableCell>
                      <TableCell className="text-gray-700">{reservation.customerEmail}</TableCell>
                      <TableCell className="text-gray-700">{reservation.customerPhone}</TableCell>
                      <TableCell className="text-gray-700">
                        {format(new Date(reservation.reservationTime), 'MMM dd, yyyy hh:mm a')}
                      </TableCell>
                      <TableCell className="text-gray-700">{reservation.numberOfGuests}</TableCell>
                      <TableCell>
                        <Select
                          value={reservation.status}
                          onValueChange={(value: ReservationStatus) =>
                            handleStatusChange(reservation.id, value)
                          }
                          disabled={isUpdating === reservation.id}
                        >
                          <SelectTrigger className="w-[180px] text-gray-700">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            <SelectItem value="SEATED">Seated</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {isUpdating === reservation.id && (
                          <Loader2 className="h-4 w-4 animate-spin text-[#F7C548]" />
                        )}
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