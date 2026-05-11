import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login({ userId, password });
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      navigate(`/${user.role}/dashboard`, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#09090b] overflow-hidden">
      {/* Brand Sidebar (Visible on Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#111114] border-r border-zinc-800 flex-col p-16 justify-between auth-grid-pattern">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 blur-[120px] pointer-events-none" />
        
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-3xl text-white shadow-2xl shadow-emerald-600/30">
            D
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-zinc-100">DMS Unified</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Dilla University</span>
          </div>
        </div>

        <div className="relative max-w-lg space-y-6 text-left">
          <h1 className="text-5xl font-light tracking-tight text-white leading-tight">
            The next generation of <span className="text-emerald-500 font-medium italic">campus living</span>.
          </h1>
          <div className="w-20 h-1 bg-emerald-600 rounded-full" />
          <p className="text-zinc-500 text-lg leading-relaxed">
            A centralized, intelligent dormitory management ecosystem designed for modern academic institutions. 
            Seamless allocation, real-time maintenance, and administrative precision.
          </p>
          
          <div className="flex gap-4 pt-4">
            <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-medium text-zinc-400">Production v1.02</div>
            <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-medium text-zinc-400">Institutional Cloud</div>
          </div>
        </div>

        <div className="relative text-zinc-600 text-xs flex items-center gap-6">
          <span>&copy; 2026 Dilla University</span>
          <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">System Status</a>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-[#09090b] relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">D</div>
            <span className="font-bold text-xl tracking-tight text-white">DMS Unified</span>
          </div>

          <div className="space-y-2 mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">System Portal</h2>
            <p className="text-zinc-500">Authorize your session to access the management panel.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest text-left">Identification ID</label>
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="RNS-XXXXX/XX or Registrar ID"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-600/5 transition-all"
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Secret Key</label>
                  <button type="button" className="text-[10px] font-semibold text-emerald-500 hover:underline">FORGOT?</button>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-600/5 transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white rounded-xl py-4 font-semibold text-sm transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Authenticate Session
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Role Redirection Info Box */}
          <div className="mt-12 p-5 bg-zinc-900/50 rounded-2xl border border-zinc-800 flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center shrink-0">
               <Info className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-300">Intelligent Role Routing</p>
              <p className="text-[11px] leading-relaxed text-zinc-500 mt-1">The system automatically detects your institutional profile and redirects you to the appropriate operational dashboard.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 font-bold">Encrypted Institutional Channel</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
