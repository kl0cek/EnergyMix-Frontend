export interface PieCalloutProps {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  index: number;
  payload: { label: string; value: number; fill: string };
}

const RAD = Math.PI / 180;

export function RenderPieCallout(props: PieCalloutProps) {
  const { cx, cy, midAngle, outerRadius, payload } = props;
  const cos = Math.cos(-RAD * midAngle);
  const sin = Math.sin(-RAD * midAngle);
  const toRight = cos >= 0;

  const sx = cx + (outerRadius + 2) * cos;
  const sy = cy + (outerRadius + 2) * sin;
  const mx = cx + (outerRadius + 14) * cos;
  const my = cy + (outerRadius + 14) * sin;
  const ex = mx + (toRight ? 14 : -14);
  const ey = my;

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={payload.fill}
        strokeWidth={1.5}
        fill="none"
      />
      <circle cx={sx} cy={sy} r={2.5} fill={payload.fill} />
      <text
        x={ex + (toRight ? 5 : -5)}
        y={ey}
        textAnchor={toRight ? 'start' : 'end'}
        dominantBaseline="central"
        className="fill-ink text-[11px] font-semibold"
      >
        {payload.label} · {payload.value}%
      </text>
    </g>
  );
}
