package com.loghouserestaurant.controller;

import com.loghouserestaurant.dto.MenuItemDto;
import com.loghouserestaurant.dto.MenuItemCategoryDto;
import com.loghouserestaurant.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    private final MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemDto>> getMenu(@RequestParam Optional<String> category) {
        List<MenuItemDto> menuItems = menuService.getAllAvailableMenuItems(category);
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<MenuItemCategoryDto>> getCategories() {
        List<MenuItemCategoryDto> categories = menuService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}