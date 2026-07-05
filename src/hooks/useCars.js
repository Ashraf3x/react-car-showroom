import { useQuery } from '@tanstack/react-query';
import { getCars, getFeaturedCars, getBrowseCars } from '../services/carsApi';

export function useCars(params = {}) {
  return useQuery({
    queryKey: ['cars', params],
    queryFn: () => getCars(params),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useBrowseCars(limit = 36) {
  return useQuery({
    queryKey: ['browseCars', limit],
    queryFn: () => getBrowseCars(limit),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useFeaturedCars() {
  return useQuery({
    queryKey: ['featuredCars'],
    queryFn: getFeaturedCars,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}