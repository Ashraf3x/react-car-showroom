import { useQuery } from '@tanstack/react-query';
import { getCarById, getRelatedCars } from '../services/carsApi';

export function useCarDetails(id) {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useRelatedCars(make, excludeId) {
  return useQuery({
    queryKey: ['relatedCars', make, excludeId],
    queryFn: () => getRelatedCars(make, excludeId),
    enabled: !!make,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
