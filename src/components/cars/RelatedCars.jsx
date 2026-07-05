import { useTranslation } from 'react-i18next';
import { useRelatedCars } from '../../hooks/useCarDetails';
import CarCard from './CarCard';
import { CarGridSkeleton } from '../common/Skeleton';

export default function RelatedCars({ make, excludeId }) {
  const { t } = useTranslation();
  const { data: cars, isLoading } = useRelatedCars(make, excludeId);

  if (isLoading) return <CarGridSkeleton count={3} />;
  if (!cars || cars.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-gray-100 dark:border-[#1e2337]">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#e63946] mb-1">More from {make}</p>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {t('car_details.related')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          {t('car_details.related_subtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.slice(0, 3).map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
