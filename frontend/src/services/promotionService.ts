import { apiClient } from '../api/client';
import { Promotion } from '../types/promotion';

export async function getActivePromotion(): Promise<Promotion | null> {
  try {
    const response = await apiClient.get<Promotion>('/promotions/active');
    return response.data;
  } catch (error) {
    // If no active promotion is found (e.g., 404) or any other API error, return null
    console.error('Failed to fetch active promotion:', error);
    return null;
  }
}