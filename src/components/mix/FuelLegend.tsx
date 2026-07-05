import { Badge, Card } from '../ui';
import { FUELS } from '../../config/fuels';

export function FuelLegend() {
  return (
    <Card className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4">
      {FUELS.map((fuel) => (
        <span key={fuel.key} className="inline-flex items-center gap-2 text-sm">
          <span className="h-3 w-3 rounded-sm" style={{ background: fuel.color }} />
          <span className="text-ink">{fuel.label}</span>
          {fuel.clean && <Badge variant="clean">CZYSTA</Badge>}
        </span>
      ))}
    </Card>
  );
}
