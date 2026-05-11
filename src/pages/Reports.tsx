import React from 'react';
import { BarChart3, PieChart, TrendingUp, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart as RePieChart, Pie } from 'recharts';

const data = [
  { name: 'Block A', occupants: 400, capacity: 480 },
  { name: 'Block B', occupants: 300, capacity: 480 },
  { name: 'Block C', occupants: 200, capacity: 384 },
  { name: 'Block D', occupants: 450, capacity: 600 },
];

const pieData = [
  { name: 'Allocated', value: 3400 },
  { name: 'Available', value: 400 },
  { name: 'Maintenance', value: 120 },
];

const COLORS = ['#10b981', '#14b8a6', '#ef4444'];

const Reports: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Institutional Analytics</h1>
          <p className="text-zinc-500 mt-1">Real-time occupancy and residential metrics for Dilla University.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-300 hover:bg-zinc-800 transition-all">
          <Download size={16} />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
        <div className="glass-card rounded-3xl p-8">
           <h3 className="font-semibold mb-8 flex items-center gap-2">
             <BarChart3 className="text-brand-primary" size={18} />
             Block Distribution
           </h3>
           <div className="h-full pb-16">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#111114', border: '1px solid #27272a', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="occupants" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="capacity" fill="#27272a" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="glass-card rounded-3xl p-8 flex flex-col">
           <h3 className="font-semibold mb-8 flex items-center gap-2">
             <PieChart className="text-brand-primary" size={18} />
             Overall Capacity Status
           </h3>
           <div className="flex-1 flex items-center gap-8">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-xs text-zinc-400">{item.name}</span>
                    <span className="text-xs font-bold text-zinc-200 ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
