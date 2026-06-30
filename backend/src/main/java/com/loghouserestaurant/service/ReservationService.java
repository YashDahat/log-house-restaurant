package com.loghouserestaurant.service;

import com.loghouserestaurant.repository.ReservationRepository;
import com.loghouserestaurant.dto.CreateReservationRequest;
import com.loghouserestaurant.dto.ReservationResponse;
import com.loghouserestaurant.dto.UpdateReservationStatusRequest;
import com.loghouserestaurant.model.Reservation;
import com.loghouserestaurant.model.ReservationStatus;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.UUID;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public ReservationResponse createReservation(CreateReservationRequest request) {
        if (request.getPartySize() == null || request.getPartySize() <= 0) {
            throw new IllegalArgumentException("Party size must be a positive integer.");
        }

        Reservation reservation = new Reservation();
        reservation.setId(UUID.randomUUID());
        reservation.setCustomerName(request.getCustomerName());
        reservation.setCustomerPhone(request.getCustomerPhone());
        reservation.setCustomerEmail(request.getCustomerEmail());
        reservation.setReservationTime(request.getReservationTime());
        reservation.setPartySize(request.getPartySize());
        reservation.setSpecialRequests(request.getSpecialRequests());
        reservation.setStatus(ReservationStatus.PENDING);

        Reservation savedReservation = reservationRepository.save(reservation);

        // Placeholder for email functionality:
        // sendConfirmationEmail(request.getCustomerEmail(), savedReservation);

        return mapToReservationResponse(savedReservation);
    }

    public List<ReservationResponse> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAllByOrderByReservationTimeDesc();
        return reservations.stream()
                .map(this::mapToReservationResponse)
                .collect(Collectors.toList());
    }

    public ReservationResponse updateReservationStatus(UUID id, UpdateReservationStatusRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));

        reservation.setStatus(request.getStatus());

        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToReservationResponse(updatedReservation);
    }

    private ReservationResponse mapToReservationResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .customerName(reservation.getCustomerName())
                .customerPhone(reservation.getCustomerPhone())
                .reservationTime(reservation.getReservationTime())
                .partySize(reservation.getPartySize())
                .status(reservation.getStatus().name())
                .build();
    }
}