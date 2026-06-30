package com.loghouserestaurant.config;

import com.loghouserestaurant.model.MenuItem;
import com.loghouserestaurant.model.MenuItemCategory;
import com.loghouserestaurant.repository.MenuItemCategoryRepository;
import com.loghouserestaurant.repository.MenuItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MenuItemRepository menuItemRepository;
    private final MenuItemCategoryRepository menuItemCategoryRepository;

    public DataSeeder(MenuItemRepository menuItemRepository, MenuItemCategoryRepository menuItemCategoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuItemCategoryRepository = menuItemCategoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (menuItemCategoryRepository.count() == 0) {
            // Seed Categories
            MenuItemCategory startersCategory = new MenuItemCategory();
            startersCategory.setName("Starters");

            MenuItemCategory mainCourseCategory = new MenuItemCategory();
            mainCourseCategory.setName("Main Course");

            MenuItemCategory dessertsCategory = new MenuItemCategory();
            dessertsCategory.setName("Desserts");

            MenuItemCategory beveragesCategory = new MenuItemCategory();
            beveragesCategory.setName("Beverages");

            List<MenuItemCategory> categories = Arrays.asList(
                    startersCategory,
                    mainCourseCategory,
                    dessertsCategory,
                    beveragesCategory
            );
            List<MenuItemCategory> savedCategories = menuItemCategoryRepository.saveAll(categories);

            // Map saved categories back to variables for association with menu items
            MenuItemCategory savedStarters = savedCategories.get(0);
            MenuItemCategory savedMainCourse = savedCategories.get(1);
            MenuItemCategory savedDesserts = savedCategories.get(2);
            MenuItemCategory savedBeverages = savedCategories.get(3);

            // Seed Menu Items
            List<MenuItem> menuItems = Arrays.asList(
                    // Starters
                    new MenuItem(null, "Paneer Tikka", null, new BigDecimal("299.00"), null, true, true, savedStarters),
                    new MenuItem(null, "Vegetable Samosa", null, new BigDecimal("149.00"), null, true, true, savedStarters),

                    // Main Course
                    new MenuItem(null, "Butter Chicken", null, new BigDecimal("499.00"), null, false, true, savedMainCourse),
                    new MenuItem(null, "Dal Makhani", null, new BigDecimal("349.00"), null, true, true, savedMainCourse),
                    new MenuItem(null, "Paneer Butter Masala", null, new BigDecimal("399.00"), null, true, true, savedMainCourse),
                    new MenuItem(null, "Garlic Naan", null, new BigDecimal("80.00"), null, true, true, savedMainCourse),

                    // Desserts
                    new MenuItem(null, "Gulab Jamun", null, new BigDecimal("120.00"), null, true, true, savedDesserts),
                    new MenuItem(null, "Gajar Halwa", null, new BigDecimal("150.00"), null, true, true, savedDesserts),

                    // Beverages
                    new MenuItem(null, "Masala Chai", null, new BigDecimal("60.00"), null, true, true, savedBeverages),
                    new MenuItem(null, "Fresh Lime Soda", null, new BigDecimal("90.00"), null, true, true, savedBeverages)
            );
            menuItemRepository.saveAll(menuItems);
        }
    }
}