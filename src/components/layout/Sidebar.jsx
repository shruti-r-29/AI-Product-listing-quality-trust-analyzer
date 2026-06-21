import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, PlusCircle, Shield, BarChart3,
  Settings, HelpCircle, FileText, MessageCircle,
  LogOut, Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: PlusCircle, label: 'New Listing', href: '/new-listing' },
  { icon: Shield, label: 'Trust Center', href: '/trust-center' },
  { icon: BarChart3, label: 'Reports', href: '/reports' },
];

function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join('');
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex flex-col w-56 fixed left-0 top-16 bottom-0 glass border-r border-white/5 z-40">
      <div className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
        <div className="section-label px-3 py-2">Navigation</div>
        {navItems.map(item => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={16} className={active ? 'text-primary' : 'text-muted group-hover:text-white/70'} />
              {item.label}
              {active && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1 h-4 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}

        <div className="section-label px-3 py-2 mt-4">Resources</div>
        {[
          { icon: FileText, label: 'Help', href: '/help' },
          { icon: MessageCircle, label: 'Contact', href: '/contact' },
          { icon: Settings, label: 'Settings', href: '/settings' },
        ].map(item => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              location.pathname === item.href
                ? 'bg-primary/10 text-primary'
                : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Bottom: user info + logout */}
      <div className="p-3 border-t border-white/5 space-y-3">
        {/* Pro badge */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/20">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={13} className="text-secondary" />
            <span className="text-xs font-semibold text-white">{user?.plan || 'Pro'} Plan</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">Unlimited analyses & exports</p>
        </div>

        {/* User info */}
        {user && (
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{user.name}</div>
              <div className="text-xs text-muted truncate">{user.email}</div>
            </div>
          </div>
        )}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-danger/70 hover:text-danger hover:bg-danger/8 transition-all duration-150 border border-transparent hover:border-danger/15"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
