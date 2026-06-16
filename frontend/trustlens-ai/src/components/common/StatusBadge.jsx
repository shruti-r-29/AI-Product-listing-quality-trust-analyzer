import { CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';

const statusConfig = {
  verified: { label: 'Verified', color: '#22C55E', Icon: CheckCircle2 },
  warning: { label: 'Warning', color: '#F59E0B', Icon: AlertTriangle },
  flagged: { label: 'Flagged', color: '#EF4444', Icon: XCircle },
  pending: { label: 'Pending', color: '#94A3B8', Icon: Clock },
};

export default function StatusBadge({ status }) {
  const { label, color, Icon } = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}
