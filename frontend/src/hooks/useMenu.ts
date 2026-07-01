import { useQuery } from '@tanstack/react-query';
import { getMenuItems, getMenuCategories } from '../services/menuService';
import { MenuItem, MenuItemCategory } from '../types/menu';

export const useMenu = (category?: string) => {
  const { data, isLoading, error } = useQuery<MenuItem[], Error>({
    queryKey: ['menuItems', category],
    queryFn: () => getMenuItems(category),
  });

  return { data: data || [], isLoading, error };
};

export const useMenuCategories = () => {
  const { data, isLoading, error } = useQuery<MenuItemCategory[], Error>({
    queryKey: ['menuCategories'],
    queryFn: getMenuCategories,
  });

  return { data: data || [], isLoading, error };
};
