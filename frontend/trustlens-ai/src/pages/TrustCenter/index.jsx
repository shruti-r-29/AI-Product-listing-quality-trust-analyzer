import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, AlertTriangle, Zap, Activity } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import StatCard from '../../components/common/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { mockListings, mockTrustTrendData, mockRiskDistribution } from '../../utils/mockData';
import ScoreBadge from '../../components/common/ScoreBadge';
import StatusBadge from '../../components/common/StatusBadge';
import { getTrustCenterStats } from '../../services/api.js';

const TIP = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 border border-white/10 text-xs">
      <p className="text-muted mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-semibold" style={{ color: p.color || p.stroke }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const DEFAULT_STATS = {
  avgTrust: 82,
  verified: mockListings.filter((l) => l.status === 'verified').length,
  flagged: mockListings.filter((l) => l.status === 'flagged').length,
  totalRun: 247,
  trustTrend: mockTrustTrendData,
  qualityTrend: mockTrustTrendData.map((d) => ({ month: d.month, quality: d.score - 5 })),
  dupTrend: mockTrustTrendData.map((d) => ({ month: d.month, dupRisk: 30 - d.listings })),
  riskDist: mockRiskDistribution,
  displayListings: mockListings,
};

export default function TrustCenterPage() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [hasLiveData, setHasLiveData] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('tl_token');
    if (!token) {
      setLoading(false);
      return;
    }

    getTrustCenterStats()
      .then((data) => {
        setStats(data);
        setHasLiveData(data.totalRun > 0 && data.totalRun !== 247);
      })
      .catch(() => setStats(DEFAULT_STATS))
      .finally(() => setLoading(false));
  }, []);

  const {
    avgTrust, verified, flagged, totalRun,
    trustTrend, qualityTrend, dupTrend, riskDist, displayListings,
  } = stats;

  const insights = [
    { icon: TrendingUp, color: '#22C55E', title: 'Trust Improving', desc: `Average trust score is ${avgTrust}/100 — ${avgTrust >= 75 ? 'above' : 'below'} the recommended 75 threshold.` },
    { icon: AlertTriangle, color: '#F59E0B', title: `${flagged} Flagged`, desc: `${flagged} listing${flagged !== 1 ? 's' : ''} require${flagged === 1 ? 's' : ''} immediate review for suspicious content or duplicate risk.` },
    { icon: Zap, color: '#8B5CF6', title: 'Rule-Based Engine', desc: 'All scores are deterministic — no randomness. Fix the flagged fields and re-analyse to see score improvements.' },
    { icon: Activity, color: '#06B6D4', title: `${totalRun} Analyses`, desc: `${totalRun} total analyses run. ${verified} verified listings with trust score ≥ 70.` },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-muted text-sm">Loading Trust Center stats…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Trust Center" subtitle="Platform-wide listing health and trust analytics" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Platform Trust Score" value={avgTrust} unit="/ 100" trend={5} icon={Shield} color="#06B6D4" delay={0} />
        <StatCard title="Verified Listings" value={verified} trend={8} icon={Shield} color="#22C55E" delay={0.05} />
        <StatCard title="Flagged Listings" value={flagged} trend={-20} trendLabel="improvement" icon={AlertTriangle} color="#EF4444" delay={0.1} />
        <StatCard title="Analyses Run" value={totalRun} trend={22} icon={Activity} color="#8B5CF6" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <div className="card">
          <h3 className="font-semibold text-white mb-1">Trust Score Trend</h3>
          <p className="text-xs text-muted mb-4">Average trust score over recent analyses</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trustTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TIP />} />
              <Area type="monotone" dataKey="score" name="Trust Score" stroke="#06B6D4" strokeWidth={2} fill="url(#cyanGrad)" dot={{ fill: '#06B6D4', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold text-white mb-1">Description Quality Trend</h3>
          <p className="text-xs text-muted mb-4">Average description quality score over time</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={qualityTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TIP />} />
              <Line type="monotone" dataKey="quality" name="Quality" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold text-white mb-1">Duplicate Risk Trend</h3>
          <p className="text-xs text-muted mb-4">Duplicate risk % across recent listings</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dupTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TIP />} />
              <Bar dataKey="dupRisk" name="Dup Risk %" fill="#F59E0B" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold text-white mb-1">Risk Distribution</h3>
          <p className="text-xs text-muted mb-4">Breakdown by trust level across {hasLiveData ? totalRun : 'demo'} listings</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={riskDist} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {riskDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<TIP />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-1">
            {riskDist.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-muted">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap size={16} className="text-secondary" />
          <h3 className="font-semibold text-white">AI Insights</h3>
          {hasLiveData && <span className="badge bg-primary/15 text-primary border border-primary/20 ml-2">Live from your data</span>}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {insights.map((insight, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${insight.color}18` }}>
                <insight.icon size={16} style={{ color: insight.color }} />
              </div>
              <div>
                <div className="text-sm font-medium text-white mb-0.5">{insight.title}</div>
                <div className="text-xs text-muted leading-relaxed">{insight.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-white mb-5">
          {hasLiveData ? 'Your Listing Health' : 'Marketplace Health (Demo)'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/6">
                {['Listing', 'Trust Score', 'Quality', 'Dup. Risk', 'Sus. Risk', 'Status'].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayListings.map((l, i) => (
                <motion.tr key={l.id || i}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                  className="border-b border-white/4 hover:bg-white/2">
                  <td className="py-3 pr-4">
                    <div className="text-xs font-medium text-white/90 max-w-[160px] truncate">{l.title}</div>
                    <div className="text-xs text-muted">{l.brand || l.category}</div>
                  </td>
                  <td className="py-3 pr-4"><ScoreBadge score={l.trustScore} size="sm" /></td>
                  <td className="py-3 pr-4"><ScoreBadge score={l.descriptionQuality || 0} size="sm" /></td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-medium ${(l.duplicateRisk || 0) > 40 ? 'text-danger' : (l.duplicateRisk || 0) > 20 ? 'text-warning' : 'text-success'}`}>
                      {l.duplicateRisk || 0}%
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-medium ${(l.suspiciousRisk || 0) > 30 ? 'text-danger' : (l.suspiciousRisk || 0) > 15 ? 'text-warning' : 'text-success'}`}>
                      {l.suspiciousRisk || 0}%
                    </span>
                  </td>
                  <td className="py-3"><StatusBadge status={l.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
