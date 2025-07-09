// pages/wallet/index.js
import Head from 'next/head';
import MainLayout from '../../components/layout/MainLayout';
import BalanceDisplay from '../../components/wallet/BalanceDisplay';
import TopUpForm from '../../components/wallet/TopUpForm';
import WithdrawForm from '../../components/wallet/WithdrawForm'; // For vendors
import Card from '../../components/common/Card';
// import { useAuth } from '../../contexts/AuthContext';
// import useAuthRedirect from '../../hooks/useAuthRedirect';
// import { ROLES } from '../../lib/constants'; // To check user role

export default function WalletPage() {
  // const { currentUser, loading } = useAuth();
  // useAuthRedirect();

  // Placeholder data
  const currentBalance = 150.75; // Fetch from user data
  const userRole = 'user'; // Fetch from user data, e.g., currentUser.role === ROLES.VENDOR

  const transactionHistory = [
    { id: 1, type: 'Top-up', amount: 50.00, date: '2023-10-20', status: 'Completed' },
    { id: 2, type: 'Service Payment', amount: -25.00, date: '2023-10-22', status: 'Completed', details: 'Plumbing Fix' },
    { id: 3, type: 'Withdrawal', amount: -100.00, date: '2023-10-25', status: 'Pending' }, // Example for vendor
  ];

  // if (loading || !currentUser) {
  //   return <MainLayout><p>Loading wallet...</p></MainLayout>;
  // }

  return (
    <MainLayout>
      <Head>
        <title>My Wallet - ServU</title>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Wallet</h1>

        <Card className="mb-6 p-6">
          <h2 className="text-2xl font-semibold mb-4">Current Balance</h2>
          <BalanceDisplay balance={currentBalance} />
        </Card>

        {userRole === 'user' && (
          <Card className="mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">Top Up Wallet</h2>
            <TopUpForm />
          </Card>
        )}

        {userRole === 'vendor' && ( // ROLES.VENDOR
          <Card className="mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">Withdraw Funds</h2>
            <WithdrawForm />
          </Card>
        )}

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          {transactionHistory.length > 0 ? (
            <ul>
              {transactionHistory.map(tx => (
                <li key={tx.id} className="border-b py-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{tx.type} {tx.details ? `(${tx.details})` : ''}</p>
                    <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()} - {tx.status}</p>
                  </div>
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions yet.</p>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}
