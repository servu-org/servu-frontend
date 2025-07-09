// pages/auth/signup.js
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import SignupForm from '../../components/auth/SignupForm';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ROLES } from '../../lib/constants';

export default function SignupPage() {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      // SignupForm already redirects, but this is a fallback.
      // User role might be available immediately after signup if AuthContext updates quickly,
      // or it might take a moment for the profile to be fully set.
      // The SignupForm's redirect is more reliable for the initial role.
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
        <title>Sign Up - ServU</title>
      </Head>
      <div className="max-w-md mx-auto mt-10">
        <Card className="p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create your ServU Account</h1>
          <SignupForm />
          {/* Google Signup can be a separate button or integrated into SignupForm if complex role selection is needed post-Google auth */}
          {/* For now, loginWithGoogle in AuthContext handles basic profile creation for new Google users */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
