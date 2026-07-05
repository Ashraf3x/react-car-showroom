import { useState } from 'react';
import useFavoritesStore from '../../store/favoritesStore';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function FavoriteButton({ car, size = 'md', className = '' }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const [animating, setAnimating] = useState(false);
  const liked = isFavorite(car?.id);

  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error(t('auth.login_subtitle'));
      navigate('/login');
      return;
    }

    setAnimating(true);
    const added = toggleFavorite(car);

    if (added) {
      toast.success(t('cars.add_favorite'));
    } else {
      toast(t('cars.remove_favorite'), { icon: '💔' });
    }

    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleToggle}
      className={`${sizes[size]} rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
        liked
          ? 'bg-[#e63946]/10 text-[#e63946] hover:bg-[#e63946]/20'
          : 'bg-white/80 dark:bg-[#151929]/80 text-gray-400 dark:text-gray-500 hover:text-[#e63946] hover:bg-[#e63946]/10 shadow-sm'
      } ${className}`}
      aria-label={liked ? t('cars.remove_favorite') : t('cars.add_favorite')}>
      <svg
        className={`${iconSizes[size]} transition-transform duration-200 ${animating ? 'scale-125' : 'scale-100'}`}
        fill={liked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={liked ? 0 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
