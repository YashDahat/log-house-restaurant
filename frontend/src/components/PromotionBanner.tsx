import { useActivePromotion } from '@/hooks/usePromotions';

export const PromotionBanner = (): JSX.Element | null => {
  const { data: promotion, isLoading } = useActivePromotion();

  if (isLoading) {
    return null; // Render nothing while loading
  }

  if (!promotion) {
    return null; // Render nothing if no active promotion is found
  }

  return (
    <section className="bg-[#D2691E] text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src={promotion.imageUrl}
          alt={promotion.title}
          className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-lg"
        />
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            {promotion.title}
          </h2>
          <p className="text-lg mt-2">
            {promotion.description}
          </p>
          <button className="mt-6 bg-[#FFC107] hover:bg-[#E0A800] text-[#4A2C2A] font-semibold rounded-full px-6 py-3 transition-all duration-200">
            View Special Offer
          </button>
        </div>
      </div>
    </section>
  );
};