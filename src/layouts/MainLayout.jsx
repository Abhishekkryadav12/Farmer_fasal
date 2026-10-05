import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Smart Bharat. "Aapki Fasal, Aapka Faisla."
      </footer>
    </div>
  );
}
