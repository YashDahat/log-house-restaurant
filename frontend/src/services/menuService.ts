import { apiClient } from '../api/client';
import { MenuItem, MenuItemCategory } from '../types/menu';

export const getMenuItems = async (category?: string): Promise<MenuItem[]> => {
  try {
    const response = await apiClient.get<MenuItem[]>('/menu', {
      params: category ? { category } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to fetch menu items.');
  }
};

export const getMenuCategories = async (): Promise<MenuItemCategory[]> => {
  try {
    const response = await apiClient.get<MenuItemCategory[]>('/menu/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    throw new Error('Failed to fetch menu categories.');
  }
};