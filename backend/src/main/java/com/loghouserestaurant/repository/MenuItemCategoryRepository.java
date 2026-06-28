package com.loghouserestaurant.repository;

import com.loghouserestaurant.model.MenuItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface MenuItemCategoryRepository extends JpaRepository<MenuItemCategory, UUID> {}
