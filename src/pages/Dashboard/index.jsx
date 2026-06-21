import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, AlertTriangle, Copy, Activity, PlusCircle,
  ChevronRight, Bell, Clock, Eye, Trash2
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import TrustTrendChart from '../../components/charts/TrustTrendChart';
import RiskPieChart from '../../components/charts/RiskPieChart';
import CategoryBarChart from '../../components/charts/CategoryBarChart';
import QualityRadarChart from '../../components/charts/QualityRadarChart';
import StatusBadge from '../../components/common/StatusBadge';
import ScoreBadge from '../../components/common/ScoreBadge';
import PageHeader from '../../components/common/PageHeader';
import { mockListings, mockAlerts } from '../../utils/mockData';
import { useApp } from '../../context/AppContext';
import { useHistory } from '../../contexts/HistoryContext';
import { getScoreColor } from '../../utils/trustEngine';

const alertIconMap = {
  suspicious: { icon: AlertTriangle, color: '#EF4444' },
  duplicate:  { icon: Copy,          color: '#F59E0B' },
  missing:    { icon: Shield,        color: '#06B6D4' },
  quality:    { icon: Activity,      color: '#8B5CF6' },
};

// ── Recent Analyses section (FIX #4) ─────────────────────────────────────
function RecentAnalyses() {
  const navigate = useNavigate();
  const { history, remove } = useHistory();
  const { setAnalysisResult } = useApp();
  const recent = history.slice(0, 10);

  if (recent.length === 0) return null;

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-white">Recent Analyses</h3>
          <p className="text-xs text-muted mt-0.5">Your last {recent.length} listing analyses — stored locally</p>
        </div>
        <Link to="/reports" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
          View all <ChevronRight size={13} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs font-medium text-muted pb-3">Product</th>
              <th className="text-center text-xs font-medium text-muted pb-3">Trust</th>
              <th className="text-left text-xs font-medium text-muted pb-3 hidden sm:table-cell">Level</th>
              <th className="text-left text-xs font-medium text-muted pb-3 hidden md:table-cell">Date</th>
              <th className="text-left text-xs font-medium text-muted pb-3">Status</th>
              <th className="text-right text-xs font-medium text-muted pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((item, i) => (
              <motion.tr key={item.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="border-b border-white/4 hover:bg-white/2 group">
                <td className="py-3 pr-4">
                  <div className="font-medium text-white/90 text-xs truncate max-w-[150px]">{item.listingName}</div>
                  <div className="text-xs text-muted">{item.category || item.brand || '—'}</div>
                </td>
                <td className="py-3 pr-4 text-center">
                  <ScoreBadge score={item.trustScore} size="sm" />
                </td>
                <td className="py-3 pr-4 hidden sm:table-cell">
                  <span className="text-xs font-medium" style={{ color: getScoreColor(item.trustScore) }}>
                    {item.trustLevel}
                  </span>
                </td>
                <td className="py-3 pr-4 hidden md:table-cell">
                  <span className="text-xs text-muted">
                    {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { setAnalysisResult(item.result); navigate('/results'); }}
                      className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      <Eye size={12} /> View
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="text-xs text-danger/60 hover:text-danger flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Dashboard stats derived from history ──────────────────────────────────
function useDashboardStats() {
  const { history } = useHistory();
  if (history.length === 0) {
    return { avgTrust: 82, avgQuality: 79, avgDupRisk: 18, totalListings: 31 };
  }
  const avg = (key) => Math.round(history.reduce((a, h) => a + (h[key] || 0), 0) / history.length);
  return {
    avgTrust:      avg('trustScore'),
    avgQuality:    avg('descriptionQuality'),
    avgDupRisk:    avg('duplicateRisk'),
    totalListings: history.length,
  };
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const stats    = useDashboardStats();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your marketplace listing intelligence"
        action={
          <button onClick={() => navigate('/new-listing')} className="btn-primary text-sm">
            <PlusCircle size={15} /> New Listing
          </button>
        }
      />

      {/* Stats — now driven by real history when available */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Avg Trust Score"  value={stats.avgTrust}      unit="/ 100" trend={5}  icon={Shield}   color="#06B6D4" delay={0}    />
        <StatCard title="Desc Quality"     value={stats.avgQuality}    unit="/ 100" trend={3}  icon={Activity} color="#8B5CF6" delay={0.05} />
        <StatCard title="Duplicate Risk"   value={stats.avgDupRisk}    unit="%"     trend={-8} trendLabel="improvement" icon={Copy} color="#F59E0B" delay={0.1} />
        <StatCard title="Analyses Run"     value={stats.totalListings} trend={12}              icon={Shield}   color="#22C55E" delay={0.15} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2"><TrustTrendChart /></div>
        <RiskPieChart />
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2"><CategoryBarChart /></div>
        <QualityRadarChart />
      </div>

      {/* Recent Analyses (FIX #4) */}
      <RecentAnalyses />

      {/* Recent Listings + Alerts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white">Sample Listings</h3>
              <p className="text-xs text-muted mt-0.5">Demo marketplace data</p>
            </div>
            <Link to="/reports" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-medium text-muted pb-3">Listing</th>
                  <th className="text-left text-xs font-medium text-muted pb-3 hidden sm:table-cell">Category</th>
                  <th className="text-center text-xs font-medium text-muted pb-3">Trust</th>
                  <th className="text-left text-xs font-medium text-muted pb-3 hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockListings.map((listing, i) => (
                  <motion.tr key={listing.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    className="border-b border-white/4 hover:bg-white/2 cursor-pointer"
                    onClick={() => navigate('/results')}>
                    <td className="py-3 pr-4">
                      <div className="font-medium text-white/90 text-xs truncate max-w-[160px]">{listing.title}</div>
                      <div className="text-xs text-muted">{listing.brand}</div>
                    </td>
                    <td className="py-3 pr-4 hidden sm:table-cell">
                      <span className="text-xs text-muted">{listing.category}</span>
                    </td>
                    <td className="py-3 pr-4 text-center">
                      <ScoreBadge score={listing.trustScore} size="sm" />
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell">
                      <StatusBadge status={listing.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">Alerts</h3>
              <span className="badge bg-danger/15 text-danger border border-danger/20">{mockAlerts.length}</span>
            </div>
            <Bell size={15} className="text-muted" />
          </div>
          <div className="space-y-3">
            {mockAlerts.map((alert, i) => {
              const { icon: Icon, color } = alertIconMap[alert.type] || alertIconMap.quality;
              return (
                <motion.div key={alert.id}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                  className="p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}18` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-white truncate">{alert.title}</div>
                      <div className="text-xs text-muted mt-0.5 leading-relaxed line-clamp-2">{alert.message}</div>
                      <div className="text-xs text-white/25 mt-1.5 flex items-center gap-1">
                        <Clock size={10} /> {alert.time}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
