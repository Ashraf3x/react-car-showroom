import { useTranslation } from 'react-i18next';
import { POPULAR_MAKES, FUEL_TYPES, TRANSMISSIONS, YEAR_RANGE } from '../../utils/generateCarData';

export default function CarFilters({ filters, onFilterChange, onClear, className = '' }) {
  const { t } = useTranslation();

  const years = [];
  for (let y = YEAR_RANGE.max; y >= YEAR_RANGE.min; y--) {
    years.push(y);
  }

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const selectClass = `
    w-full px-4 py-2.5 rounded-xl border
    border-gray-200 dark:border-[#1e2337]
    bg-white dark:bg-[#151929]
    text-gray-700 dark:text-gray-300
    text-sm focus:outline-none focus:ring-2 focus:ring-[#e63946]/40 focus:border-[#e63946]
    transition-all duration-200 cursor-pointer appearance-none
  `;

  const activeFiltersCount = [filters.make, filters.year, filters.fuel_type, filters.transmission].filter(Boolean).length;

  return (
    <div className={`bg-white dark:bg-[#0e1120] rounded-2xl border border-gray-100 dark:border-[#1e2337] overflow-hidden shadow-sm ${className}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#1e2337] bg-gray-50 dark:bg-[#151929]/60">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg className="w-4 h-4 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {t('cars.filters')}
          {activeFiltersCount > 0 && (
            <span className="ml-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#e63946] text-white text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-[#e63946] hover:text-[#c1121f] font-semibold transition-colors cursor-pointer">
            {t('cars.clear_filters')}
          </button>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            {t('cars.brand')}
          </label>
          <div className="relative">
            <select
              value={filters.make || ''}
              onChange={(e) => handleChange('make', e.target.value)}
              className={selectClass}>
              <option value="">{t('cars.all_brands')}</option>
              {POPULAR_MAKES.map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            {t('cars.year')}
          </label>
          <div className="relative">
            <select
              value={filters.year || ''}
              onChange={(e) => handleChange('year', e.target.value)}
              className={selectClass}>
              <option value="">{t('cars.all_years')}</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            {t('cars.fuel_type')}
          </label>
          <div className="relative">
            <select
              value={filters.fuel_type || ''}
              onChange={(e) => handleChange('fuel_type', e.target.value)}
              className={selectClass}>
              <option value="">{t('cars.all_fuel_types')}</option>
              {FUEL_TYPES.map((fuel) => (
                <option key={fuel} value={fuel}>{t(`cars.${fuel}`)}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
            {t('cars.transmission')}
          </label>
          <div className="relative">
            <select
              value={filters.transmission || ''}
              onChange={(e) => handleChange('transmission', e.target.value)}
              className={selectClass}>
              <option value="">{t('cars.all_transmissions')}</option>
              {TRANSMISSIONS.map((tr) => (
                <option key={tr} value={tr}>{t(`cars.${tr === 'a' ? 'automatic' : 'manual'}`)}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={onClear}
            className="w-full mt-2 py-2.5 rounded-xl text-sm font-bold border-2 border-[#e63946] text-[#e63946] hover:bg-[#e63946] hover:text-white transition-all duration-200 cursor-pointer">
            {t('cars.clear_filters')}
          </button>
        )}
      </div>
    </div>
  );
}
