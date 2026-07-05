import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

export default function Register() {
  const { t } = useTranslation();
  useDocumentTitle(t('nav.register'));

  return (
    <div className="min-h-[100vh] flex relative overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 hero-bg relative flex-col items-center justify-center p-16 overflow-hidden order-last">
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#e63946] rounded-full blur-[120px] opacity-20 animate-float" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f4a20a] rounded-full blur-[100px] opacity-15" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#e63946] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#e63946]/40">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">Join Car Showroom</h2>
          <p className="text-white/55 text-lg leading-relaxed max-w-xs">
            Create your free account and start saving your dream cars today.
          </p>

          <div className="mt-12 space-y-4">
            {[
              { icon: '❤️', text: 'Save unlimited favorite cars' },
              { icon: '🔍', text: 'Advanced search & filters' },
              { icon: '🚗', text: 'Access 50K+ car listings' },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3 text-left">
                <span className="text-xl">{f.icon}</span>
                <span className="text-white/60 text-sm">{f.text}</span>
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
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
