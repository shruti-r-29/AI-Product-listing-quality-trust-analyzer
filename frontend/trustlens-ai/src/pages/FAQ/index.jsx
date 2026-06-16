import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { faqItems } from '../../utils/mockData';
import { useNavigate } from 'react-router-dom';

const extraFaqs = [
  { q: 'Is TrustLens available as a white-label solution?', a: 'Yes — enterprise customers can white-label TrustLens under their own brand. Contact our sales team for pricing and customization options.' },
  { q: 'Which marketplaces does TrustLens support?', a: 'TrustLens is marketplace-agnostic. It integrates with any platform via API, and our frontend works standalone for manual analyses.' },
  { q: 'How often are the AI models updated?', a: 'Our fraud detection and duplicate models are retrained monthly on new marketplace data to stay current with evolving patterns.' },
  { q: 'Can I bulk-analyze listings?', a: 'Yes — the Pro and Enterprise plans support bulk CSV upload for analyzing hundreds of listings in one submission.' },
  { q: 'What language does TrustLens support?', a: 'English is fully supported. Partial support exists for Spanish, French, German, and Hindi. Full multilingual support is on the roadmap.' },
];

const allFaqs = [...faqItems, ...extraFaqs];

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
      className="border border-white/8 rounded-xl overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium text-white/90">{q}</span>
        <ChevronDown size={16} className={`text-muted flex-shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-muted leading-relaxed">{a}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = allFaqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Frequently Asked Questions</h1>
        <p className="text-muted">Everything you need to know about TrustLens AI</p>
      </motion.div>

      <div className="relative mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          className="input-field pl-11 py-3"
          placeholder="Search questions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.length > 0
          ? filtered.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} i={i} />)
          : (
            <div className="text-center py-12 text-muted text-sm">
              No questions match "{search}"
            </div>
          )
        }
      </div>

      <div className="mt-12 p-6 card gradient-border text-center">
        <p className="text-white font-medium mb-1">Still have questions?</p>
        <p className="text-sm text-muted mb-4">Our team is happy to help via email or live chat.</p>
        <button onClick={() => navigate('/contact')} className="btn-primary mx-auto">Contact Support</button>
      </div>
    </div>
  );
}
