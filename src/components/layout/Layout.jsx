import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from '../common/BackToTop';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080a12] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
