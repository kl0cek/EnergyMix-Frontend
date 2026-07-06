import { Card } from './Card';
import { Skeleton } from './Skeleton';
import { DonutSkeleton } from './DonutSkeleton';

export function LoadingGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-10" />
          </div>
          <DonutSkeleton />
          <div className="flex justify-center gap-5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </Card>
      ))}
    </div>
  );
}
