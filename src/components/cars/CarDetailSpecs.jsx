import { useTranslation } from 'react-i18next';
import { formatPrice } from '../../utils/formatPrice';
import { getTransmissionLabel, getFuelTypeLabel, getDriveLabel } from '../../utils/generateCarData';

export default function CarDetailSpecs({ car }) {
  const { t } = useTranslation();
  if (!car) return null;

  const specs = [
    { label: t('car_details.make'),         value: car.make,                           icon: '🏭' },
    { label: t('car_details.model'),        value: car.model,                          icon: '🚗' },
    { label: t('car_details.year'),         value: car.year,                           icon: '📅' },
    { label: t('car_details.fuel_type'),    value: getFuelTypeLabel(car.fuel_type),    icon: '⛽' },
    { label: t('car_details.transmission'), value: getTransmissionLabel(car.transmission), icon: '⚙️' },
    { label: t('car_details.drive'),        value: getDriveLabel(car.drive),           icon: '🛞' },
    { label: t('car_details.cylinders'),    value: car.cylinders || '—',              icon: '🔧' },
    { label: t('car_details.displacement'), value: car.displacement ? `${car.displacement}L` : '—', icon: '📏' },
    { label: t('car_details.class'),        value: car.class || '—',                  icon: '📋' },
  ];

  const perfSpecs = [
    { label: t('car_details.city_mpg'),     value: car.city_mpg ? `${car.city_mpg}` : '—',         unit: 'MPG' },
    { label: t('car_details.highway_mpg'),  value: car.highway_mpg ? `${car.highway_mpg}` : '—',   unit: 'MPG' },
    { label: t('car_details.combined_mpg'), value: car.combination_mpg ? `${car.combination_mpg}` : '—', unit: 'MPG' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {t('car_details.overview')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {specs.map((spec) => (
            <div key={spec.label}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#151929] border border-gray-100 dark:border-[#1e2337]">
              <span className="text-base">{spec.icon}</span>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold">{spec.label}</p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 capitalize">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {t('car_details.performance')}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {perfSpecs.map((spec) => (
            <div key={spec.label}
              className="text-center p-4 rounded-xl bg-gray-50 dark:bg-[#151929] border border-gray-100 dark:border-[#1e2337]">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white mb-0.5">{spec.value}</p>
              {spec.value !== '—' && <p className="text-xs text-[#e63946] font-bold">{spec.unit}</p>}
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide font-semibold mt-1">{spec.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
