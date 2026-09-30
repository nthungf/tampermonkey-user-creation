import React, { useState } from 'react';
import { Zap, LayoutDashboard, RefreshCw, Copy, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: RefreshCw, label: 'CP Unit Sync', id: 'sync' },
  { icon: Copy, label: 'Budget Cloner', id: 'budget' },
  { icon: Users, label: 'User Bot', id: 'users' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('dashboard');

  return (
    <aside 
      className={cn(
        "h-screen flex flex-col bg-white/70 backdrop-blur-2xl border-r border-slate-200 shadow-2xl transition-all duration-300 relative z-50",
        collapsed ? "w-[88px]" : "w-[280px]"
      )}
    >
      {/* Header: High-contrast "Zap" logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-200/50">
        <div className="flex items-center gap-3 w-full bg-slate-950 text-white p-3 rounded-lg justify-center shadow-inner">
          <Zap size={20} className="text-blue-500 fill-blue-500" />
          {!collapsed && <span className="font-black tracking-widest uppercase text-xs">Zap Hub</span>}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 bg-slate-950 text-white rounded-full p-1.5 hover:scale-[1.1] active:scale-95 transition-transform shadow-xl"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95",
                isActive 
                  ? "bg-slate-950 text-white shadow-lg" // Inverse theme for maximum visibility
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
              {!collapsed && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer: Persistent Versioning & Badges */}
      <div className="p-5 border-t border-slate-200/50">
        <div className={cn(
          "flex flex-col items-center gap-3",
          !collapsed && "flex-row justify-between"
        )}>
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-md border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
            {!collapsed && <span className="text-[10px] uppercase tracking-widest font-black text-slate-600">STABLE-PRO</span>}
          </div>
          {!collapsed && <span className="text-[10px] font-bold tracking-widest text-slate-400">G2.0.0</span>}
        </div>
      </div>
    </aside>
  );
}