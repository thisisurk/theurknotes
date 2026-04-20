import { statusBadge, type VentureStatus } from "@/lib/ventures";

type Props = {
  status: VentureStatus;
};

export function StatusBadge({ status }: Props) {
  const cfg = statusBadge[status];
  return (
    <span
      className="inline-flex items-center rounded-full"
      style={{
        backgroundColor: cfg.bg,
        color: cfg.text,
        fontSize: "0.7rem",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "0.3rem 0.7rem",
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  );
}
