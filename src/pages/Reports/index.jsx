import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Download, Search, Eye, Trash2, RefreshCw } from 'lucide-react';
import ScoreBadge from '../../components/common/ScoreBadge';
import StatusBadge from '../../components/common/StatusBadge';
import PageHeader from '../../components/common/PageHeader';
import TrustTrendChart from '../../components/charts/TrustTrendChart';
import CategoryBarChart from '../../components/charts/CategoryBarChart';
import { useHistory } from '../../contexts/HistoryContext';
import { useApp } from '../../context/AppContext';
import { mockListings } from '../../utils/mockData';
import { getScoreColor } from '../../utils/trustEngine';

// FIX #11 — filter by trust level
const LEVEL_FILTERS = ['All', 'Trusted', 'Good', 'Needs Review', 'High Risk'];

function exportCSV(rows) {
  const headers = ['Product', 'Category', 'Brand', 'Trust Score', 'Trust Level', 'Description Quality', 'Duplicate Risk', 'Suspicious Risk', 'Status', 'Date'];
  const lines = [
    headers.join(','),
    ...rows.map(r => [
      `"${r.listingName || r.title || ''}"`,
      `"${r.category || ''}"`,
      `"${r.brand || ''}"`,
      r.trustScore,
      `"${r.trustLevel || r.status || ''}"`,
      r.descriptionQuality,
      r.duplicateRisk,
      r.suspiciousRisk,
      `"${r.status || ''}"`,
      `"${new Date(r.date).toLocaleDateString()}"`,
    ].join(','))
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'TrustLens_Report.csv'; a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const navigate = useNavigate();
  const { history, remove, refresh } = useHistory();
  const { setAnalysisResult } = useApp();
  const [filter, setFilter]   = useState('All');
  const [search, setSearch]   = useState('');
  const [tab, setTab]         = useState('history'); // 'history' | 'demo'

  // Merge real history + demo listings
  const historyRows = history.map(h => ({
    id: h.id, listingName: h.listingName, category: h.category, brand: h.brand,
    trustScore: h.trustScore, trustLevel: h.trustLevel, descriptionQuality: h.descriptionQuality,
    duplicateRisk: h.duplicateRisk, suspiciousRisk: h.suspiciousRisk,
    status: h.status, date: h.date, isReal: true,
  }));

  const demoRows = mockListings.map(l => ({
    id: `demo_${l.id}`, listingName: l.title, category: l.category, brand: l.brand,
    trustScore: l.trustScore, trustLevel: l.trustScore >= 90 ? 'Trusted' : l.trustScore >= 70 ? 'Good' : l.trustScore >= 50 ? 'Needs Review' : 'High Risk',
    descriptionQuality: l.descriptionQuality, duplicateRisk: l.duplicateRisk,
    suspiciousRisk: l.suspiciousRisk, status: l.status, date: l.date, isReal: false,
  }));

  const activeRows = tab === 'history' ? historyRows : demoRows;

  const filtered = useMemo(() => activeRows.filter(r => {
    const matchLevel  = filter === 'All' || r.trustLevel === filter;
    const matchSearch = (r.listingName || '').toLowerCase().includes(search.toLowerCase()) ||
                        (r.brand || '').toLowerCase().includes(search.toLowerCase()) ||
                        (r.category || '').toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  }), [activeRows, filter, search]);

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Analysis history and performance reports"
        action={
          <button onClick={() => exportCSV(filtered)} className="btn-ghost text-sm py-2">
            <Download size={14} /> Export CSV
          </button>
        }
      />

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <TrustTrendChart />
        <CategoryBarChart />
      </div>

      {/* Tab switcher: History vs Demo */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'history', label: `My Analyses (${historyRows.length})` },
          { key: 'demo',    label: 'Demo Listings' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              tab === t.key ? 'bg-primary/15 text-primary border border-primary/25' : 'text-muted hover:text-white hover:bg-white/5 border border-transparent'
            }`}>
            {t.label}
          </button>
        ))}
        <button onClick={refresh} className="ml-auto btn-ghost py-2 text-xs">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Filters + table */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-primary" />
            <h3 className="font-semibold text-white">{tab === 'history' ? 'Analysis History' : 'Demo Data'}</h3>
            <span className="badge bg-white/8 text-muted border border-white/10">{filtered.length}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                className="input-field pl-8 py-2 text-xs w-full sm:w-48"
                placeholder="Search listings…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {/* FIX #11 — Trust level filter buttons */}
            <div className="flex flex-wrap gap-1">
              {LEVEL_FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                    filter === f ? 'bg-primary/15 text-primary border border-primary/25' : 'text-muted hover:text-white hover:bg-white/5 border border-transparent'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-14">
            <p className="text-muted text-sm mb-3">
              {tab === 'history' ? 'No analyses yet — run your first listing analysis to see results here.' : 'No demo listings match your filters.'}
            </p>
            {tab === 'history' && (
              <button onClick={() => navigate('/new-listing')} className="btn-primary text-sm mx-auto">
                Analyse a Listing
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/6">
                  {['Product', 'Trust Score', 'Trust Level', 'Quality', 'Dup. Risk', 'Status', 'Date', ''].map(h => (
                    <th key={h} className={`text-left text-xs font-medium text-muted pb-3 pr-4 ${
                      ['Quality', 'Dup. Risk'].includes(h) ? 'hidden md:table-cell' :
                      h === 'Date' ? 'hidden lg:table-cell' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <motion.tr key={r.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="border-b border-white/4 hover:bg-white/2 group">
                    <td className="py-3 pr-4">
                      <div className="font-medium text-white/90 text-xs max-w-[150px] truncate">{r.listingName}</div>
                      <div className="text-xs text-muted">{r.brand || r.category || '—'}</div>
                    </td>
                    <td className="py-3 pr-4"><ScoreBadge score={r.trustScore} size="sm" /></td>
                    <td className="py-3 pr-4">
                      <span className="text-xs font-medium" style={{ color: getScoreColor(r.trustScore) }}>
                        {r.trustLevel || '—'}
                      </span>
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell">
                      <ScoreBadge score={r.descriptionQuality || 0} size="sm" />
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell">
                      <span className={`text-xs font-medium ${(r.duplicateRisk || 0) > 40 ? 'text-danger' : (r.duplicateRisk || 0) > 20 ? 'text-warning' : 'text-success'}`}>
                        {r.duplicateRisk || 0}%
                      </span>
                    </td>
                    <td className="py-3 pr-4"><StatusBadge status={r.status} /></td>
                    <td className="py-3 pr-4 hidden lg:table-cell">
                      <span className="text-xs text-muted">
                        {new Date(r.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => {
                          if (r.isReal) {
                            const full = history.find(h => h.id === r.id);
                            if (full) setAnalysisResult(full.result);
                          }
                          navigate('/results');
                        }}
                          className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                          <Eye size={12} /> View
                        </button>
                        {r.isReal && (
                          <button onClick={() => remove(r.id)}
                            className="text-xs text-danger/60 hover:text-danger">
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
