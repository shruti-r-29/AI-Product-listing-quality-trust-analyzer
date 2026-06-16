import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, Bell, Search, LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'New Listing', href: '/new-listing' },
  { label: 'Trust Center', href: '/trust-center' },
  { label: 'Reports', href: '/reports' },
];

function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join('');
}

function UserMenu({ user, logout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary select-none">
          {getInitials(user?.name)}
        </div>
        <span className="hidden lg:block text-sm text-white/80 max-w-[100px] truncate">{user?.name}</span>
        <ChevronDown size={13} className={`hidden lg:block text-muted transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-surface/95 backdrop-blur-xl shadow-xl z-50 overflow-hidden"
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-white/8">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-muted truncate mt-0.5">{user?.email}</div>
              <span className="mt-1.5 inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                {user?.plan} Plan
              </span>
            </div>

            {/* Menu items */}
            <div className="py-1.5">
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Settings size={14} /> Settings
              </Link>
              <Link
                to="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <User size={14} /> Profile
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-white/8 py-1.5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger/80 hover:text-danger hover:bg-danger/5 transition-colors"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ isApp = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Shield size={16} className="text-primary" />
          </div>
          <span className="font-bold text-white tracking-tight">TrustLens <span className="text-primary">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        {isApp ? (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location.pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6">
            {['About', 'FAQ', 'Help'].map(item => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-sm text-muted hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {isApp ? (
            <>
              <button className="hidden sm:flex w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center transition-colors">
                <Search size={15} className="text-muted" />
              </button>
              <button className="relative hidden sm:flex w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center transition-colors">
                <Bell size={15} className="text-muted" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
              </button>
              <UserMenu user={user} logout={logout} />
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block text-sm text-muted hover:text-white transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary text-sm py-2 px-4">
                Start Free
              </Link>
            </>
          )}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-surface/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {isApp ? (
                <>
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        location.pathname === link.href ? 'bg-primary/10 text-primary' : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {user && (
                    <>
                      <div className="border-t border-white/8 my-2 pt-2">
                        <div className="px-3 py-1 text-xs text-muted">Signed in as <span className="text-white">{user.name}</span></div>
                      </div>
                      <Link to="/settings" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/5 flex items-center gap-2">
                        <Settings size={14} /> Settings
                      </Link>
                      <button
                        onClick={() => { setMenuOpen(false); logout(); navigate('/login'); }}
                        className="px-3 py-2.5 rounded-lg text-sm text-danger/80 hover:bg-danger/5 flex items-center gap-2 text-left w-full"
                      >
                        <LogOut size={14} /> Sign out
                      </button>
                    </>
                  )}
                </>
              ) : (
                [
                  { label: 'About', href: '/about' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Help', href: '/help' },
                  { label: 'Log in', href: '/login' },
                  { label: 'Sign up', href: '/signup' },
                ].map(link => (
                  <Link
                    key={link.href + link.label}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
