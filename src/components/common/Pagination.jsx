import { useTranslation } from 'react-i18next';

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }) {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    if (start > 1) { pages.push(1); if (start > 2) pages.push('...'); }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) { if (end < totalPages - 1) pages.push('...'); pages.push(totalPages); }
    return pages;
  };

  return (
    <div className={`flex items-center justify-center gap-2 mt-10 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-[#151929] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1e2337] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer border border-gray-200 dark:border-[#1e2337]">
        {t('common.previous')}
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                page === currentPage
                  ? 'bg-[#e63946] text-white shadow-md shadow-[#e63946]/30'
                  : 'bg-gray-100 dark:bg-[#151929] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1e2337] border border-gray-200 dark:border-[#1e2337]'
              }`}>
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-[#151929] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1e2337] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer border border-gray-200 dark:border-[#1e2337]">
        {t('common.next')}
      </button>
    </div>
  );
}
