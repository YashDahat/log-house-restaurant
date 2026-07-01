import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { format } from 'date-fns';

interface ReservationResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationTime: string; // ISO string
  numberOfGuests: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

interface UpdateReservationStatusRequest {
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

const AdminReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleStatusChange = async (id: string, newStatus: ReservationResponse['status']) => {
    try {
      await axios.patch<void>(`/api/v1/admin/reservations/${id}/status`, { status: newStatus } as UpdateReservationStatusRequest);
      fetchReservations(); // Refresh the list after update
    } catch (err) {
      console.error(`Failed to update reservation ${id} status to ${newStatus}:`, err);
      setError('Failed to update reservation status. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Reservations Management</h1>

      {isLoading && <p className="text-gray-700">Loading reservations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && reservations.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No reservations found.</p>
        </div>
      )}

      {!isLoading && !error && reservations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
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
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.customerName}</TableCell>
                  <TableCell>{reservation.customerEmail}</TableCell>
                  <TableCell>{reservation.customerPhone}</TableCell>
                  <TableCell>{format(new Date(reservation.reservationTime), 'MMM dd, yyyy HH:mm')}</TableCell>
                  <TableCell>{reservation.numberOfGuests}</TableCell>
                  <TableCell>
                    <Select
                      value={reservation.status}
                      onValueChange={(newStatus: ReservationResponse['status']) =>
                        handleStatusChange(reservation.id, newStatus)
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {/* No explicit actions specified beyond status update */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReservationsPage;