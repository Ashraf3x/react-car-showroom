export function Skeleton({ className = '', variant = 'rect' }) {
  const variants = {
    rect:   'rounded-xl',
    circle: 'rounded-full',
    text:   'rounded-md h-4',
  };
  return <div className={`skeleton ${variants[variant]} ${className}`} />;
}

export function CarCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0e1120] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#1e2337] shadow-sm">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-1/4" variant="text" />
        <Skeleton className="h-6 w-3/4" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-[#1e2337]">
          <Skeleton className="h-7 w-24" variant="text" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function CarGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CarDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <Skeleton className="h-5 w-48" variant="text" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-80 lg:h-96 rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" variant="text" />
          <Skeleton className="h-6 w-1/2" variant="text" />
          <Skeleton className="h-16 w-full rounded-2xl" />
          <div className="space-y-3 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" variant="text" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
