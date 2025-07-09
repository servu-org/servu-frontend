// pages/auth/login.js
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import LoginForm from '../../components/auth/LoginForm';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROLES } from '../../lib/constants';

export default function LoginPage() {
  const { currentUser, userRole, loading } = useAuth(); // Get userRole from context
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      // Determine redirect path based on userRole
      const redirectPath = userRole === ROLES.VENDOR ? '/dashboard/vendor' : '/dashboard/user';
      router.push(redirectPath);
    }
  }, [currentUser, userRole, loading, router]);

  // If loading or already logged in, show a message or nothing
  if (loading || (!loading && currentUser)) {
    return (
      <MainLayout>
        <Head><title>Loading... - ServU</title></Head>
        <div className="text-center py-10">
          <p>Loading or redirecting...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>Login - ServU</title>
      </Head>
      <div className="max-w-md mx-auto mt-10">
        <Card className="p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Login to ServU</h1>
          <LoginForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
            <p className="mt-2 text-sm">
              <Link href="/auth/forgot-password" // Placeholder for forgot password page
                    className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
