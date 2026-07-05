const carImages = {
  toyota: [
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=85&fit=crop',
  ],
  bmw: [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=900&q=85&fit=crop',
  ],
  'mercedes-benz': [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1549925245-b2ca5bc6e2f7?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=85&fit=crop',
  ],
  mercedes: [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1549925245-b2ca5bc6e2f7?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=85&fit=crop',
  ],
  audi: [
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1597007030739-6d2d29a1a379?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=900&q=85&fit=crop',
  ],
  ford: [
    'https://images.unsplash.com/photo-1551830820-330a71b99659?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1532974297617-c0f05fe48872?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=900&q=85&fit=crop',
  ],
  honda: [
    'https://images.unsplash.com/photo-1590510696098-55a75a1d5f0e?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1561830465-35c8c0a9d9a8?w=900&q=85&fit=crop',
  ],
  chevrolet: [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1609152484435-95688ea2d6d9?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1532974297617-c0f05fe48872?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=900&q=85&fit=crop',
  ],
  porsche: [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1608891772729-6f0e8448d8b6?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=900&q=85&fit=crop',
  ],
  tesla: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1581360742512-021d5b2157d8?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1562832135-14a35d25edef?w=900&q=85&fit=crop',
  ],
  nissan: [
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1612543958899-b9cfe87f49a3?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=900&q=85&fit=crop',
  ],
  hyundai: [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1612543958899-b9cfe87f49a3?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1586854116014-b9e0f19df39b?w=900&q=85&fit=crop',
  ],
  kia: [
    'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1549925245-b2ca5bc6e2f7?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1561499143-8b0e13c2a19c?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1609152484435-95688ea2d6d9?w=900&q=85&fit=crop',
  ],
  volkswagen: [
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=85&fit=crop',
  ],
  lexus: [
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=900&q=85&fit=crop',
  ],
  default: [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&q=85&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&fit=crop',
  ],
};

export function getCarImages(make) {
  const key = (make || '').toLowerCase().trim();
  return carImages[key] || carImages.default;
}

export function getCarImage(make, index = 0) {
  const images = getCarImages(make);
  return images[index % images.length];
}

export function generatePrice(car) {
  if (!car) return 25000;
  let basePrice = 22000;
  const currentYear = new Date().getFullYear();
  const yearDiff = currentYear - (car.year || 2020);
  basePrice += Math.max(0, (10 - yearDiff)) * 2500;
  const cylinders = car.cylinders || 4;
  basePrice += (cylinders - 4) * 4000;
  const hp = car.combination_mpg ? (100 - car.combination_mpg) * 250 : 0;
  basePrice += Math.max(0, hp);
  const premiumBrands = { bmw: 1.5, 'mercedes-benz': 1.6, mercedes: 1.6, audi: 1.4, porsche: 2.5, tesla: 1.4, lexus: 1.35, volkswagen: 1.1 };
  const makeKey = (car.make || '').toLowerCase();
  const brandMultiplier = premiumBrands[makeKey] || 1;
  basePrice *= brandMultiplier;
  if (car.drive === 'awd' || car.drive === '4wd') basePrice *= 1.1;
  const hash = `${car.make}${car.model}${car.year}`.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  basePrice += (hash % 6000) - 3000;
  return Math.round(basePrice / 500) * 500;
}

export function generateCarId(car) {
  const str = `${car.make}-${car.model}-${car.year}-${car.fuel_type}-${car.transmission}-${car.cylinders || 0}`;
  return str.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
}

export function normalizeCar(apiCar, index = 0) {
  const id = generateCarId(apiCar);
  const price = generatePrice(apiCar);
  const images = getCarImages(apiCar.make);
  const imageIndex = index % images.length;
  const primaryImage = images[imageIndex];

  return {
    id,
    make: apiCar.make || 'Unknown',
    model: apiCar.model || 'Unknown',
    year: apiCar.year || new Date().getFullYear(),
    fuel_type: apiCar.fuel_type || 'gas',
    drive: apiCar.drive || 'fwd',
    transmission: apiCar.transmission || 'a',
    cylinders: apiCar.cylinders || 4,
    displacement: apiCar.displacement || 2.0,
    class: apiCar.class || 'sedan',
    city_mpg: apiCar.city_mpg || 0,
    highway_mpg: apiCar.highway_mpg || 0,
    combination_mpg: apiCar.combination_mpg || 0,
    price,
    image: primaryImage,
    images: images.slice(0, 4),
  };
}

export function getTransmissionLabel(code) {
  const map = { a: 'Automatic', m: 'Manual', am: 'Automated Manual', cvt: 'CVT' };
  return map[(code || '').toLowerCase()] || code || 'Unknown';
}

export function getFuelTypeLabel(type) {
  const map = { gas: 'Gasoline', diesel: 'Diesel', electricity: 'Electric', hybrid: 'Hybrid' };
  return map[(type || '').toLowerCase()] || type || 'Unknown';
}

export function getDriveLabel(drive) {
  const map = { fwd: 'FWD', rwd: 'RWD', awd: 'AWD', '4wd': '4WD' };
  return map[(drive || '').toLowerCase()] || drive || 'Unknown';
}

export const FUEL_TYPES = ['gas', 'diesel', 'electricity'];
export const TRANSMISSIONS = ['a', 'm'];
export const YEAR_RANGE = { min: 1990, max: new Date().getFullYear() + 1 };
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'name_az', label: 'Name: A–Z' },
  { value: 'name_za', label: 'Name: Z–A' },
];

export const POPULAR_MAKES = [
  'Toyota', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford',
  'Honda', 'Chevrolet', 'Porsche', 'Tesla', 'Nissan',
  'Hyundai', 'Kia', 'Volkswagen', 'Lexus', 'Mazda',
  'Subaru', 'Jeep', 'Dodge', 'Ram', 'GMC',
];
