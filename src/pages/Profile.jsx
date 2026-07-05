import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import useAuthStore from '../store/authStore';
import useFavoritesStore from '../store/favoritesStore';
import useThemeStore from '../store/themeStore';
import useLanguageStore from '../store/languageStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

export default function Profile() {
  const { t } = useTranslation();
  useDocumentTitle(t('profile.title'));
  const { user, logout, updateProfile } = useAuthStore();
  const favorites = useFavoritesStore((s) => s.favorites);
  const { theme, toggleTheme } = useThemeStore();
  const { language, toggleLanguage } = useLanguageStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    if (name.trim().length < 2) { toast.error('Name must be at least 2 characters'); return; }
    updateProfile({ name: name.trim() });
    setEditing(false);
    toast.success(t('profile.updated'));
  };

  const handleLogout = () => {
    logout();
    toast.success(t('auth.logout_success'));
  };

  return (
    <div className="page-enter max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
        {t('profile.title')}
      </h1>

      <div className="bg-white dark:bg-[#0e1120] rounded-2xl border border-gray-100 dark:border-[#1e2337] overflow-hidden mb-5 shadow-sm">
        <div className="h-24 bg-gradient-to-r from-[#e63946] via-purple-600 to-blue-600" />
        <div className="px-6 pb-6">
          <div className="-mt-12 mb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#0e1120] shadow-lg object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{user?.email}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#151929] border border-gray-100 dark:border-[#1e2337]">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{t('profile.member_since')}</p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#e63946]/10 border border-[#e63946]/20">
              <p className="text-[10px] text-[#e63946] uppercase tracking-wide">{t('profile.saved_cars')}</p>
              <p className="text-sm font-semibold text-[#e63946]">{favorites.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0e1120] rounded-2xl border border-gray-100 dark:border-[#1e2337] p-6 mb-5 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">{t('profile.account_info')}</h3>
        {editing ? (
          <div className="space-y-4">
            <Input label={t('profile.name')} value={name} onChange={(e) => setName(e.target.value)} />
            <div className="flex gap-3">
              <Button variant="primary" onClick={handleSave}>{t('profile.save_changes')}</Button>
              <Button variant="ghost" onClick={() => { setEditing(false); setName(user?.name || ''); }}>
                {t('profile.cancel')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {[
              { label: t('profile.name'), value: user?.name },
              { label: t('profile.email'), value: user?.email },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#1e2337] last:border-0">
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.value}</span>
              </div>
            ))}
            <Button variant="secondary" size="sm" onClick={() => setEditing(true)} className="mt-3">
              {t('profile.edit_profile')}
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#0e1120] rounded-2xl border border-gray-100 dark:border-[#1e2337] p-6 mb-5 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">{t('profile.preferences')}</h3>
        <div className="space-y-4">
          {[
            {
              label: t('profile.theme'),
              sub: theme === 'light' ? t('common.light') : t('common.dark'),
              active: theme === 'dark',
              toggle: toggleTheme,
            },
            {
              label: t('profile.language'),
              sub: language === 'en' ? t('common.english') : t('common.arabic'),
              active: language === 'ar',
              toggle: toggleLanguage,
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.sub}</p>
              </div>
              <button
                onClick={item.toggle}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${item.active ? 'bg-[#e63946]' : 'bg-gray-200 dark:bg-[#1e2337]'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${item.active ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button variant="danger" size="lg" className="w-full" onClick={handleLogout}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        {t('nav.logout')}
      </Button>
    </div>
  );
}
