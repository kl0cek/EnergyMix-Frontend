import { Spinner, Card } from '../ui/index';

export function LoadingGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="flex h-72 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </Card>
      ))}
    </div>
  );
}
