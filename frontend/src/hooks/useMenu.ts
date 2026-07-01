import { useQuery } from 'react-query';
import { MenuItem, MenuItemCategory } from '../types/menu';
import { getMenuItems, getMenuCategories } from '../services/menuService';

export const useMenu = (category?: string) => {
  const { data, isLoading, error } = useQuery<MenuItem[], Error>(
    ['menuItems', category],
    () => getMenuItems(category)
  );

  return {
    data: data || [],
    isLoading,
    error,
  };
};

export const useMenuCategories = () => {
  const { data, isLoading, error } = useQuery<MenuItemCategory[], Error>(
    ['menuCategories'],
    getMenuCategories
  );

  return {
    data: data || [],
    isLoading,
    error,
  };
};