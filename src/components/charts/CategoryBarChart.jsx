import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { mockCategoryData } from '../../utils/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2.5 border border-white/10 text-xs">
        <p className="text-white font-semibold mb-1">{label}</p>
        <p className="text-primary">Listings: {payload[0]?.value}</p>
        <p className="text-secondary">Avg Score: {payload[1]?.value}</p>
      </div>
    );
  }
  return null;
};

export default function CategoryBarChart() {
  return (
    <div className="card">
      <h3 className="font-semibold text-white mb-1">Listings by Category</h3>
      <p className="text-xs text-muted mb-5">Volume and average trust score per category</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={mockCategoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={14}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="category" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="listings" fill="#06B6D4" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
          <Bar dataKey="avgScore" fill="#8B5CF6" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
