// components/common/Card.js
// Placeholder for a reusable Card component
// This component will be used to display information in a card format.

export default function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}
