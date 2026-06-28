package com.loghouserestaurant.repository;

import com.loghouserestaurant.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PromotionRepository extends JpaRepository<Promotion, UUID> {
    Optional<Promotion> findFirstByIsActiveTrue();
    List<Promotion> findByIsActiveTrue();
    List<Promotion> findByIsActiveFalse();
}