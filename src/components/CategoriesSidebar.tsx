import React from 'react';
import { CATEGORIES } from '../data/mockData';
import {
  Globe,
  Cpu,
  Disc,
  GitCommit,
  Zap,
  Activity,
  Filter,
  Droplet,
  FlaskConical,
  BatteryCharging,
  CircleDot,
  Car,
  Wrench,
  Sparkles
} from 'lucide-react';

interface CategoriesSidebarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  productCounts?: Record<string, number>;
}

export const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  productCounts = {}
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'globe':
        return (
          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
            <Globe className="w-3.5 h-3.5" />
          </div>
        );
      case 'engine':
        return (
          <div className="w-5 h-5 rounded bg-slate-700 text-amber-400 flex items-center justify-center shadow-xs">
            <Cpu className="w-3.5 h-3.5" />
          </div>
        );
      case 'disc':
        return (
          <div className="w-5 h-5 rounded-full bg-slate-600 text-white flex items-center justify-center shadow-xs">
            <Disc className="w-3.5 h-3.5" />
          </div>
        );
      case 'spring':
        return (
          <div className="w-5 h-5 rounded bg-sky-700 text-sky-200 flex items-center justify-center shadow-xs">
            <GitCommit className="w-3.5 h-3.5" />
          </div>
        );
      case 'gearbox':
        return (
          <div className="w-5 h-5 rounded bg-indigo-700 text-white flex items-center justify-center shadow-xs">
            <Activity className="w-3.5 h-3.5" />
          </div>
        );
      case 'bolt':
        return (
          <div className="w-5 h-5 rounded bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
        );
      case 'sensor':
        return (
          <div className="w-5 h-5 rounded bg-blue-600 text-cyan-200 flex items-center justify-center shadow-xs">
            <Activity className="w-3.5 h-3.5" />
          </div>
        );
      case 'filter':
        return (
          <div className="w-5 h-5 rounded bg-slate-800 text-amber-300 flex items-center justify-center shadow-xs">
            <Filter className="w-3.5 h-3.5" />
          </div>
        );
      case 'oil':
        return (
          <div className="w-5 h-5 rounded bg-amber-500 text-amber-950 flex items-center justify-center shadow-xs">
            <Droplet className="w-3.5 h-3.5 fill-current" />
          </div>
        );
      case 'coolant':
        return (
          <div className="w-5 h-5 rounded bg-cyan-500 text-cyan-950 flex items-center justify-center shadow-xs">
            <FlaskConical className="w-3.5 h-3.5" />
          </div>
        );
      case 'battery':
        return (
          <div className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <BatteryCharging className="w-3.5 h-3.5" />
          </div>
        );
      case 'tire':
        return (
          <div className="w-5 h-5 rounded-full bg-slate-900 text-slate-300 flex items-center justify-center shadow-xs">
            <CircleDot className="w-3.5 h-3.5" />
          </div>
        );
      case 'car':
        return (
          <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Car className="w-3.5 h-3.5" />
          </div>
        );
      case 'wrench':
        return (
          <div className="w-5 h-5 rounded bg-slate-600 text-amber-200 flex items-center justify-center shadow-xs">
            <Wrench className="w-3.5 h-3.5" />
          </div>
        );
      case 'flask':
        return (
          <div className="w-5 h-5 rounded bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        );
      default:
        return <Globe className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="w-56 shrink-0 flex flex-col bg-[#e8f1fb] border-r border-[#8faecf] select-none h-full overflow-hidden">
      {/* Header Bar */}
      <div className="h-7 bg-gradient-to-r from-[#074b96] via-[#095ebc] to-[#043d7c] px-3 flex items-center justify-between text-white border-b border-[#043265] shadow-xs">
        <span className="text-xs font-bold tracking-tight">Categorías</span>
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto p-1 space-y-[1px] bg-[#f2f7fc]">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-[2px] text-left text-xs transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#1975d2] to-[#125ea8] text-white font-semibold shadow-xs border border-[#0d4e91]'
                  : 'text-slate-800 hover:bg-[#d8e6f7] hover:text-blue-900 border border-transparent'
              }`}
            >
              <div className="shrink-0">{getCategoryIcon(cat.iconName)}</div>
              <span className="truncate flex-1">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
