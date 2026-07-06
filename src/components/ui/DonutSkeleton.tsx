export function DonutSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-60"
    >
      <div className="h-full w-full animate-pulse rounded-full bg-line" />
      <div className="absolute inset-[22%] rounded-full bg-card" />
    </div>
  );
}
