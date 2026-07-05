import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';

export default function Login() {
  const { t } = useTranslation();
  useDocumentTitle(t('nav.login'));

  return (
    <div className="min-h-[100vh] flex relative overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 hero-bg relative flex-col items-center justify-center p-16 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#e63946] rounded-full blur-[120px] opacity-20 animate-float" />
        <div className="absolute bottom-10 right-0 w-64 h-64 bg-[#f4a20a] rounded-full blur-[100px] opacity-15" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#e63946] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#e63946]/40">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Car Showroom</h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xs">
            Discover and compare thousands of cars from top manufacturers worldwide.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
            {[
              { v: '50K+', l: 'Cars Listed' },
              { v: '30+', l: 'Top Brands' },
              { v: '10K+', l: 'Happy Users' },
            ].map(s => (
              <div key={s.l}>
                <p className="text-2xl font-black text-white">{s.v}</p>
                <p className="text-[11px] text-white/35 uppercase tracking-wider mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white dark:bg-[#080a12]">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#e63946] flex items-center justify-center shadow-lg shadow-[#e63946]/30">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                Car<span className="text-[#e63946]">Showroom</span>
              </span>
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
