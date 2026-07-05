import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../../utils/formatPrice';
import { getTransmissionLabel, getFuelTypeLabel } from '../../utils/generateCarData';
import FavoriteButton from './FavoriteButton';

const FUEL_ICONS = { gas: '⛽', diesel: '🛢️', electricity: '⚡', hybrid: '🔋' };

export default function CarCard({ car }) {
  const { t } = useTranslation();
  if (!car) return null;

  const fuelIcon = FUEL_ICONS[car.fuel_type?.toLowerCase()] || '⛽';

  return (
    <div className="group relative bg-white dark:bg-[#0e1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#1e2337] card-hover card-shine animate-fade-in flex flex-col shadow-sm hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40">
      <Link to={`/cars/${car.id}`} className="relative block overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-[#151929] flex-shrink-0">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-sm border border-white/20">
          {car.year}
        </span>
        <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm border border-white/20">
          {fuelIcon} {getFuelTypeLabel(car.fuel_type)}
        </span>
        <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FavoriteButton car={car} size="sm" />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <Link to={`/cars/${car.id}`} className="block mb-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#e63946] mb-1">{car.make}</p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#e63946] transition-colors duration-200 leading-tight">
            {car.model}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 dark:text-gray-500 capitalize mb-4">{car.class}</p>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-3.5 h-3.5 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            {getTransmissionLabel(car.transmission)}
          </div>
          {car.combination_mpg > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              {car.combination_mpg} MPG
            </div>
          )}
          {car.cylinders > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
              </svg>
              {car.cylinders} Cyl
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#1e2337] flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">Starting at</p>
            <p className="text-xl font-extrabold text-[#e63946] leading-none">{formatPrice(car.price)}</p>
          </div>
          <Link
            to={`/cars/${car.id}`}
            className="px-4 py-2.5 rounded-xl text-sm font-bold bg-[#e63946] text-white hover:bg-[#c1121f] shadow-md shadow-[#e63946]/30 hover:shadow-[#e63946]/50 hover:scale-105 transition-all duration-200">
            {t('cars.view_details')}
          </Link>
        </div>
      </div>
    </div>
  );
}
