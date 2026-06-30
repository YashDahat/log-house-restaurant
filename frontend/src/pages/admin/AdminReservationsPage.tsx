import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';
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

interface ReservationResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationTime: string; // Assuming ISO string
  numberOfGuests: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

interface UpdateReservationStatusRequest {
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

const AdminReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const handleStatusChange = async (reservationId: string, newStatus: ReservationResponse['status']) => {
    try {
      await axios.patch<void>(`/api/v1/admin/reservations/${reservationId}/status`, { status: newStatus } as UpdateReservationStatusRequest);
      fetchReservations(); // Refresh the list
    } catch (err) {
      console.error(`Failed to update status for reservation ${reservationId}:`, err);
      setError('Failed to update reservation status. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">Reservations Management</h1>

      {isLoading && <p className="text-gray-700">Loading reservations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && reservations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No reservations found.</p>
        </div>
      )}

      {!isLoading && !error && reservations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
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
                  <TableCell>{new Date(reservation.reservationTime).toLocaleString()}</TableCell>
                  <TableCell>{reservation.numberOfGuests}</TableCell>
                  <TableCell>
                    <Select
                      value={reservation.status}
                      onValueChange={(newStatus: ReservationResponse['status']) =>
                        handleStatusChange(reservation.id, newStatus)
                      }
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {/* Additional actions could go here, e.g., view details */}
                    <span className="text-gray-500">No additional actions</span>
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