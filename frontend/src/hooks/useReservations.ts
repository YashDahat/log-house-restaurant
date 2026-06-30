import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { createReservation } from '../services/reservationService';
import { Reservation, CreateReservationPayload } from '../types/reservation';

export const useCreateReservation = (): UseMutationResult<Reservation, Error, CreateReservationPayload> => {
  return useMutation<Reservation, Error, CreateReservationPayload>({
    mutationFn: createReservation,
    // onSuccess and onError callbacks are typically handled by the consuming component
    // (e.g., ReservationPage.tsx) to display toasts or reset forms.
    // They are not explicitly defined here as per the instruction's "Can be used to display..."
    // which implies the hook itself doesn't implement them, but provides the means.
  });
};