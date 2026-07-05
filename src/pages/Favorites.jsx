import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import useFavoritesStore from '../store/favoritesStore';
import CarGrid from '../components/cars/CarGrid';
import EmptyState from '../components/common/EmptyState';

export default function Favorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useDocumentTitle(t('favorites.title'));
  const { favorites } = useFavoritesStore();

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e63946]/10 mb-4">
          <svg className="w-7 h-7 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          {t('favorites.title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {t('favorites.subtitle')}
        </p>
        {favorites.length > 0 && (
          <span className="inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-bold bg-[#e63946]/10 text-[#e63946] border border-[#e63946]/20">
            {t('favorites.count', { count: favorites.length })}
          </span>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
          title={t('favorites.empty')}
          description={t('favorites.empty_desc')}
          action={() => navigate('/')}
          actionLabel={t('favorites.browse_cars')}
        />
      ) : (
        <CarGrid cars={favorites} />
      )}
    </div>
  );
}
