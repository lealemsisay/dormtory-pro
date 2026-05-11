import React, { useState } from 'react';
import { User, Shield, Lock, Mail, Phone, BadgeCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../services/authService';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.changePassword(newPassword);
      setMessage('Password changed successfully!');
      setNewPassword('');
    } catch (error) {
      setMessage('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Account Profile</h1>
        <p className="text-zinc-500 mt-1">Manage your identity and security settings.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-brand-primary/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-brand-primary mx-auto flex items-center justify-center text-4xl font-bold shadow-2xl mb-4">
                {user?.fullName.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{user?.fullName}</h2>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-bold">{user?.role}</p>
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-800 grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Shield size={16} className="text-brand-primary" />
                <span>Verified Resident</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <BadgeCheck size={16} className="text-green-500" />
                <span>Dilla University ID</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Lock className="text-brand-primary" size={18} />
              Security Settings
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">New Password</label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter at least 8 characters"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-brand-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
              >
                Update Password
              </button>
              {message && <p className="mt-4 text-xs font-medium text-brand-primary">{message}</p>}
            </form>
          </div>

          <div className="glass-card rounded-3xl p-8 opacity-50 cursor-not-allowed">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-zinc-400">
              <User className="text-zinc-600" size={18} />
              Academic Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Department</p>
                <p className="text-sm">Software Engineering</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Campus</p>
                <p className="text-sm">Main Campus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
