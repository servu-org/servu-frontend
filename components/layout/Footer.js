// components/layout/Footer.js
// Placeholder for the application Footer component
// Will contain copyright information, links to terms, privacy policy, etc.

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-10">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} ServU. All rights reserved.</p>
        {/* Links to About Us, Contact, FAQ, Terms, Privacy can be added here */}
      </div>
    </footer>
  );
}
