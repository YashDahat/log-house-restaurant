import { apiClient } from '../api/client';
import { MenuItem, MenuItemCategory } from '../types/menu';

export async function getMenuItems(category?: string): Promise<MenuItem[]> {
  try {
    let url = '/menu';
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }
    const response = await apiClient.get<MenuItem[]>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to fetch menu items.');
  }
}

export async function getMenuCategories(): Promise<MenuItemCategory[]> {
  try {
    const response = await apiClient.get<MenuItemCategory[]>('/menu/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    throw new Error('Failed to fetch menu categories.');
  }
}