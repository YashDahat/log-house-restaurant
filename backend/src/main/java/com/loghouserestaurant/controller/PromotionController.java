package com.loghouserestaurant.controller;

import com.loghouserestaurant.dto.PromotionDto;
import com.loghouserestaurant.service.PromotionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/promotions")
public class PromotionController {

    private final PromotionService promotionService;

    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @GetMapping("/active")
    public ResponseEntity<PromotionDto> getActivePromotion() {
        Optional<PromotionDto> activePromotion = promotionService.getActivePromotion();
        return activePromotion.map(ResponseEntity::ok)
                              .orElseGet(() -> ResponseEntity.noContent().build());
    }
}