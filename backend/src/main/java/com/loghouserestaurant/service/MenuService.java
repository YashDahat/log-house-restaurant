package com.loghouserestaurant.service;

import com.loghouserestaurant.repository.MenuItemRepository;
import com.loghouserestaurant.repository.MenuItemCategoryRepository;
import com.loghouserestaurant.dto.MenuItemDto;
import com.loghouserestaurant.dto.MenuItemCategoryDto;
import com.loghouserestaurant.model.MenuItem;
import com.loghouserestaurant.model.MenuItemCategory;
import com.loghouserestaurant.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.ValidationException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MenuService {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemCategoryRepository menuItemCategoryRepository;

    @Autowired
    public MenuService(MenuItemRepository menuItemRepository, MenuItemCategoryRepository menuItemCategoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuItemCategoryRepository = menuItemCategoryRepository;
    }

    public List<MenuItemDto> getAllAvailableMenuItems(Optional<String> category) {
        List<MenuItem> menuItems = menuItemRepository.findAll();

        List<MenuItem> filteredItems = menuItems.stream()
                .filter(MenuItem::isAvailable)
                .filter(item -> category.isEmpty() || item.getCategory().getName().equalsIgnoreCase(category.get()))
                .collect(Collectors.toList());

        return filteredItems.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MenuItemCategoryDto> getAllCategories() {
        List<MenuItemCategory> categories = menuItemCategoryRepository.findAll();
        return categories.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        if (menuItemDto.getName() == null || menuItemDto.getName().trim().isEmpty()) {
            throw new ValidationException("Menu item name cannot be null or empty.");
        }
        if (menuItemDto.getPrice() == null || menuItemDto.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new ValidationException("Menu item price must be positive.");
        }
        if (menuItemDto.getCategoryName() == null || menuItemDto.getCategoryName().trim().isEmpty()) {
            throw new ValidationException("Menu item category name cannot be null or empty.");
        }

        MenuItemCategory category = menuItemCategoryRepository.findAll().stream()
                .filter(c -> c.getName().equalsIgnoreCase(menuItemDto.getCategoryName()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Menu category not found: " + menuItemDto.getCategoryName()));

        MenuItem menuItem = convertToEntity(menuItemDto, category);
        menuItem.setId(null);

        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return convertToDto(savedMenuItem);
    }

    public MenuItemDto updateMenuItem(UUID id, MenuItemDto menuItemDto) {
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + id));

        if (menuItemDto.getName() == null || menuItemDto.getName().trim().isEmpty()) {
            throw new ValidationException("Menu item name cannot be null or empty.");
        }
        if (menuItemDto.getPrice() == null || menuItemDto.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new ValidationException("Menu item price must be positive.");
        }
        if (menuItemDto.getCategoryName() == null || menuItemDto.getCategoryName().trim().isEmpty()) {
            throw new ValidationException("Menu item category name cannot be null or empty.");
        }

        MenuItemCategory category = menuItemCategoryRepository.findAll().stream()
                .filter(c -> c.getName().equalsIgnoreCase(menuItemDto.getCategoryName()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Menu category not found: " + menuItemDto.getCategoryName()));

        existingMenuItem.setName(menuItemDto.getName());
        existingMenuItem.setDescription(menuItemDto.getDescription());
        existingMenuItem.setPrice(menuItemDto.getPrice());
        existingMenuItem.setImageUrl(menuItemDto.getImageUrl());
        existingMenuItem.setVeg(menuItemDto.getIsVeg());
        existingMenuItem.setAvailable(menuItemDto.getIsAvailable());
        existingMenuItem.setCategory(category);

        MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
        return convertToDto(updatedMenuItem);
    }

    public void deleteMenuItem(UUID id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found with ID: " + id);
        }
        menuItemRepository.deleteById(id);
    }

    private MenuItemDto convertToDto(MenuItem menuItem) {
        return MenuItemDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .isVeg(menuItem.isVeg())
                .isAvailable(menuItem.isAvailable())
                .categoryId(menuItem.getCategory().getId())
                .categoryName(menuItem.getCategory().getName())
                .build();
    }

    private MenuItem convertToEntity(MenuItemDto menuItemDto, MenuItemCategory category) {
        return new MenuItem(
                menuItemDto.getId(),
                menuItemDto.getName(),
                menuItemDto.getDescription(),
                menuItemDto.getPrice(),
                menuItemDto.getImageUrl(),
                menuItemDto.getIsVeg(),
                menuItemDto.getIsAvailable(),
                category
        );
    }

    private MenuItemCategoryDto convertToDto(MenuItemCategory category) {
        return MenuItemCategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
