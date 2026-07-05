import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  const { t } = useTranslation();
  useDocumentTitle(t('not_found.heading'));

  return (
    <div className="page-enter min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[180px] font-black leading-none gradient-text animate-float select-none">
            {t('not_found.title')}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full bg-[#e63946]/10 animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {t('not_found.heading')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          {t('not_found.description')}
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#e63946] text-white font-semibold hover:bg-[#c1121f] shadow-xl shadow-[#e63946]/25 hover:shadow-2xl hover:shadow-[#e63946]/35 transition-all duration-200 hover:scale-105">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {t('not_found.go_home')}
        </Link>
      </div>
    </div>
  );
}
