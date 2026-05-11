import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Plus, Users, LayoutGrid, List } from 'lucide-react';
import { cn } from '../lib/utils';

const Blocks: React.FC = () => {
  const blocks = [
    { name: 'Block A', rooms: 120, capacity: 480, occupancy: 462, gender: 'Male', status: 'Optimal' },
    { name: 'Block B', rooms: 120, capacity: 480, occupancy: 478, gender: 'Female', status: 'Near Full' },
    { name: 'Block C', rooms: 96, capacity: 384, occupancy: 320, gender: 'Male', status: 'Available' },
    { name: 'Block D', rooms: 150, capacity: 600, occupancy: 120, gender: 'Female', status: 'New' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Residential Blocks</h1>
          <p className="text-zinc-500 mt-1">Strategic overview of dormitory capacity and distributions.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-zinc-800 text-zinc-300 px-5 py-2.5 rounded-xl text-sm font-semibold border border-zinc-700 hover:bg-zinc-700 transition-all">
             Import Excel
           </button>
           <button className="flex items-center gap-2 bg-brand-primary hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20">
             <Plus size={18} />
             Add Block
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blocks.map((block) => (
          <motion.div 
            whileHover={{ y: -4 }}
            key={block.name} 
            className="glass-card rounded-2xl p-6 group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-brand-primary/10 rounded-xl group-hover:bg-brand-primary transition-colors">
                <Building className="h-6 w-6 text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                block.gender === 'Male' ? "bg-blue-500/10 text-blue-400" : "bg-pink-500/10 text-pink-400"
              )}>
                {block.gender}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-zinc-100">{block.name}</h3>
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Occupancy</span>
                <span className="text-zinc-200 font-medium">{block.occupancy} / {block.capacity}</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    (block.occupancy / block.capacity) > 0.9 ? "bg-red-500" : "bg-brand-primary"
                  )}
                  style={{ width: `${(block.occupancy / block.capacity) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">{block.rooms} Rooms</span>
                <span className="text-[10px] font-bold text-green-400">{block.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blocks;
