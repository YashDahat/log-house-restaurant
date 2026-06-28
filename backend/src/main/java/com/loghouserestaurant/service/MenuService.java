package com.loghouserestaurant.service;

import com.loghouserestaurant.repository.MenuItemRepository;
import com.loghouserestaurant.repository.MenuItemCategoryRepository;
import com.loghouserestaurant.dto.MenuItemDto;
import com.loghouserestaurant.dto.MenuItemCategoryDto;
import com.loghouserestaurant.model.MenuItem;
import com.loghouserestaurant.model.MenuItemCategory;
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
        // The MenuItemRepository context provided does not define findByCategoryNameAndIsAvailableTrue
        // or findAllByIsAvailableTrue. To make this file compile with the given repository contract,
        // we fetch all items and filter them in memory.
        List<MenuItem> menuItems = menuItemRepository.findAll();

        List<MenuItem> filteredItems = menuItems.stream()
                .filter(MenuItem::isAvailable) // Filter for available items
                .filter(item -> category.isEmpty() || item.getCategory().name().equalsIgnoreCase(category.get())) // Filter by category name if present
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

        // Assuming MenuItemCategory is a JPA entity with a getName() method,
        // as implied by MenuItemCategoryRepository extending JpaRepository<MenuItemCategory, UUID>
        // and MenuItemCategoryDto having 'id' and 'name' fields.
        // However, MenuItemCategory is defined as an enum in the provided context.
        // We adapt by using the enum's name() method for comparison.
        MenuItemCategory category = menuItemCategoryRepository.findAll().stream()
                .filter(c -> c.name().equalsIgnoreCase(menuItemDto.getCategoryName()))
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

        // Assuming MenuItemCategory is a JPA entity with a getName() method.
        // However, MenuItemCategory is defined as an enum in the provided context.
        // We adapt by using the enum's name() method for comparison.
        MenuItemCategory category = menuItemCategoryRepository.findAll().stream()
                .filter(c -> c.name().equalsIgnoreCase(menuItemDto.getCategoryName()))
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
        // MenuItemCategory is an enum, so it does not have getId() or getName() methods.
        // We generate a UUID from the enum's name for categoryId and use name() for categoryName.
        return MenuItemDto.builder()
                .id(menuItem.getId())
                .name(menuItem.getName())
                .description(menuItem.getDescription())
                .price(menuItem.getPrice())
                .imageUrl(menuItem.getImageUrl())
                .isVeg(menuItem.isVeg())
                .isAvailable(menuItem.isAvailable())
                .categoryId(UUID.nameUUIDFromBytes(menuItem.getCategory().name().getBytes()))
                .categoryName(menuItem.getCategory().name())
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
        // MenuItemCategory is an enum, so it does not have getId() or getName() methods.
        // We generate a UUID from the enum's name for id and use name() for name.
        return MenuItemCategoryDto.builder()
                .id(UUID.nameUUIDFromBytes(category.name().getBytes()))
                .name(category.name())
                .build();
    }

    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }
}