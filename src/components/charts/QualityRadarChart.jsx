import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';
import { mockRadarData } from '../../utils/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 border border-white/10 text-xs">
        <p className="text-primary font-semibold">{payload[0]?.payload?.subject}</p>
        <p className="text-muted">{payload[0]?.value} / 100</p>
      </div>
    );
  }
  return null;
};

export default function QualityRadarChart({ data }) {
  const chartData = data || mockRadarData;
  return (
    <div className="card">
      <h3 className="font-semibold text-white mb-1">Quality Breakdown</h3>
      <p className="text-xs text-muted mb-4">Multi-dimensional listing quality score</p>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 9 }} />
          <Radar name="Score" dataKey="A" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.15} strokeWidth={2} />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
