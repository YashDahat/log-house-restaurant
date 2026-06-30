import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { createReservation } from '../services/reservationService';
import { Reservation, CreateReservationPayload } from '../types/reservation';

export const useCreateReservation = (): UseMutationResult<Reservation, Error, CreateReservationPayload> => {
  return useMutation<Reservation, Error, CreateReservationPayload>({
    mutationFn: createReservation,
    // onSuccess and onError callbacks are typically handled by the component consuming the hook
    // to display toasts or perform other side effects.
  });
};