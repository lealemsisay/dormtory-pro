import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, MoreVertical, Edit2, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface Student {
  id: string;
  fullName: string;
  admission_number: string;
  registrar_id: string;
  department: string;
  gender: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for display
  const students: Student[] = [
    { id: '1', fullName: 'Abebe Kebede', admission_number: '12345', registrar_id: 'RNS-0012/23', department: 'Software Engineering', gender: 'Male', status: 'Active' },
    { id: '2', fullName: 'Hirut Belay', admission_number: '12346', registrar_id: 'RSS-0056/23', department: 'Computer Science', gender: 'Female', status: 'Active' },
    { id: '3', fullName: 'Dawit Solomon', admission_number: '12347', registrar_id: 'RNS-0089/23', department: 'Electrical Engineering', gender: 'Male', status: 'Pending' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Student Directory</h1>
          <p className="text-zinc-500 mt-1">Manage and monitor Dilla University student residents.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-primary hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20">
          <Plus size={18} />
          Register Student
        </button>
      </div>

      {/* Filters & Search */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-600 group-focus-within:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by ID, Name, or Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary"
          />
        </div>
        <button className="flex items-center gap-2 bg-zinc-800 text-zinc-300 px-4 py-2.5 rounded-xl text-sm font-medium border border-zinc-700 hover:bg-zinc-700 transition-all">
          <Filter size={18} />
          Advanced Filters
        </button>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-zinc-800/50 border-b border-zinc-800">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Student Info</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Registry ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Department</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-sm">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                        {student.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{student.fullName}</p>
                        <p className="text-[10px] text-zinc-500">ADM: {student.admission_number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-400">{student.registrar_id}</td>
                  <td className="px-6 py-4 text-zinc-400">{student.department}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      student.status === 'Active' ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"><Edit2 size={16} /></button>
                       <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-zinc-800/20 p-4 border-t border-zinc-800 flex items-center justify-between">
          <p className="text-xs text-zinc-500">Showing 1 to 3 of 4,822 students</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-xs bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all">Previous</button>
            <button className="px-4 py-1.5 text-xs bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
