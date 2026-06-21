import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { mockTrustTrendData } from '../../utils/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2.5 border border-white/10 text-xs">
        <p className="text-muted mb-1">{label}</p>
        <p className="text-primary font-semibold">Score: {payload[0].value}</p>
        {payload[1] && <p className="text-secondary font-semibold">Listings: {payload[1].value}</p>}
      </div>
    );
  }
  return null;
};

export default function TrustTrendChart() {
  return (
    <div className="card">
      <h3 className="font-semibold text-white mb-1">Trust Score Trend</h3>
      <p className="text-xs text-muted mb-5">Average trust score over the last 6 months</p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={mockTrustTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[60, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={2} fill="url(#colorScore)" dot={{ fill: '#06B6D4', strokeWidth: 0, r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
