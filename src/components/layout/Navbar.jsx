import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../store/authStore';
import useFavoritesStore from '../../store/favoritesStore';
import useThemeStore from '../../store/themeStore';
import useLanguageStore from '../../store/languageStore';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const favorites = useFavoritesStore((s) => s.favorites);
  const { theme, toggleTheme } = useThemeStore();
  const { language, toggleLanguage } = useLanguageStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success(t('auth.logout_success'));
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/search', label: t('nav.search') },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/60 dark:border-white/[0.06]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 mr-3 rtl:mr-0 rtl:ml-3 group">
          <div className="w-8 h-8 rounded-xl bg-[#e63946] flex items-center justify-center shadow-lg shadow-[#e63946]/30 group-hover:scale-110 transition-transform duration-200">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-[17px] font-extrabold tracking-tight text-gray-900 dark:text-white">
            Car<span className="text-[#e63946]">Showroom</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}
              className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#e63946] hover:bg-[#e63946]/8 transition-all duration-200">
              {l.label}
            </Link>
          ))}
          {isAuthenticated && (
            <>
              <Link to="/favorites"
                className="relative px-3 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#e63946] hover:bg-[#e63946]/8 transition-all duration-200">
                {t('nav.favorites')}
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#e63946] text-white text-[10px] font-bold flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <Link to="/profile"
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#e63946] hover:bg-[#e63946]/8 transition-all duration-200">
                {t('nav.profile')}
              </Link>
            </>
          )}
        </div>

        <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-xs mx-auto">
          <div className="relative w-full">
            <svg className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('nav.search_placeholder')}
              className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-white/[0.06] border border-transparent focus:border-[#e63946]/40 focus:bg-white dark:focus:bg-white/10 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e63946]/20 transition-all duration-200"
            />
          </div>
        </form>

        <div className="flex items-center gap-1 ml-auto rtl:ml-0 rtl:mr-auto">
          <button
            onClick={toggleLanguage}
            className="w-9 h-9 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.07] hover:text-[#e63946] transition-all cursor-pointer flex items-center justify-center"
            title={language === 'en' ? 'العربية' : 'English'}>
            {language === 'en' ? 'ع' : 'EN'}
          </button>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.07] hover:text-[#e63946] transition-all cursor-pointer">
            {theme === 'light'
              ? <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              : <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            }
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 dark:border-white/10 hover:border-[#e63946] transition-all cursor-pointer">
                <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 top-11 w-52 rounded-2xl bg-white dark:bg-[#151929] border border-gray-100 dark:border-[#1e2337] shadow-2xl shadow-black/20 z-50 animate-slide-down overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 dark:bg-[#1e2337]/60 border-b border-gray-100 dark:border-[#1e2337]">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      {[
                        { to: '/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: t('nav.profile') },
                        { to: '/favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: `${t('nav.favorites')} (${favorites.length})` },
                      ].map(item => (
                        <Link key={item.to} to={item.to} onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:text-gray-900 dark:hover:text-white transition-all">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                          {item.label}
                        </Link>
                      ))}
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[#e63946] hover:bg-[#e63946]/8 transition-all cursor-pointer">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t('nav.logout')}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#e63946] transition-colors">
                {t('nav.login')}
              </Link>
              <Link to="/register"
                className="px-4 py-2 rounded-xl text-sm font-bold bg-[#e63946] text-white hover:bg-[#c1121f] shadow-lg shadow-[#e63946]/25 hover:shadow-[#e63946]/40 hover:scale-105 transition-all duration-200">
                {t('nav.register')}
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.07] transition-all cursor-pointer">
            {mobileOpen
              ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            }
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden animate-slide-down border-t border-gray-100 dark:border-white/[0.06] bg-white dark:bg-[#0e1120]">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <svg className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.search_placeholder')}
                  className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.06] text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63946]/30 transition-all"
                />
              </div>
            </form>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:text-[#e63946] transition-all">
                {l.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/favorites" onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:text-[#e63946] transition-all">
                  {t('nav.favorites')} {favorites.length > 0 && `(${favorites.length})`}
                </Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:text-[#e63946] transition-all">
                  {t('nav.profile')}
                </Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2.5 rounded-xl text-sm font-medium text-[#e63946] hover:bg-[#e63946]/8 transition-all cursor-pointer">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-[#e63946] hover:text-[#e63946] transition-all">
                  {t('nav.login')}
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold bg-[#e63946] text-white hover:bg-[#c1121f] transition-all">
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
