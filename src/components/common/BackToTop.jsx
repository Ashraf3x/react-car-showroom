import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 w-12 h-12 rounded-full bg-[#e63946] text-white shadow-xl shadow-[#e63946]/30 hover:bg-[#c1121f] hover:shadow-[#e63946]/50 hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce-in cursor-pointer"
      aria-label="Back to top">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
