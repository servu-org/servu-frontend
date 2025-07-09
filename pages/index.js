import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';
import Link from 'next/link';
import Button from '../components/common/Button';

// Landing Page for ServU

export default function LandingPage() {
  return (
    <MainLayout>
      <Head>
        <title>ServU - Your Local Service Connection</title>
        <meta name="description" content="Easily find and book local service providers like electricians, plumbers, and more." />
      </Head>

      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6">Welcome to ServU</h1>
        <p className="text-xl mb-8 text-gray-700">
          Connect with skilled local professionals for all your service needs.
        </p>
        <div className="space-x-4">
          <Link href="/auth/signup" passHref>
            <Button variant="primary" className="text-lg px-8 py-3">Get Started</Button>
          </Link>
          <Link href="#features" passHref>
            <Button variant="secondary" className="text-lg px-8 py-3">Learn More</Button>
          </Link>
        </div>
      </section>

      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Location-Based Matching</h3>
              <p className="text-gray-600">Find providers near you instantly.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Easy Booking & Scheduling</h3>
              <p className="text-gray-600">Book services at your convenience.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Secure In-App Payments</h3>
              <p className="text-gray-600">Pay securely within the app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action sections can be added here */}

    </MainLayout>
  );
}
