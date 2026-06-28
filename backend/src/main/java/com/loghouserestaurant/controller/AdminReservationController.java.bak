package com.loghouserestaurant.controller;

import com.loghouserestaurant.service.ReservationService;
import com.loghouserestaurant.dto.ReservationResponse;
import com.loghouserestaurant.dto.UpdateReservationStatusRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/reservations")
public class AdminReservationController {

    private final ReservationService reservationService;

    @Autowired
    public AdminReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority(\"ADMIN\")")
    public ResponseEntity<List<ReservationResponse>> getAllReservations() {
        List<ReservationResponse> reservations = reservationService.getAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAuthority(\"ADMIN\")")
    public ResponseEntity<ReservationResponse> updateReservationStatus(@PathVariable UUID id, @Valid @RequestBody UpdateReservationStatusRequest request) {
        ReservationResponse updatedReservation = reservationService.updateReservationStatus(id, request);
        return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
    }
}