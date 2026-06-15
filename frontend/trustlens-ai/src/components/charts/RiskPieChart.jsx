import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockRiskDistribution } from '../../utils/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 text-xs border border-white/10">
        <p style={{ color: payload[0].payload.color }} className="font-semibold">{payload[0].name}</p>
        <p className="text-muted">{payload[0].value}% of listings</p>
      </div>
    );
  }
  return null;
};

export default function RiskPieChart() {
  return (
    <div className="card">
      <h3 className="font-semibold text-white mb-1">Risk Distribution</h3>
      <p className="text-xs text-muted mb-4">Breakdown by risk level across all listings</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={mockRiskDistribution}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {mockRiskDistribution.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        {mockRiskDistribution.map(d => (
          <div key={d.name} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-xs text-muted">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
