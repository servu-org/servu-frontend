// components/common/Button.js
// Placeholder for a reusable Button component
// This component will be used throughout the application for consistent styling.

export default function Button({ children, onClick, type = 'button', variant = 'primary' }) {
  // Basic styling - will be enhanced with Tailwind variants
  const baseStyle = "px-4 py-2 rounded font-semibold";
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    // Add more variants as needed
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${styles[variant] || styles.primary}`}
    >
      {children}
    </button>
  );
}
