import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

const useLanguageStore = create(
  persist(
    (set, get) => ({
      language: 'en',

      setLanguage: (lang) => {
        set({ language: lang });
        applyLanguage(lang);
      },

      toggleLanguage: () => {
        const newLang = get().language === 'en' ? 'ar' : 'en';
        set({ language: newLang });
        applyLanguage(newLang);
      },

      initLanguage: () => {
        const lang = get().language;
        applyLanguage(lang);
      },
    }),
    {
      name: 'carshowroom_language',
    }
  )
);

function applyLanguage(lang) {
  const root = document.documentElement;
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  i18n.changeLanguage(lang);
}

export default useLanguageStore;
