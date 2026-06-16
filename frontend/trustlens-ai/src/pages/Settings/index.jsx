import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Key, Palette, Save, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'api', label: 'API Keys', icon: Key },
];

function Toggle({ label, desc, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between py-4 border-b border-white/5">
      <div>
        <div className="text-sm text-white/90">{label}</div>
        {desc && <div className="text-xs text-muted mt-0.5">{desc}</div>}
      </div>
      <button
        onClick={() => setOn(v => !v)}
        className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 flex-shrink-0 ${on ? 'bg-primary' : 'bg-white/15'}`}
        style={{ height: '22px', width: '40px' }}
      >
        <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0.5'}`}
          style={{ width: '18px', height: '18px', transform: on ? 'translateX(18px)' : 'translateX(2px)' }} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Alex Kumar',
    email: 'alex@trustlens.ai',
    company: 'TechBazaar',
    timezone: 'Asia/Kolkata',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Settings" subtitle="Manage your account and preferences" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar tabs */}
        <nav className="flex md:flex-col gap-1 md:w-44 flex-shrink-0">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                tab === t.id ? 'bg-primary/10 text-primary' : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 card">
          {tab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-semibold text-white mb-5">Profile Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-xl font-bold text-primary">
                    AK
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Profile Photo</div>
                    <button className="text-xs text-primary mt-1 hover:text-primary/80 transition-colors">Upload new photo</button>
                  </div>
                </div>
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Email Address', key: 'email', type: 'email' },
                  { label: 'Company', key: 'company', type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-muted mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      className="input-field"
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Timezone</label>
                  <select className="input-field" value={form.timezone} onChange={e => setForm(p => ({ ...p, timezone: e.target.value }))}>
                    {['Asia/Kolkata', 'America/New_York', 'Europe/London', 'America/Los_Angeles', 'Asia/Tokyo'].map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-semibold text-white mb-5">Notification Preferences</h3>
              <Toggle label="High-risk listing alerts" desc="Get notified when a listing scores below 60" defaultOn={true} />
              <Toggle label="Duplicate detection alerts" desc="Alerts for similarity matches above 80%" defaultOn={true} />
              <Toggle label="Weekly trust report" desc="Receive a summary every Monday morning" defaultOn={false} />
              <Toggle label="AI suggestion updates" desc="Notify when new improvement suggestions are available" defaultOn={true} />
              <Toggle label="Marketing emails" desc="Product updates and feature announcements" defaultOn={false} />
            </motion.div>
          )}

          {tab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-semibold text-white mb-5">Security Settings</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">New Password</label>
                  <input type="password" placeholder="Min 8 characters" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted mb-2">Confirm New Password</label>
                  <input type="password" placeholder="Repeat new password" className="input-field" />
                </div>
              </div>
              <div className="border-t border-white/5 pt-5">
                <Toggle label="Two-factor authentication" desc="Require a verification code on login" defaultOn={false} />
                <Toggle label="Login notifications" desc="Email me when a new device signs in" defaultOn={true} />
              </div>
            </motion.div>
          )}

          {tab === 'api' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-semibold text-white mb-2">API Keys</h3>
              <p className="text-xs text-muted mb-5">Use these keys to integrate TrustLens into your platform.</p>
              <div className="space-y-3">
                {[
                  { label: 'Production API Key', key: 'tl_prod_xK9mP2vQr8nZ4wE6yH1dL5jF3sA7cB0', created: 'Jan 10, 2024' },
                  { label: 'Test API Key', key: 'tl_test_aR3kX7mN5pQ2wE8yL1vD4jB6sF9cZ0', created: 'Jan 8, 2024' },
                ].map(k => (
                  <div key={k.label} className="p-4 rounded-xl bg-white/3 border border-white/8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-white">{k.label}</span>
                      <span className="text-xs text-muted">Created {k.created}</span>
                    </div>
                    <code className="text-xs font-mono text-muted/70 break-all">{k.key}</code>
                  </div>
                ))}
              </div>
              <button className="btn-ghost text-sm mt-4">Generate new key</button>
            </motion.div>
          )}

          {/* Save button (not for API tab) */}
          {tab !== 'api' && (
            <div className="mt-6 flex items-center gap-3">
              <button onClick={handleSave} className="btn-primary text-sm">
                <Save size={14} /> Save changes
              </button>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-sm text-success"
                >
                  <CheckCircle2 size={14} /> Saved
                </motion.span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
