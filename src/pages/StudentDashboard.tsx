import React from 'react';
import { Home, Wrench, FileText, User, Bell, MapPin, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all duration-500" />
            <div className="h-24 w-24 rounded-2xl bg-brand-primary relative flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
              {user?.fullName.charAt(0)}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-semibold text-white tracking-tight">{user?.fullName}</h1>
            <p className="text-zinc-500 mt-1 flex items-center gap-2 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Resident Student • SE Department
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-all">
            <Bell size={18} />
            Alerts
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Room Info */}
        <section className="glass-card rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-primary/10 blur-[80px] pointer-events-none group-hover:bg-brand-primary/20 transition-all" />
          <div className="flex items-center gap-3 mb-8">
            <Home className="h-6 w-6 text-brand-primary" />
            <h2 className="text-xl font-semibold text-zinc-100">Dormitory Assignment</h2>
          </div>
          
          <div className="flex justify-between items-center bg-black/40 p-8 rounded-2xl border border-zinc-800 shadow-inner">
            <div className="text-center px-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Block</p>
              <p className="text-4xl font-black text-brand-primary">A</p>
            </div>
            <div className="h-16 w-[1px] bg-zinc-800" />
            <div className="text-center px-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Room</p>
              <p className="text-4xl font-black text-zinc-100">402</p>
            </div>
            <div className="h-16 w-[1px] bg-zinc-800" />
            <div className="text-center px-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Bed</p>
              <p className="text-4xl font-black text-zinc-100">02</p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-4 bg-brand-primary text-white text-sm font-bold rounded-xl shadow-xl shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <Key size={18} />
              Digital Key
            </button>
            <button className="flex items-center justify-center gap-2 py-4 bg-zinc-800 text-zinc-200 text-sm font-bold rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700">
              <MapPin size={18} />
              Roomies
            </button>
          </div>
        </section>

        {/* Resident Services */}
        <section className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="h-6 w-6 text-brand-primary" />
            <h2 className="text-xl font-semibold text-zinc-100">Resident Services</h2>
          </div>
          
          <div className="space-y-4">
            <button className="flex w-full items-center gap-5 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-brand-primary/50 group transition-all">
              <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-brand-primary/10 transition-colors">
                <Wrench className="h-6 w-6 text-brand-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-zinc-100">Maintenance Request</p>
                <p className="text-xs text-zinc-500 mt-0.5">Report failures or damage in your unit.</p>
              </div>
            </button>

            <button className="flex w-full items-center gap-5 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-brand-primary/50 group transition-all">
              <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-brand-primary/10 transition-colors">
                <FileText className="h-6 w-6 text-brand-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-zinc-100">Academic Clearance</p>
                <p className="text-xs text-zinc-500 mt-0.5">Start your end-of-semester exit process.</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
