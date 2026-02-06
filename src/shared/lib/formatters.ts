// Cache for Intl.NumberFormat instances to avoid recreating them on every render
const numberFormatCache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (locale: string, options: Intl.NumberFormatOptions) => {
  // Create a unique key for the cache based on locale and options
  const key = `${locale}-${JSON.stringify(options)}`;
  
  if (!numberFormatCache.has(key)) {
    numberFormatCache.set(key, new Intl.NumberFormat(locale, options));
  }
  
  return numberFormatCache.get(key)!;
};

export const formatCurrency = (amount: number, currency: string, locale: string = 'en-US') => {
  // Only handle USD for now as per project requirements, but keep currency param for future
  const localeString = locale.startsWith('es') ? 'es-ES' : 'en-US';
  
  return getNumberFormat(localeString, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatInteger = (amount: number, locale: string = 'en-US') => {
  const localeString = locale.startsWith('es') ? 'es-ES' : 'en-US';
  
  return getNumberFormat(localeString, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
