// components/layout/Header.js
// Application Header: Logo, navigation links, user profile/login/logout button.

import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Button from '../common/Button'; // Assuming you have a Button component
import { ROLES } from '../../lib/constants';

export default function Header() {
  const { currentUser, userRole, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error message to the user
    }
  };

  const getDashboardPath = () => {
    if (!userRole) return '/'; // Default or loading state
    return userRole === ROLES.VENDOR ? '/dashboard/vendor' : '/dashboard/user';
  };

  return (
    <header className="bg-white text-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-indigo-600">
          ServU
        </Link>
        <nav className="space-x-4 flex items-center">
          {!loading && currentUser ? (
            <>
              <Link href={getDashboardPath()} className="hover:text-indigo-600">Dashboard</Link>
              <Link href="/wallet" className="hover:text-indigo-600">Wallet</Link>
              <Link href="/notifications" className="hover:text-indigo-600">Notifications</Link>
              <span className="text-sm text-gray-600">Hi, {currentUser.displayName || 'User'}!</span>
              <Button onClick={handleLogout} variant="secondary" className="py-2 px-3 text-sm">
                Logout
              </Button>
            </>
          ) : !loading && !currentUser ? (
            <>
              <Link href="/auth/login" className="hover:text-indigo-600">Login</Link>
              <Link href="/auth/signup" passHref>
                <Button variant="primary" className="py-2 px-3 text-sm">Sign Up</Button>
              </Link>
            </>
          ) : (
            <p className="text-sm text-gray-500">Loading...</p> // Show loading state
          )}
        </nav>
      </div>
    </header>
  );
}
