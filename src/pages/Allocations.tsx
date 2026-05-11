import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, ArrowRight, Bed, Building, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const Allocations: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  
  const unassignedStudents = [
    { id: '1', name: 'James Wilson', department: 'CS', gender: 'Male' },
    { id: '2', name: 'Sarah Parker', department: 'Economics', gender: 'Female' },
    { id: '3', name: 'Daniel Craig', department: 'Physics', gender: 'Male' },
  ];

  const availableRooms = [
    { id: 'r1', number: '101', block: 'Block A', capacity: 4, occupied: 3 },
    { id: 'r2', number: '204', block: 'Block B', capacity: 4, occupied: 2 },
    { id: 'r3', number: '302', block: 'Block A', capacity: 4, occupied: 1 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Room Allocations</h1>
        <p className="text-zinc-500 mt-1">Assign students to dormitory units based on gender and capacity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Unassigned Students */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center justify-between">
              Pending Queue
              <span className="bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded text-[10px]">3 STUDENTS</span>
            </h3>
            
            <div className="space-y-3">
              {unassignedStudents.map((s) => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedStudent(s.id)}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group",
                    selectedStudent === s.id 
                      ? "bg-brand-primary border-brand-primary text-white" 
                      : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <div>
                    <p className={cn("text-sm font-semibold", selectedStudent === s.id ? "text-white" : "text-zinc-200")}>{s.name}</p>
                    <p className={cn("text-[10px] uppercase font-bold tracking-tight", selectedStudent === s.id ? "text-white/70" : "text-zinc-600")}>
                      {s.gender} • {s.department}
                    </p>
                  </div>
                  <UserPlus size={16} className={cn(selectedStudent === s.id ? "text-white" : "text-zinc-500 group-hover:text-brand-primary")} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Available Units */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Available Units</h3>
              <div className="relative">
                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                 <input 
                  type="text" 
                  placeholder="Filter by block..." 
                  className="bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-brand-primary"
                 />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableRooms.map((room) => (
                <div key={room.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-brand-primary/50 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-brand-primary transition-colors">
                        <Bed size={20} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-zinc-100">Room {room.number}</p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase">{room.block}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-zinc-300">{room.occupied} / {room.capacity}</p>
                      <p className="text-[9px] uppercase font-black text-brand-primary">Available</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(room.capacity)].map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "h-1.5 flex-1 rounded-full",
                          i < room.occupied ? "bg-zinc-700" : "bg-emerald-500/30"
                        )} 
                      />
                    ))}
                  </div>

                  <button 
                    disabled={!selectedStudent}
                    className="w-full py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Confirm Allocation
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allocations;
