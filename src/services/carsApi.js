import apiClient from './apiClient';
import { normalizeCar, POPULAR_MAKES } from '../utils/generateCarData';

const ITEMS_PER_PAGE = 12;

function generateMockCars(filters = {}) {
  const makes = filters.make ? [filters.make] : POPULAR_MAKES.slice(0, 8);

  const models = {
    Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Prius'],
    BMW: ['3 Series', '5 Series', 'X5', 'X3', 'M3', '7 Series'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE', 'S-Class', 'A-Class', 'GLC'],
    Audi: ['A4', 'A6', 'Q5', 'Q7', 'A3', 'e-tron'],
    Ford: ['F-150', 'Mustang', 'Explorer', 'Bronco', 'Edge', 'Fusion'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Odyssey'],
    Chevrolet: ['Silverado', 'Equinox', 'Tahoe', 'Malibu', 'Blazer', 'Camaro'],
    Porsche: ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan', 'Boxster'],
    Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
    Nissan: ['Altima', 'Rogue', 'Sentra', 'Pathfinder', 'Frontier', 'Murano'],
  };

  const fuelTypes = filters.fuel_type
    ? [filters.fuel_type]
    : ['gas', 'gas', 'diesel', 'electricity', 'hybrid'];
  const transmissions = filters.transmission ? [filters.transmission] : ['a', 'a', 'm'];
  const currentYear = new Date().getFullYear();
  const years = filters.year
    ? [parseInt(filters.year)]
    : [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, 2020, 2019, 2018];

  const cars = [];
  let idx = 0;

  for (const make of makes) {
    const modelList = models[make] || ['Sedan', 'SUV', 'Coupe'];
    for (const model of modelList) {
      const year = years[idx % years.length];
      const fuel_type = fuelTypes[idx % fuelTypes.length];
      const transmission = transmissions[idx % transmissions.length];
      const cylinders = fuel_type === 'electricity' ? 0 : [4, 4, 6, 8][idx % 4];
      const combination_mpg = fuel_type === 'electricity' ? 0 : [28, 32, 35, 22, 40][idx % 5];

      cars.push(normalizeCar(
        { make, model, year, fuel_type, transmission, cylinders, combination_mpg, drive: 'fwd', class: 'Midsize' },
        idx
      ));
      idx++;
    }
  }

  return cars;
}

const _rawKey = import.meta.env.VITE_API_KEY;
const _keyIsValid =
  typeof _rawKey === 'string' &&
  _rawKey.trim().length > 0 &&
  _rawKey !== 'your_api_ninjas_key_here';

let _apiWorking = _keyIsValid ? null : false;
let _validationPromise = null;

async function checkApiAndFetch(requestFn, fallbackFn) {
  if (_apiWorking === false) return fallbackFn();
  if (_apiWorking === true) return requestFn();

  if (!_validationPromise) {
    _validationPromise = requestFn()
      .then((result) => {
        _apiWorking = true;
        return result;
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 400 || status === 401 || status === 403) {
          _apiWorking = false;
          return null;
        }
        throw err;
      });
  }

  const result = await _validationPromise;
  if (result === null) return fallbackFn();
  return result;
}

export async function getCars(params = {}) {
  const {
    make, model, year, fuel_type, transmission,
    drive, min_comb_mpg, max_comb_mpg,
    limit = ITEMS_PER_PAGE * 3,
  } = params;

  return checkApiAndFetch(
    async () => {
      const queryParams = {};
      if (make) queryParams.make = make;
      if (model) queryParams.model = model;
      if (year) queryParams.year = year;
      if (fuel_type) queryParams.fuel_type = fuel_type;
      if (transmission) queryParams.transmission = transmission;
      if (drive) queryParams.drive = drive;
      if (min_comb_mpg) queryParams.min_comb_mpg = min_comb_mpg;
      if (max_comb_mpg) queryParams.max_comb_mpg = max_comb_mpg;
      queryParams.limit = Math.min(limit, 50);

      const response = await apiClient.get('/cars', { params: queryParams });
      return response.data.map((car, index) => normalizeCar(car, index));
    },
    () => generateMockCars({ make, year, fuel_type, transmission }).slice(0, limit),
  );
}

export async function searchCars(query, limit = ITEMS_PER_PAGE * 3) {
  if (!query || query.trim().length === 0) return [];

  return checkApiAndFetch(
    async () => {
      try {
        const res = await apiClient.get('/cars', {
          params: { make: query.trim(), limit: Math.min(limit, 50) },
        });
        if (res.data?.length > 0) return res.data.map((car, i) => normalizeCar(car, i));
      } catch {}

      const res = await apiClient.get('/cars', {
        params: { model: query.trim(), limit: Math.min(limit, 50) },
      });
      return res.data.map((car, i) => normalizeCar(car, i));
    },
    () => {
      const q = query.trim().toLowerCase();
      return generateMockCars()
        .filter(c => c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q))
        .slice(0, limit);
    },
  );
}

