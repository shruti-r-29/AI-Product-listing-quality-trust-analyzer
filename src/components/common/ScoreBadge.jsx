import { getScoreColor } from '../../utils/trustEngine';

export default function ScoreBadge({ score, size = 'md' }) {
  const color = getScoreColor(score);
  const sizes = { sm: 'text-xs px-2 py-0.5', md: 'text-sm px-2.5 py-1', lg: 'text-base px-3 py-1.5' };
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizes[size]}`}
      style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}>
      {score}
    </span>
  );
}
