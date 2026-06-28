export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  reservationTime: string; // ISO 8601 format, e.g., 'YYYY-MM-DDTHH:mm:ss'
  status: string; // e.g., 'PENDING', 'CONFIRMED', 'CANCELLED'
  notes?: string; // optional
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

export type CreateReservationPayload = {
  name: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  reservationTime: string; // ISO 8601 format, e.g., 'YYYY-MM-DDTHH:mm:ss'
  notes?: string; // optional
};