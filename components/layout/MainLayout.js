// components/layout/MainLayout.js
// Placeholder for the main application layout component
// This will wrap around pages and include Header, Footer, and potentially sidebars.

import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
