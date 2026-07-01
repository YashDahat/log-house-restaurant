import { apiClient } from '../api/client';
import { Promotion } from '../types/promotion';

export async function getActivePromotion(): Promise<Promotion | null> {
  try {
    const response = await apiClient.get<Promotion>('/promotions/active');
    return response.data;
  } catch (error) {
    // If the request fails (e.g., 404 Not Found if no active promotion), return null
    return null;
  }
}