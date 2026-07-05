import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useSearchCars } from '../hooks/useSearchCars';
import { sortCars, paginateCars } from '../services/carsApi';
import CarGrid from '../components/cars/CarGrid';
import CarSort from '../components/cars/CarSort';
import Pagination from '../components/common/Pagination';
import { CarGridSkeleton } from '../components/common/Skeleton';
import ErrorFallback from '../components/common/ErrorFallback';
import EmptyState from '../components/common/EmptyState';

export default function SearchResults() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [sortBy, setSortBy] = useState('newest');
  const [inputValue, setInputValue] = useState(query);

  useDocumentTitle(query ? `${t('search.results_for')} "${query}"` : t('search.title'));

  const { data: cars, isLoading, isError, error, refetch } = useSearchCars(query);

  const processedData = useMemo(() => {
    if (!cars) return null;
    const sorted = sortCars(cars, sortBy);
    return paginateCars(sorted, page);
  }, [cars, sortBy, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ query: inputValue.trim(), page: '1' });
    }
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          {t('search.title')}
        </h1>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full pl-12 pr-32 py-4 rounded-2xl border border-gray-200 dark:border-[#1e2337] bg-white dark:bg-[#0e1120] text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-[#e63946]/40 focus:border-[#e63946] transition-all shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-xl bg-[#e63946] text-white text-sm font-bold hover:bg-[#c1121f] transition-all cursor-pointer">
              {t('hero.search_button')}
            </button>
          </div>
        </form>
      </div>

      {query && (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-400">
            {t('search.results_for')}{' '}
            <span className="font-bold text-gray-900 dark:text-white">"{query}"</span>
            {processedData && (
              <span className="ml-2 text-sm text-gray-400">
                ({processedData.totalItems} {t('cars.results')})
              </span>
            )}
          </p>
          <CarSort sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      )}

      {!query && (
        <EmptyState
          icon={
            <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
          title={t('search.no_query')}
          description={t('search.placeholder')}
        />
      )}

      {isLoading && <CarGridSkeleton count={6} />}
      {isError && <ErrorFallback error={error} onRetry={refetch} />}

      {processedData && processedData.data.length === 0 && (
        <EmptyState
          title={t('cars.no_results')}
          description={t('cars.no_results_desc')}
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
  );
}
