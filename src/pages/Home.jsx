import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCars, useBrowseCars } from '../hooks/useCars';
import { sortCars, paginateCars } from '../services/carsApi';
import Hero from '../components/home/Hero';
import FeaturedCars from '../components/home/FeaturedCars';
import BrandShowcase from '../components/home/BrandShowcase';
import CarGrid from '../components/cars/CarGrid';
import CarFilters from '../components/cars/CarFilters';
import CarSort from '../components/cars/CarSort';
import Pagination from '../components/common/Pagination';
import { CarGridSkeleton } from '../components/common/Skeleton';
import ErrorFallback from '../components/common/ErrorFallback';
import EmptyState from '../components/common/EmptyState';

export default function Home() {
  const { t } = useTranslation();
  useDocumentTitle(t('home.title'));
  const [searchParams, setSearchParams] = useSearchParams();

  const brand = searchParams.get('brand') || '';
  const year = searchParams.get('year') || '';
  const fuelType = searchParams.get('fuel_type') || '';
  const transmission = searchParams.get('transmission') || '';
  const sortBy = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const filters = { make: brand, year, fuel_type: fuelType, transmission };
  const hasActiveFilters = brand || year || fuelType || transmission;

  const filteredQuery = useCars(filters);
  const browseQuery = useBrowseCars(36);

  const { data: cars, isLoading, isError, error, refetch } = hasActiveFilters
    ? filteredQuery
    : browseQuery;

  const processedData = useMemo(() => {
    if (!cars) return null;
    const sorted = sortCars(cars, sortBy);
    return paginateCars(sorted, page);
  }, [cars, sortBy, page]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.make) params.set('brand', newFilters.make);
    if (newFilters.year) params.set('year', newFilters.year);
    if (newFilters.fuel_type) params.set('fuel_type', newFilters.fuel_type);
    if (newFilters.transmission) params.set('transmission', newFilters.transmission);
    params.set('sort', sortBy);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSortChange = (newSort) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const handleClearFilters = () => setSearchParams({});

  return (
    <div className="page-enter">
      <Hero />

      {!hasActiveFilters && (
        <>
          <FeaturedCars />
          <BrandShowcase />
        </>
      )}

      <section className="py-16 sm:py-20 bg-white dark:bg-[#080a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#e63946] mb-3">Collection</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              {t('home.browse')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {t('home.browse_subtitle')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-72 flex-shrink-0">
              <CarFilters
                filters={{ make: brand, year, fuel_type: fuelType, transmission }}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-gray-50 dark:bg-[#0e1120] rounded-2xl border border-gray-100 dark:border-[#1e2337]">
                {processedData ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('cars.showing')}{' '}
                    <span className="font-bold text-gray-900 dark:text-white">{processedData.data.length}</span>
                    {' '}{t('cars.of')}{' '}
                    <span className="font-bold text-gray-900 dark:text-white">{processedData.totalItems}</span>
                    {' '}{t('cars.results')}
                  </p>
                ) : <div />}
                <CarSort sortBy={sortBy} onSortChange={handleSortChange} />
              </div>

              {isLoading && <CarGridSkeleton count={6} />}
              {isError && <ErrorFallback error={error} onRetry={refetch} />}
              {processedData && processedData.data.length === 0 && (
                <EmptyState
                  title={t('cars.no_results')}
                  description={t('cars.no_results_desc')}
                  action={handleClearFilters}
                  actionLabel={t('cars.clear_filters')}
                />
              )}
              {processedData && processedData.data.length > 0 && (
                <>
                  <CarGrid cars={processedData.data} />
                  <Pagination
                    currentPage={processedData.currentPage}
                    totalPages={processedData.totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
