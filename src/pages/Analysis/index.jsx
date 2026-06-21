import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Search, AlertTriangle, Copy, Shield, CheckCircle2, Loader2, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const STAGES = [
  { id: 'description', icon: FileText,      color: '#06B6D4', label: 'Description Analysis',        sub: 'Evaluating clarity, detail, and buyer appeal'          },
  { id: 'missing',     icon: Search,        color: '#8B5CF6', label: 'Missing Info Detection',       sub: 'Checking for incomplete or absent fields'              },
  { id: 'suspicious',  icon: AlertTriangle, color: '#F59E0B', label: 'Suspicious Content Scan',      sub: 'Scanning for fraud signals and red-flag phrases'       },
  { id: 'duplicate',   icon: Copy,          color: '#14B8A6', label: 'Duplicate Detection',          sub: 'Comparing against known marketplace listings'          },
  { id: 'trust',       icon: Shield,        color: '#22C55E', label: 'Trust Score Generation',       sub: 'Compiling weighted composite score'                    },
];

export default function AnalysisPage() {
  const navigate = useNavigate();
  const { currentListing, runAnalysis, setAnalysisResult } = useApp();
  const [currentStage, setCurrentStage] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentStage >= STAGES.length) {
      // Run the real deterministic engine once all stages are "displayed"
      const result = runAnalysis(currentListing || {});
      setAnalysisResult(result);
      setDone(true);
      return;
    }
    const timer = setTimeout(() => setCurrentStage(s => s + 1), 900 + currentStage * 150);
    return () => clearTimeout(timer);
  }, [currentStage]);

  useEffect(() => {
    if (done) setTimeout(() => navigate('/results'), 900);
  }, [done]);

  const progress = Math.round((currentStage / STAGES.length) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #06B6D4, #8B5CF6, transparent)' }} />
      </div>

      <div className="w-full max-w-xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <motion.div
            animate={{ rotate: done ? 0 : 360 }}
            transition={{ duration: 2, repeat: done ? 0 : Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary flex items-center justify-center mx-auto mb-5"
          >
            {done ? <CheckCircle2 size={28} className="text-success" /> : <Zap size={22} className="text-primary" />}
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">{done ? 'Analysis Complete' : 'Running Analysis'}</h1>
          <p className="text-sm text-muted">
            {done ? 'All engines finished. Redirecting to your report…'
                   : `Analysing: ${currentListing?.productName || 'Your listing'}`}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">Progress</span>
            <span className="text-xs font-medium text-primary">{progress}%</span>
          </div>
          <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #06B6D4, #8B5CF6)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-3">
          {STAGES.map((stage, i) => {
            const isActive   = currentStage === i;
            const isComplete = currentStage > i;
            const isPending  = currentStage < i;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  isActive   ? 'bg-white/5 border-white/12' :
                  isComplete ? 'bg-white/3 border-white/6'  : 'border-transparent'}`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: isComplete || isActive ? `${stage.color}18` : 'rgba(255,255,255,0.04)' }}>
                  {isComplete ? <CheckCircle2 size={18} style={{ color: stage.color }} />
                   : isActive  ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}><Loader2 size={18} style={{ color: stage.color }} /></motion.div>
                   : <stage.icon size={18} className="text-muted/40" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : isComplete ? 'text-white/70' : 'text-muted/40'}`}>
                    {stage.label}
                  </div>
                  <div className="text-xs text-muted/50 mt-0.5">{stage.sub}</div>
                </div>
                {isActive && (
                  <div className="flex gap-1">
                    {[0,1,2].map(dot => (
                      <motion.div key={dot} className="w-1.5 h-1.5 rounded-full" style={{ background: stage.color }}
                        animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }} />
                    ))}
                  </div>
                )}
                {isComplete && (
                  <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ color: stage.color, background: `${stage.color}15` }}>Done</motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {done && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8 p-4 rounded-xl bg-success/10 border border-success/20 text-center">
            <p className="text-sm text-success font-medium">All checks complete — loading your Trust Report</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
