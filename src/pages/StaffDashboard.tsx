import React from 'react';
import { ClipboardList, Bed, Users, Search, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Registrar Dashboard</h1>
        <p className="text-zinc-500 mt-1">Operational gateway for student registry and dormitory logistics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-brand-primary">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Pending Applications</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">12</h3>
            <AlertCircle className="text-brand-primary" size={20} />
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-green-500">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Allocated Today</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">48</h3>
            <CheckCircle2 className="text-green-500" size={20} />
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-yellow-500">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Waitlisted</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">156</h3>
            <Clock className="text-yellow-500" size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
              <ClipboardList className="text-brand-primary" size={18} />
              Incoming Queue
            </h3>
            <button className="text-[10px] font-bold text-brand-primary hover:underline">VIEW ALL</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary font-bold">
                    {i}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-zinc-200">Registration #{1000 + i}</p>
                    <p className="text-xs text-zinc-500">Submitted 2 hours ago • New Student</p>
                  </div>
                </div>
                <button className="px-5 py-2 text-xs font-semibold text-white bg-brand-primary rounded-lg hover:bg-emerald-500 transition-all">Verify</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h3 className="font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <Bed className="text-brand-primary" size={18} />
            Quick Room Status
          </h3>
          <div className="space-y-4 text-sm mt-4">
            {['Block A', 'Block B', 'Block C'].map(block => (
              <div key={block} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">{block} Capacity</span>
                  <span className="text-zinc-200 font-bold">94%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary" style={{ width: '94%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
