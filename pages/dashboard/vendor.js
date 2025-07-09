// pages/dashboard/vendor.js
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import VendorMenu from '../../components/dashboard/VendorMenu';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import { ROLES } from '../../lib/constants';
import Button from '../../components/common/Button';

export default function VendorDashboardPage() {
  const { currentUser, loading } = useAuthRedirect('/auth/login', { requiredRole: ROLES.VENDOR });

  // Placeholder data - replace with actual data fetching
  const newJobRequests = [
    { id: 1, service: 'Emergency Plumbing', user: 'John Doe', time: 'ASAP', date: '2023-10-27' },
  ];
  const activeJobs = [
    { id: 2, service: 'House Wiring', user: 'Jane Smith', status: 'In Progress', date: '2023-10-29' },
  ];

  if (loading || !currentUser) {
    return (
      <MainLayout>
        <Head><title>Loading Dashboard... - ServU</title></Head>
        <div className="text-center py-10"><p>Loading vendor dashboard...</p></div>
      </MainLayout>
    );
  }

  const vendorName = currentUser.displayName || "Service Provider";

  return (
    <MainLayout>
      <Head>
        <title>Vendor Dashboard - ServU</title>
      </Head>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <VendorMenu />
           <Card className="mt-6 p-4">
            <h3 className="text-lg font-semibold mb-2">Business Summary</h3>
            <p className="text-sm"><strong>Name:</strong> {vendorName}</p>
            <p className="text-sm"><strong>Email:</strong> {currentUser.email}</p>
            <p className="text-sm"><strong>Role:</strong> {currentUser.role || 'Vendor'}</p>
            {/* Add link to business profile settings, services offered etc. */}
          </Card>
        </aside>
        <main className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">Welcome, {vendorName}!</h1>

          <Card className="mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">New Job Requests</h2>
            {newJobRequests.length > 0 ? (
              newJobRequests.map(job => (
                <div key={job.id} className="border-b last:border-b-0 py-3 flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <p className="font-semibold">{job.service}</p>
                    <p className="text-sm text-gray-600">User: {job.user} | Requested: {job.time} ({new Date(job.date).toLocaleDateString()})</p>
                  </div>
                  <div className="mt-2 sm:mt-0 space-x-2">
                    <Button variant="primary" className="text-xs px-2 py-1">Accept</Button>
                    <Button variant="secondary" className="text-xs px-2 py-1 bg-red-500 hover:bg-red-700">Reject</Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No new job requests.</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Active Jobs</h2>
            {activeJobs.length > 0 ? (
              activeJobs.map(job => (
                <div key={job.id} className="border-b last:border-b-0 py-3">
                  <p><strong>{job.service}</strong> for {job.user} - Status: <span className="font-medium">{job.status}</span></p>
                  <p className="text-sm text-gray-600">Scheduled: {new Date(job.date).toLocaleDateString()}</p>
                  {/* Add actions like 'Mark as Complete', 'Contact User' */}
                </div>
              ))
            ) : (
              <p>No active jobs.</p>
            )}
          </Card>

          {/* Other sections: Set Availability, Manage Payouts, View Ratings */}
        </main>
      </div>
    </MainLayout>
  );
}
