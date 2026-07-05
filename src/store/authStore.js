import { create } from 'zustand';
import * as authApi from '../services/authApi';

const useAuthStore = create((set) => {
  const session = authApi.getCurrentUser();

  return {
    user: session?.user || null,
    token: session?.token || null,
    isAuthenticated: !!session,
    isLoading: false,
    error: null,

    login: async (email, password) => {
      set({ isLoading: true, error: null });
      try {
        const result = authApi.login(email, password);
        set({ user: result.user, token: result.token, isAuthenticated: true, isLoading: false });
        return result;
      } catch (err) {
        set({ error: err.message, isLoading: false });
        throw err;
      }
    },

    register: async (name, email, password) => {
      set({ isLoading: true, error: null });
      try {
        const result = authApi.register(name, email, password);
        set({ user: result.user, token: result.token, isAuthenticated: true, isLoading: false });
        return result;
      } catch (err) {
        set({ error: err.message, isLoading: false });
        throw err;
      }
    },

    logout: () => {
      authApi.logout();
      set({ user: null, token: null, isAuthenticated: false, error: null });
    },

    updateProfile: (updates) => {
      try {
        const updated = authApi.updateProfile(updates);
        set({ user: updated });
        return updated;
      } catch (err) {
        set({ error: err.message });
        throw err;
      }
    },

    clearError: () => set({ error: null }),
  };
});

export default useAuthStore;
