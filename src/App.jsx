import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import { PageLoader } from './components/common/LoadingSpinner';
import ProtectedRoute from './routes/ProtectedRoute';
import useThemeStore from './store/themeStore';
import useLanguageStore from './store/languageStore';

const Home = lazy(() => import('./pages/Home'));
const CarDetails = lazy(() => import('./pages/CarDetails'));
const Favorites = lazy(() => import('./pages/Favorites'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  const initTheme = useThemeStore((s) => s.initTheme);
  const initLanguage = useLanguageStore((s) => s.initLanguage);

  useEffect(() => {
    initTheme();
    initLanguage();
  }, [initTheme, initLanguage]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            className: 'toast-custom',
            style: {
              borderRadius: '16px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
