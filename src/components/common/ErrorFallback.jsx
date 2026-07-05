import { useTranslation } from 'react-i18next';
import Button from './Button';

export default function ErrorFallback({ error, onRetry, className = '' }) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in ${className}`}>
      <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-[#e63946]/10 flex items-center justify-center mb-6 ring-4 ring-red-50/60 dark:ring-[#e63946]/5">
        <svg className="w-10 h-10 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {t('common.error')}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-2">
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </p>
      {error?.message?.includes('400') && (
        <p className="text-xs text-gray-400 dark:text-gray-500 max-w-sm mb-4 mt-1">
          This may be due to an invalid API key. Please check your <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">.env</code> file and ensure <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">VITE_API_KEY</code> is set correctly.
        </p>
      )}
      {onRetry && (
        <Button onClick={onRetry} variant="danger" className="mt-4">
          {t('common.retry')}
        </Button>
      )}
    </div>
  );
}
