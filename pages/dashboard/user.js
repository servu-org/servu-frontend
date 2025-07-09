// pages/dashboard/user.js
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import UserMenu from '../../components/dashboard/UserMenu';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import { ROLES } from '../../lib/constants';

export default function UserDashboardPage() {
  const { currentUser, loading } = useAuthRedirect('/auth/login', { requiredRole: ROLES.USER });

  // Placeholder data - replace with actual data fetching based on currentUser.uid
  const upcomingBookings = [
    { id: 1, service: 'Plumbing Check', date: '2023-10-28', status: 'Confirmed' },
    { id: 2, service: 'Haircut', date: '2023-11-05', status: 'Pending' },
  ];
  const pastBookings = [
    { id: 3, service: 'Electrical Repair', date: '2023-09-15', status: 'Completed', review: false },
  ];

  if (loading || !currentUser) {
    // useAuthRedirect handles redirection, this is a fallback or loading display
    return (
      <MainLayout>
        <Head><title>Loading Dashboard... - ServU</title></Head>
        <div className="text-center py-10"><p>Loading user dashboard...</p></div>
      </MainLayout>
    );
  }

  // Ensure currentUser has displayName, provide a fallback if not.
  const userName = currentUser.displayName || "User";

  return (
    <MainLayout>
      <Head>
        <title>User Dashboard - ServU</title>
      </Head>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <UserMenu />
          <Card className="mt-6 p-4">
            <h3 className="text-lg font-semibold mb-2">Profile Summary</h3>
            <p className="text-sm"><strong>Name:</strong> {userName}</p>
            <p className="text-sm"><strong>Email:</strong> {currentUser.email}</p>
            <p className="text-sm"><strong>Role:</strong> {currentUser.role || 'User'}</p>
            {/* Add a link to full profile settings page */}
          </Card>
        </aside>
        <main className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">Welcome, {userName}!</h1>

          <Card className="mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <div key={booking.id} className="border-b last:border-b-0 py-3">
                  <p><strong>{booking.service}</strong> - {new Date(booking.date).toLocaleDateString()} ({booking.status})</p>
                  {/* Add actions like 'Cancel' or 'Reschedule' */}
                </div>
              ))
            ) : (
              <p>No upcoming bookings.</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Past Bookings</h2>
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <div key={booking.id} className="border-b last:border-b-0 py-3 flex justify-between items-center">
                  <div>
                    <p><strong>{booking.service}</strong> - {new Date(booking.date).toLocaleDateString()} ({booking.status})</p>
                  </div>
                  {!booking.review && booking.status === 'Completed' && (
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Leave Review</button>
                  )}
                </div>
              ))
            ) : (
              <p>No past bookings.</p>
            )}
          </Card>

          {/* Other sections: Manage Wallet Link, Profile Settings Link */}
        </main>
      </div>
    </MainLayout>
  );
}
