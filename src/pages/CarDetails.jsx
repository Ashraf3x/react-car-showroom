import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCarDetails } from '../hooks/useCarDetails';
import { formatPrice } from '../utils/formatPrice';
import CarImageGallery from '../components/cars/CarImageGallery';
import CarDetailSpecs from '../components/cars/CarDetailSpecs';
import RelatedCars from '../components/cars/RelatedCars';
import FavoriteButton from '../components/cars/FavoriteButton';
import { CarDetailSkeleton } from '../components/common/Skeleton';
import ErrorFallback from '../components/common/ErrorFallback';

export default function CarDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: car, isLoading, isError, error, refetch } = useCarDetails(id);

  useDocumentTitle(car ? `${car.make} ${car.model} ${car.year}` : t('car_details.title'));

  if (isLoading) return <CarDetailSkeleton />;
  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <ErrorFallback
          error={error?.message === 'Car not found' ? { message: t('car_details.not_found_desc') } : error}
          onRetry={refetch}
        />
      </div>
    );
  }
  if (!car) return null;

  return (
    <div className="page-enter max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-6">
        <Link to="/" className="hover:text-[#e63946] transition-colors">{t('nav.home')}</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{car.make} {car.model}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <CarImageGallery images={car.images} alt={`${car.make} ${car.model}`} />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#e63946] mb-2">{car.make}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                {car.make} {car.model}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#e63946]/10 text-[#e63946] border border-[#e63946]/20">
                  {car.year}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500 capitalize">{car.class}</span>
              </div>
            </div>
            <FavoriteButton car={car} size="lg" />
          </div>

          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-[#e63946]/5 to-[#e63946]/10 dark:from-[#e63946]/10 dark:to-[#e63946]/20 border border-[#e63946]/20">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('car_details.price')}</p>
            <p className="text-3xl font-extrabold text-[#e63946]">{formatPrice(car.price)}</p>
          </div>

          <CarDetailSpecs car={car} />
        </div>
      </div>



      <RelatedCars make={car.make} excludeId={car.id} />
    </div>
  );
}
