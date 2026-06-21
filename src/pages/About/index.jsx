import { motion } from 'framer-motion';
import { Shield, Zap, Users, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const team = [
  { name: 'Priya Ramachandran', role: 'CEO & Co-Founder', avatar: 'PR', bio: 'Former marketplace trust lead at Flipkart. 10 years in e-commerce safety.' },
  { name: 'James Okafor', role: 'CTO & Co-Founder', avatar: 'JO', bio: 'ML engineer with expertise in NLP and anomaly detection systems.' },
  { name: 'Mei-Lin Zhang', role: 'Head of AI', avatar: 'MZ', bio: 'PhD in computational linguistics. Previously at Google DeepMind.' },
  { name: 'Arjun Menon', role: 'Head of Product', avatar: 'AM', bio: 'Product leader focused on trust, safety, and marketplace integrity.' },
];

const values = [
  { icon: Shield, color: '#06B6D4', title: 'Trust First', desc: 'Every feature we build starts with the question: does this make buyers and sellers safer?' },
  { icon: Zap, color: '#8B5CF6', title: 'AI With Purpose', desc: 'We use AI to solve real problems — not to add complexity or confuse the people we serve.' },
  { icon: Users, color: '#22C55E', title: 'Marketplace Integrity', desc: 'Healthy marketplaces require honest listings. We make it easy to do the right thing.' },
  { icon: Award, color: '#F59E0B', title: 'Accuracy Over Speed', desc: "We'd rather take an extra 200ms to get the analysis right than rush a wrong score." },
];

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 items-center justify-center mb-6">
          <Shield size={24} className="text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">About TrustLens AI</h1>
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          We're building the trust layer for online marketplaces — making it easy for anyone to verify that a listing is honest, complete, and safe.
        </p>
      </motion.div>

      {/* Mission */}
      <div className="card gradient-border mb-12 text-center py-10">
        <p className="section-label mb-3">Our Mission</p>
        <p className="text-xl text-white font-medium max-w-2xl mx-auto leading-relaxed">
          "To make fraudulent, misleading, and low-quality marketplace listings impossible to hide — for the benefit of every honest buyer and seller."
        </p>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">What we stand for</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card glass-hover"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${v.color}18` }}>
                <v.icon size={18} style={{ color: v.color }} />
              </div>
              <h3 className="font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">The team</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card glass-hover flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center text-sm font-bold text-secondary flex-shrink-0">
                {m.avatar}
              </div>
              <div>
                <div className="font-semibold text-white">{m.name}</div>
                <div className="text-xs text-primary mb-2">{m.role}</div>
                <p className="text-xs text-muted leading-relaxed">{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button onClick={() => navigate('/signup')} className="btn-primary text-base px-8 py-3 mx-auto">
          Join TrustLens <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
