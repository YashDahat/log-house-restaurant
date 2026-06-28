import { apiClient } from '../api/client';
import { Reservation, CreateReservationPayload } from '../types/reservation';

export const createReservation = async (payload: CreateReservationPayload): Promise<Reservation> => {
  const response = await apiClient.post<Reservation>('/reservations', payload);
  return response.data;
};