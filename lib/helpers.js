// lib/helpers.js
// Placeholder for common helper functions.

/**
 * Formats a date object or timestamp into a readable string.
 * @param {Date|number} date - The date to format.
 * @param {object} options - Formatting options for toLocaleDateString.
 * @returns {string} - Formatted date string.
 */
export function formatDate(date, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, options);
}

/**
 * Simple email validation.
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if email is valid, false otherwise.
 */
export function isValidEmail(email) {
  if (!email) return false;
  // Basic regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add other helper functions as needed:
// - Price formatting
// - String manipulation
// - etc.
