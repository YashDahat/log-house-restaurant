import { apiClient } from '../api/client';
import { Promotion } from '../types/promotion';

export async function getActivePromotion(): Promise<Promotion | null> {
  try {
    const response = await apiClient.get<Promotion>('/promotions/active');
    return response.data;
  } catch (error) {
    // Return null if no active promotion is found or an error occurs
    return null;
  }
}