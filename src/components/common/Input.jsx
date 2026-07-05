import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={inputId}
        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400'
            : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 focus:ring-[#e63946]/30 focus:border-[#e63946]'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
