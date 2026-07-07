import { Header } from '@/components/layout';
import { MixSection } from '@/components/mix';
import { ChargingSection } from '@/components/charging';

export function MainPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
      <Header />
      <MixSection />
      <ChargingSection />
    </div>
  );
}
