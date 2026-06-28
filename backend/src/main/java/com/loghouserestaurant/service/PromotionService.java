package com.loghouserestaurant.service;

import com.loghouserestaurant.repository.PromotionRepository;
import com.loghouserestaurant.dto.PromotionDto;
import com.loghouserestaurant.exception.ResourceNotFoundException;
import com.loghouserestaurant.model.Promotion;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PromotionService {

    private final PromotionRepository promotionRepository;

    public PromotionService(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    public Optional<PromotionDto> getActivePromotion() {
        return promotionRepository.findFirstByIsActiveTrue()
                .map(this::convertToDto);
    }

    public List<PromotionDto> getAllPromotions() {
        return promotionRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PromotionDto createPromotion(PromotionDto promotionDto) {
        if (promotionDto.getIsActive() != null && promotionDto.getIsActive()) {
            deactivateAllOtherPromotions(null); // Deactivate all existing active promotions
        }

        Promotion promotion = new Promotion(
                promotionDto.getTitle(),
                promotionDto.getDescription(),
                promotionDto.getIsActive() != null ? promotionDto.getIsActive() : false
        );
        Promotion savedPromotion = promotionRepository.save(promotion);
        return convertToDto(savedPromotion);
    }

    public PromotionDto updatePromotion(UUID id, PromotionDto promotionDto) {
        Promotion existingPromotion = promotionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Promotion not found with id: " + id));

        existingPromotion.setTitle(promotionDto.getTitle());
        existingPromotion.setDescription(promotionDto.getDescription());
        
        if (promotionDto.getIsActive() != null && promotionDto.getIsActive()) {
            deactivateAllOtherPromotions(id); // Deactivate all active promotions except the current one
        }
        existingPromotion.setActive(promotionDto.getIsActive() != null ? promotionDto.getIsActive() : false);

        Promotion updatedPromotion = promotionRepository.save(existingPromotion);
        return convertToDto(updatedPromotion);
    }

    private void deactivateAllOtherPromotions(UUID excludeId) {
        List<Promotion> currentlyActivePromotions = promotionRepository.findByIsActiveTrue();
        for (Promotion activePromo : currentlyActivePromotions) {
            if (excludeId == null || !activePromo.getId().equals(excludeId)) {
                activePromo.setActive(false);
                promotionRepository.save(activePromo);
            }
        }
    }

    private PromotionDto convertToDto(Promotion promotion) {
        return PromotionDto.builder()
                .id(promotion.getId())
                .title(promotion.getTitle())
                .description(promotion.getDescription())
                .isActive(promotion.isActive())
                .build();
    }
}