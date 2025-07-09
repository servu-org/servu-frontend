// hooks/useAuthRedirect.js
// Custom hook to handle authentication redirects for protected routes.
// Redirects to a specified path if the user is not authenticated.

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

/**
 * A custom hook that checks user authentication status and redirects
 * if the user is not authenticated.
 * @param {string} redirectTo - The path to redirect to if the user is not authenticated. Defaults to '/auth/login'.
 * @param {object} options - Options for the hook.
 * @param {string} options.requiredRole - If specified, the user must have this role to access the route.
 */
export default function useAuthRedirect(redirectTo = '/auth/login', options = {}) {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();
  const { requiredRole } = options;

  useEffect(() => {
    if (loading) {
      return; // Don't do anything while loading auth state
    }

    if (!currentUser) {
      // User is not authenticated, redirect to login.
      router.push(redirectTo);
      return;
    }

    if (requiredRole && userRole !== requiredRole) {
      // User is authenticated but does not have the required role.
      // Redirect to a general access denied page or user's dashboard.
      // For simplicity, redirecting to user's default dashboard or home.
      console.warn(`User does not have required role: ${requiredRole}. Current role: ${userRole}`);
      const fallbackPath = userRole === 'vendor' ? '/dashboard/vendor' : '/dashboard/user';
      router.push(fallbackPath);
    }

  }, [currentUser, userRole, loading, router, redirectTo, requiredRole]);

  return { currentUser, userRole, loading }; // Return auth state for potential use in the component
}
