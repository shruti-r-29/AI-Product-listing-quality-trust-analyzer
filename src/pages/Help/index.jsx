import { motion } from 'framer-motion';
import { Book, Video, MessageCircle, FileText, ArrowRight, Search, Shield, Zap, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sections = [
  {
    icon: Shield,
    color: '#06B6D4',
    title: 'Getting Started',
    articles: [
      'Creating your first listing analysis',
      'Understanding your Trust Score',
      'How to interpret the Results page',
      'Setting up your account profile',
    ],
  },
  {
    icon: Zap,
    color: '#8B5CF6',
    title: 'Analysis Features',
    articles: [
      'How description scoring works',
      'Missing information detection guide',
      'Suspicious content — what triggers flags',
      'Duplicate detection methodology',
    ],
  },
  {
    icon: BarChart3,
    color: '#22C55E',
    title: 'Trust Center & Reports',
    articles: [
      'Navigating the Trust Center dashboard',
      'Exporting listing reports to CSV',
      'Understanding marketplace health metrics',
      'Setting up automated alerts',
    ],
  },
];

const quickLinks = [
  { icon: Book, label: 'Documentation', desc: 'Full API and feature reference', color: '#06B6D4' },
  { icon: Video, label: 'Video Tutorials', desc: 'Step-by-step walkthroughs', color: '#8B5CF6' },
  { icon: MessageCircle, label: 'Community Forum', desc: 'Talk to other TrustLens users', color: '#14B8A6' },
  { icon: FileText, label: 'Release Notes', desc: "What's new in each version", color: '#F59E0B' },
];

export default function HelpPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Help Center</h1>
        <p className="text-muted mb-6">Everything you need to get the most out of TrustLens AI</p>
        <div className="relative max-w-lg mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input className="input-field pl-11 py-3 w-full" placeholder="Search help articles…" />
        </div>
      </motion.div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {quickLinks.map((l, i) => (
          <motion.button
            key={l.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="card glass-hover text-left group"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${l.color}18` }}>
              <l.icon size={16} style={{ color: l.color }} />
            </div>
            <div className="text-sm font-medium text-white mb-1">{l.label}</div>
            <div className="text-xs text-muted">{l.desc}</div>
          </motion.button>
        ))}
      </div>

      {/* Article sections */}
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card"
          >
            <div className="flex items-center gap-2 mb-4">
              <section.icon size={15} style={{ color: section.color }} />
              <h3 className="font-semibold text-white text-sm">{section.title}</h3>
            </div>
            <ul className="space-y-2.5">
              {section.articles.map(a => (
                <li key={a}>
                  <button className="w-full text-left flex items-center justify-between group">
                    <span className="text-xs text-muted group-hover:text-white transition-colors">{a}</span>
                    <ArrowRight size={11} className="text-muted/40 group-hover:text-primary flex-shrink-0 ml-2 transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Contact support */}
      <div className="card gradient-border text-center py-10">
        <MessageCircle size={28} className="text-primary mx-auto mb-3" />
        <h2 className="font-semibold text-white mb-2">Can't find what you need?</h2>
        <p className="text-sm text-muted mb-5">Our support team is available Monday–Friday, 9am–6pm IST.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/contact')} className="btn-primary mx-auto sm:mx-0">
            Contact Support
          </button>
          <button onClick={() => navigate('/faq')} className="btn-ghost mx-auto sm:mx-0">
            Browse FAQ
          </button>
        </div>
      </div>
    </div>
  );
}
