export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary:   'bg-[#e63946] text-white hover:bg-[#c1121f] focus:ring-[#e63946]/50 shadow-lg shadow-[#e63946]/25 hover:shadow-[#e63946]/40 hover:scale-[1.03]',
    secondary: 'bg-gray-100 dark:bg-white/[0.07] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/[0.12] focus:ring-gray-300 border border-gray-200 dark:border-white/10',
    ghost:     'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.07] focus:ring-gray-300',
    danger:    'bg-[#e63946] text-white hover:bg-[#c1121f] focus:ring-[#e63946]/50 shadow-lg shadow-[#e63946]/20 hover:scale-[1.03]',
    outline:   'border-2 border-[#e63946] text-[#e63946] hover:bg-[#e63946] hover:text-white focus:ring-[#e63946]/50 hover:scale-[1.03]',
    gold:      'bg-[#f4a20a] text-white hover:bg-[#d08900] focus:ring-[#f4a20a]/50 shadow-lg shadow-[#f4a20a]/20 hover:scale-[1.03]',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-sm px-7 py-3.5 gap-2.5',
    xl: 'text-base px-9 py-4 gap-3',
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      )}
      {children}
    </button>
  );
}
