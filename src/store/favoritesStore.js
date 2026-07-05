import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (car) => {
        const { favorites } = get();
        if (!favorites.find(f => f.id === car.id)) {
          set({ favorites: [...favorites, car] });
        }
      },

      removeFavorite: (carId) => {
        set({ favorites: get().favorites.filter(f => f.id !== carId) });
      },

      toggleFavorite: (car) => {
        const { favorites } = get();
        if (favorites.find(f => f.id === car.id)) {
          set({ favorites: favorites.filter(f => f.id !== car.id) });
          return false;
        } else {
          set({ favorites: [...favorites, car] });
          return true;
        }
      },

      isFavorite: (carId) => {
        return get().favorites.some(f => f.id === carId);
      },

      clearFavorites: () => set({ favorites: [] }),

      get favoritesCount() {
        return get().favorites.length;
      },
    }),
    {
      name: 'carshowroom_favorites',
    }
  )
);

export default useFavoritesStore;
