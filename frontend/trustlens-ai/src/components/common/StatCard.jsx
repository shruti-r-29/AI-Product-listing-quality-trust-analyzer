import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, unit, trend, trendLabel, icon: Icon, color = '#06B6D4', delay = 0 }) {
  const trendPositive = trend > 0;
  const trendNeutral = trend === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="card glass-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-muted font-medium">{title}</p>
        {Icon && (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
            <Icon size={17} style={{ color }} />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {unit && <span className="text-muted text-sm mb-1">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1.5 mt-2">
          <div className={`flex items-center gap-0.5 text-xs font-medium ${
            trendNeutral ? 'text-muted' : trendPositive ? 'text-success' : 'text-danger'
          }`}>
            {trendNeutral ? <Minus size={12} /> : trendPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </div>
          <span className="text-xs text-muted">{trendLabel || 'vs last month'}</span>
        </div>
      )}
    </motion.div>
  );
}
