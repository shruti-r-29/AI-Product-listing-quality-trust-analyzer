import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const channels = [
  { icon: Mail, color: '#06B6D4', label: 'Email', value: 'hello@trustlens.ai', desc: 'We respond within 24 hours' },
  { icon: MessageSquare, color: '#8B5CF6', label: 'Live Chat', value: 'Available in-app', desc: 'Mon–Fri, 9am–6pm IST' },
  { icon: Phone, color: '#22C55E', label: 'Phone', value: '+91 80 1234 5678', desc: 'Enterprise customers only' },
  { icon: MapPin, color: '#F59E0B', label: 'Office', value: 'Bangalore, India', desc: 'Not open to walk-ins' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
        <p className="text-muted max-w-md mx-auto">Have a question, partnership inquiry, or feedback? We'd love to hear from you.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-4">
          <h2 className="font-semibold text-white mb-4">Get in touch</h2>
          {channels.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${c.color}18` }}>
                <c.icon size={16} style={{ color: c.color }} />
              </div>
              <div>
                <div className="text-xs font-medium text-muted mb-0.5">{c.label}</div>
                <div className="text-sm font-medium text-white">{c.value}</div>
                <div className="text-xs text-muted/60 mt-0.5">{c.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div className="card gradient-border">
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 size={40} className="text-success mb-4" />
              <h3 className="font-semibold text-white mb-2">Message sent!</h3>
              <p className="text-sm text-muted">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-semibold text-white mb-2">Send a message</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Name</label>
                  <input required className="input-field" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Email</label>
                  <input required type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-2">Subject</label>
                <input className="input-field" placeholder="How can we help?" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-2">Message</label>
                <textarea required className="input-field resize-none h-32" placeholder="Tell us more…" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                {sending ? (
                  <><div className="w-4 h-4 border-2 border-bg/40 border-t-bg rounded-full animate-spin" /> Sending…</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
