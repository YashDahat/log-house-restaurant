import { useQuery } from '@tanstack/react-query';
import { getActivePromotion } from '@/services/promotionService';
import { Promotion } from '@/types/promotion';

export const useActivePromotion = (): { data: Promotion | null, isLoading: boolean } => {
  const { data, isLoading } = useQuery<Promotion | null, Error>({
    queryKey: ['activePromotion'],
    queryFn: getActivePromotion,
  });

  return { data, isLoading };
};