// components/wallet/BalanceDisplay.js
// Placeholder for displaying user's wallet balance.

export default function BalanceDisplay({ balance }) {
  return (
    <div>
      <p>Wallet Balance: ${balance !== undefined ? balance.toFixed(2) : '0.00'}</p>
      {/* Styling and currency formatting will be added */}
    </div>
  );
}
