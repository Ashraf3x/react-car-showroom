import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | Car Showroom` : 'Car Showroom';
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