export async function getCarById(id) {
  if (!id) throw new Error('Car ID is required');

  const parts = id.split('-');
  const yearIndex = parts.findIndex(p => /^(19|20)\d{2}$/.test(p));
  if (yearIndex < 1) throw new Error('Could not parse year from car ID');

  let makeParts = 1;
  for (let i = Math.min(2, yearIndex - 1); i >= 1; i--) {
    const candidate = parts.slice(0, i + 1).join(' ');
    if (POPULAR_MAKES.some(m => m.toLowerCase().replace(/-/g, ' ') === candidate)) {
      makeParts = i + 1;
      break;
    }
  }

  const make = parts.slice(0, makeParts).join(' ');
  const model = parts.slice(makeParts, yearIndex).join(' ');
  const year = parseInt(parts[yearIndex]);

  return checkApiAndFetch(
    async () => {
      const response = await apiClient.get('/cars', {
        params: { make, model: model || undefined, year, limit: 5 },
      });
      if (!response.data || response.data.length === 0) throw new Error('Car not found');
      const normalized = response.data.map((car, i) => normalizeCar(car, i));
      return normalized.find(car => car.id === id) || normalized[0];
    },
    () => {
      const all = generateMockCars({ make });
      const found = all.find(c => c.id === id) || all[0];
      if (!found) throw new Error('Car not found');
      return found;
    },
  );
}

export async function getRelatedCars(make, excludeId, limit = 6) {
  return checkApiAndFetch(
    async () => {
      const response = await apiClient.get('/cars', {
        params: { make, limit: Math.min(limit + 5, 50) },
      });
      return response.data
        .map((car, i) => normalizeCar(car, i))
        .filter(car => car.id !== excludeId)
        .slice(0, limit);
    },
    () => generateMockCars({ make }).filter(c => c.id !== excludeId).slice(0, limit),
  );
}

export async function getFeaturedCars() {
  const currentYear = new Date().getFullYear();
  const makes = ['toyota', 'bmw', 'mercedes-benz', 'audi', 'porsche', 'tesla'];

  return checkApiAndFetch(
    async () => {
      const results = await Promise.all(
        makes.map(make =>
          apiClient.get('/cars', { params: { make, year: currentYear, limit: 2 } })
            .then(res => res.data)
            .catch(() => [])
        )
      );
      return results.flat().map((car, i) => normalizeCar(car, i));
    },
    () => generateMockCars().slice(0, 6),
  );
}

export async function getBrowseCars(limit = 36) {
  const makes = ['toyota', 'bmw', 'mercedes-benz', 'audi', 'ford', 'honda', 'chevrolet', 'porsche', 'tesla', 'nissan'];

  return checkApiAndFetch(
    async () => {
      const perMake = Math.max(2, Math.ceil(limit / makes.length));
      const results = await Promise.all(
        makes.map(make =>
          apiClient.get('/cars', { params: { make, limit: Math.min(perMake, 50) } })
            .then(res => res.data)
            .catch(() => [])
        )
      );
      return results.flat().map((car, i) => normalizeCar(car, i)).slice(0, limit);
    },
    () => generateMockCars().slice(0, limit),
  );
}

export function sortCars(cars, sortBy) {
  if (!cars || cars.length === 0) return [];
  const sorted = [...cars];
  switch (sortBy) {
    case 'newest':     return sorted.sort((a, b) => b.year - a.year);
    case 'oldest':     return sorted.sort((a, b) => a.year - b.year);
    case 'price_low':  return sorted.sort((a, b) => a.price - b.price);
    case 'price_high': return sorted.sort((a, b) => b.price - a.price);
    case 'name_az':    return sorted.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
    case 'name_za':    return sorted.sort((a, b) => `${b.make} ${b.model}`.localeCompare(`${a.make} ${a.model}`));
    default:           return sorted;
  }
}

export function paginateCars(cars, page = 1, perPage = ITEMS_PER_PAGE) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    data: cars.slice(start, end),
    totalPages: Math.ceil(cars.length / perPage),
    currentPage: page,
    totalItems: cars.length,
    hasNext: end < cars.length,
    hasPrev: page > 1,
  };
}
