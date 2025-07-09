// utils/formatters.js
// Placeholder for data formatting utility functions.

/**
 * Formats a number as currency.
 * @param {number} amount - The amount to format.
 * @param {string} currencyCode - Currency code (e.g., 'USD').
 * @param {string} locale - Locale for formatting (e.g., 'en-US').
 * @returns {string} - Formatted currency string.
 */
export function formatCurrency(amount, currencyCode = 'USD', locale = 'en-US') {
  if (typeof amount !== 'number') {
    return '';
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Shortens a string to a specified length and adds ellipsis.
 * @param {string} text - The string to shorten.
 * @param {number} maxLength - The maximum length before truncating.
 * @returns {string} - Shortened string with ellipsis or original string.
 */
export function truncateText(text, maxLength = 100) {
  if (typeof text !== 'string' || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

// Add other specific formatters as needed.
