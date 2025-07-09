// utils/validators.js
// Placeholder for input validation utility functions.

/**
 * Validates if a password meets certain criteria.
 * @param {string} password - The password to validate.
 * @returns {object} - An object with isValid (boolean) and a message (string).
 */
export function validatePassword(password) {
  if (!password) {
    return { isValid: false, message: "Password cannot be empty." };
  }
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long." };
  }
  // Add more criteria (e.g., uppercase, lowercase, numbers, special characters)
  // if (!/[A-Z]/.test(password)) {
  //   return { isValid: false, message: "Password must contain an uppercase letter." };
  // }
  // if (!/[a-z]/.test(password)) {
  //   return { isValid: false, message: "Password must contain a lowercase letter." };
  // }
  // if (!/[0-9]/.test(password)) {
  //   return { isValid: false, message: "Password must contain a number." };
  // }
  return { isValid: true, message: "Password is valid." };
}

/**
 * Validates if a phone number is in a basic format.
 * (This is a very basic example, consider using a library for comprehensive validation)
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - True if the phone number format is considered valid.
 */
export function isValidPhoneNumber(phoneNumber) {
  if (!phoneNumber) return false;
  // Basic regex for a common phone number format (e.g., 10 digits)
  const phoneRegex = /^\d{10}$/; // Adjust regex as per requirements
  return phoneRegex.test(phoneNumber);
}

// Add other validators as needed (e.g., for names, addresses, etc.)
