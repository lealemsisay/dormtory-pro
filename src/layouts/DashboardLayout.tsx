import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Building, Bed, ClipboardList, 
  Settings, LogOut, Bell, Search, Menu, X, User, ShieldCheck,
  TrendingUp, BarChart3, Wrench
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: `/${user?.role}/dashboard`, roles: ['admin', 'staff', 'student'] },
    { label: 'Students', icon: Users, path: '/admin/students', roles: ['admin', 'staff'] },
    { label: 'Blocks', icon: Building, path: '/admin/blocks', roles: ['admin', 'staff'] },
    { label: 'Rooms', icon: Bed, path: '/admin/rooms', roles: ['admin', 'staff'] },
    { label: 'Allocations', icon: ClipboardList, path: '/admin/allocations', roles: ['admin', 'staff'] },
    { label: 'Maintenance', icon: Wrench, path: '/maintenance', roles: ['admin', 'staff', 'student'] },
    { label: 'Reports', icon: BarChart3, path: '/admin/reports', roles: ['admin'] },
    { label: 'Profile', icon: User, path: '/profile', roles: ['admin', 'staff', 'student'] },
    { label: 'Settings', icon: Settings, path: '/settings', roles: ['admin'] },
  ].filter(item => user && item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-brand-bg text-zinc-100 font-sans flex">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-[280px] border-r border-zinc-800 bg-[#111114] hidden lg:flex flex-col z-40 auth-grid-pattern overflow-hidden">
        {/* Abstract side glow */}
        <div className="absolute top-1/2 -left-20 w-40 h-80 bg-emerald-600/5 blur-[100px] pointer-events-none" />
        
        <div className="p-8 border-b border-zinc-800/50 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-emerald-600/20">
              D
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">DMS Unified</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Dilla University</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-6 overflow-y-auto relative z-10">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-zinc-800/50 relative z-10">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 h-full w-[280px] bg-brand-panel border-r border-zinc-800 z-50 lg:hidden p-6"
            >
               {/* Same items as above but for mobile */}
               <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-brand-primary rounded shadow-lg flex items-center justify-center font-bold text-white">D</div>
                   <span className="font-bold text-lg">DMS</span>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)}><X className="text-zinc-500" /></button>
               </div>
               <nav className="space-y-1">
                 {menuItems.map((item) => (
                   <Link
                     key={item.path}
                     to={item.path}
                     onClick={() => setIsSidebarOpen(false)}
                     className={cn(
                       "flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all",
                       location.pathname === item.path ? "bg-brand-primary text-white" : "text-zinc-500"
                     )}
                   >
                     <item.icon className="h-5 w-5" />
                     {item.label}
                   </Link>
                 ))}
               </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[280px] min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-zinc-800/50 bg-brand-bg/80 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-zinc-500 hover:text-white"
          >
            <Menu size={24} />
          </button>

          <div className="relative hidden md:block w-96">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-600" />
            <input 
              type="text" 
              placeholder="Search students, rooms, or maintenance..." 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-brand-primary/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-500 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-brand-bg" />
            </button>
            <div className="h-8 w-[1px] bg-zinc-800 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">{user?.fullName}</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-brand-primary">
                {user?.fullName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
