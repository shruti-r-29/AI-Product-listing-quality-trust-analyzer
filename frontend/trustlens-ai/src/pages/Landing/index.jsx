import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Zap, Search, AlertTriangle, CheckCircle2, BarChart3,
  ArrowRight, Star, ChevronDown, Layers, Lock, TrendingUp,
  Users, Activity, Award
} from 'lucide-react';
import { testimonials, faqItems } from '../../utils/mockData';
import { useState } from 'react';

const features = [
  {
    icon: BarChart3,
    color: '#06B6D4',
    title: 'AI Description Scoring',
    desc: 'Natural language analysis scores your listing description on clarity, completeness, and buyer appeal — with actionable rewrites.',
  },
  {
    icon: Search,
    color: '#8B5CF6',
    title: 'Duplicate Detection',
    desc: 'Semantic similarity matching finds near-duplicate listings across your marketplace with up to 94% precision.',
  },
  {
    icon: AlertTriangle,
    color: '#F59E0B',
    title: 'Suspicious Pattern Flags',
    desc: 'Detects fraud signals, off-platform payment attempts, and high-pressure language before they reach buyers.',
  },
  {
    icon: CheckCircle2,
    color: '#22C55E',
    title: 'Completeness Check',
    desc: 'Identifies every missing field — images, warranty, brand, specs — and quantifies how much each gap costs your Trust Score.',
  },
  {
    icon: Zap,
    color: '#14B8A6',
    title: 'AI Improvement Suggestions',
    desc: 'Ranked, specific suggestions that tell sellers exactly what to fix and why — not vague advice.',
  },
  {
    icon: Lock,
    color: '#EF4444',
    title: 'Trust Score Dashboard',
    desc: 'A single composite score that buyers, sellers, and platform operators can act on immediately.',
  },
];

const stats = [
  { value: '94%', label: 'Duplicate detection precision' },
  { value: '78%', label: 'Reduction in fraudulent listings' },
  { value: '40%', label: 'More conversions for verified sellers' },
  { value: '<2s', label: 'Average analysis time' },
];

const workflowSteps = [
  { num: '01', title: 'Submit Your Listing', desc: 'Paste or fill in your listing details in our multi-step wizard.' },
  { num: '02', title: 'AI Analysis Runs', desc: 'Five analysis engines evaluate description, completeness, duplicates, and risk.' },
  { num: '03', title: 'Review Your Report', desc: 'Get a full Trust Score breakdown with prioritized fixes and AI suggestions.' },
  { num: '04', title: 'Publish With Confidence', desc: 'Apply improvements and publish a listing buyers can trust.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/8 rounded-xl overflow-hidden cursor-pointer glass-hover"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-sm font-medium text-white/90">{q}</span>
        <ChevronDown
          size={16}
          className={`text-muted flex-shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">
      {/* Aurora background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #06B6D4, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[350px] rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #8B5CF6, transparent)' }} />
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium">AI-Powered Listing Intelligence</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto mb-6">
            Know if a listing{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #06B6D4, #8B5CF6)' }}>
              can be trusted
            </span>
            {' '}before it goes live
          </h1>

          <p className="text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            TrustLens analyzes marketplace listings for fraud signals, missing information,
            duplicates, and description quality — then tells you exactly how to fix them.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/new-listing')} className="btn-primary text-base px-7 py-3">
              Start Analysis <ArrowRight size={17} />
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn-ghost text-base px-7 py-3">
              View Demo Dashboard
            </button>
          </div>
        </motion.div>

        {/* Hero stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto w-full"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white glow-text">{s.value}</div>
              <div className="text-xs text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label">Core Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Five engines. One verdict.</h2>
            <p className="text-muted mt-3 max-w-xl mx-auto text-sm">
              Every analysis combines five specialized AI checks into a single actionable Trust Score.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="card glass-hover group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}28` }}>
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Workflow ── */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Analysis in four steps</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-black text-white/5 mb-3 font-mono">{step.num}</div>
                <h3 className="font-semibold text-white mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statistics / Benefits ── */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label">Why TrustLens</p>
              <h2 className="text-3xl font-bold text-white mb-5">Built for marketplace operators and serious sellers</h2>
              <div className="space-y-4">
                {[
                  { icon: TrendingUp, text: 'Sellers with Trust Scores above 85 see 40% higher conversion rates.' },
                  { icon: Users, text: 'Platform teams reduce manual review workload by over 60%.' },
                  { icon: Activity, text: 'Real-time analysis with sub-2-second response times.' },
                  { icon: Award, text: 'Enterprise-grade accuracy on semantic duplicate detection.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon size={15} className="text-primary" />
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card text-center gradient-border"
                >
                  <div className="text-3xl font-black text-transparent bg-clip-text mb-1"
                    style={{ backgroundImage: 'linear-gradient(135deg, #06B6D4, #8B5CF6)' }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label">Testimonials</p>
            <h2 className="text-3xl font-bold text-white">Trusted by marketplace teams</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card glass-hover"
              >
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} className="text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">FAQ</p>
            <h2 className="text-3xl font-bold text-white">Common questions</h2>
          </div>
          <div className="space-y-3">
            {faqItems.slice(0, 5).map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="text-sm text-primary hover:text-primary/80 transition-colors">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card gradient-border py-14 px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Run your first analysis free
            </h2>
            <p className="text-muted mb-8 text-sm max-w-lg mx-auto">
              No credit card required. Analyze up to 5 listings on the free tier.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate('/signup')} className="btn-primary text-base px-8 py-3">
                Create Free Account <ArrowRight size={17} />
              </button>
              <button onClick={() => navigate('/new-listing')} className="btn-ghost text-base px-8 py-3">
                Analyze a Listing Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Shield size={13} className="text-primary" />
                </div>
                <span className="font-bold text-white text-sm">TrustLens AI</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">AI-Powered Marketplace Trust & Listing Intelligence Platform</p>
            </div>
            {[
              { title: 'Product', links: [['Dashboard', '/dashboard'], ['New Listing', '/new-listing'], ['Trust Center', '/trust-center'], ['Reports', '/reports']] },
              { title: 'Company', links: [['About', '/about'], ['Contact', '/contact'], ['FAQ', '/faq'], ['Help', '/help']] },
              { title: 'Account', links: [['Sign Up', '/signup'], ['Log In', '/login'], ['Settings', '/settings']] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">{col.title}</div>
                <div className="space-y-2">
                  {col.links.map(([label, href]) => (
                    <Link key={href} to={href} className="block text-xs text-muted hover:text-white transition-colors">{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted">© 2024 TrustLens AI. All rights reserved.</p>
            <p className="text-xs text-muted">Built with AI · Designed for trust</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
