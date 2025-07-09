// pages/notifications.js
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/common/Card';
// import { useAuth } from '../contexts/AuthContext';
// import useAuthRedirect from '../hooks/useAuthRedirect';

export default function NotificationsPage() {
  // const { currentUser } = useAuth();
  // useAuthRedirect(); // Protect route

  // Placeholder notifications data
  const notifications = [
    { id: 1, message: 'Your booking for "Plumbing Check" is confirmed.', date: '2023-10-25', read: false, link: '/dashboard/user' },
    { id: 2, message: 'A new vendor "ProElectrician" is available in your area.', date: '2023-10-24', read: true, link: '#' },
    { id: 3, message: 'Your wallet has been topped up with $50.', date: '2023-10-23', read: true, link: '/wallet' },
    { id: 4, message: 'Reminder: Service "Haircut" is scheduled for tomorrow.', date: '2023-10-20', read: false, link: '/dashboard/user' },
  ];

  // if (!currentUser) return <MainLayout><p>Loading...</p></MainLayout>;

  return (
    <MainLayout>
      <Head>
        <title>Notifications - ServU</title>
      </Head>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Notifications</h1>

        {notifications.length > 0 ? (
          <Card className="p-0"> {/* Remove padding from Card if list items have their own */}
            <ul>
              {notifications.map(notif => (
                <li
                  key={notif.id}
                  className={`border-b last:border-b-0 p-4 ${!notif.read ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50`}
                >
                  <a href={notif.link || '#'} className="block">
                    <p className={`mb-1 ${!notif.read ? 'font-semibold' : ''}`}>{notif.message}</p>
                    <p className="text-xs text-gray-500">{new Date(notif.date).toLocaleString()}</p>
                  </a>
                  {!notif.read && (
                    <button
                      className="text-xs text-blue-500 hover:underline mt-1"
                      // onClick={() => markAsRead(notif.id)} // Placeholder for mark as read function
                    >
                      Mark as read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <p>No new notifications.</p>
          </Card>
        )}

        {notifications.length > 0 && (
          <div className="text-center mt-6">
            <button
              className="text-blue-500 hover:underline"
              // onClick={markAllAsRead} // Placeholder
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
