import { useTranslation } from 'react-i18next';
import Button from './Button';

export default function EmptyState({
  icon,
  title,
  description,
  action,
  actionLabel,
  className = '',
}) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in ${className}`}>
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-[#151929] flex items-center justify-center mb-6 ring-4 ring-gray-50 dark:ring-[#0e1120]">
        {icon || (
          <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title || t('cars.no_results')}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        {description || t('cars.no_results_desc')}
      </p>
      {action && (
        <Button onClick={action} variant="primary">
          {actionLabel || t('hero.browse_all')}
        </Button>
      )}
    </div>
  );
}
