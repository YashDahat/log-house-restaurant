import { apiClient } from '@/api/client';
import { Promotion } from '@/types/promotion';

export const getActivePromotion = async (): Promise<Promotion | null> => {
  try {
    const response = await apiClient.get<Promotion>('/promotions/active');
    return response.data;
  } catch (error) {
    // console.error('Error fetching active promotion:', error); // No unsolicited comments
    return null;
  }
};