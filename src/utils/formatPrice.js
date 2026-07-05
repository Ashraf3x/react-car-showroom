export function formatPrice(price, locale = 'en-US', currency = 'USD') {
  if (price == null || isNaN(price)) return '—';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num, locale = 'en-US') {
  if (num == null || isNaN(num)) return '—';
  return new Intl.NumberFormat(locale).format(num);
}
