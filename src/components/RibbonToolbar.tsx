import React from 'react';
import {
  Home,
  Monitor,
  Car,
  Box,
  Package,
  ShoppingCart,
  Users,
  Building2,
  BadgeDollarSign,
  Receipt,
  FileSpreadsheet,
  Settings,
  Cog,
  Wrench
} from 'lucide-react';

interface RibbonToolbarProps {
  currentModule: string;
  onSelectModule: (module: string) => void;
}

export const RibbonToolbar: React.FC<RibbonToolbarProps> = ({
  currentModule,
  onSelectModule
}) => {
  const tools = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-red-100 to-red-200 border border-red-300 flex items-center justify-center shadow-xs">
          <Home className="w-5 h-5 text-red-600 fill-red-400/20" />
        </div>
      )
    },
    {
      id: 'pos',
      label: 'POS',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-400 flex items-center justify-center shadow-xs">
          {/* Cashier / POS counter icon */}
          <div className="relative">
            <Monitor className="w-5 h-5 text-blue-900" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
          </div>
        </div>
      )
    },
    {
      id: 'catalogo',
      label: 'Catálogo',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-100 to-sky-200 border border-sky-300 flex items-center justify-center shadow-xs">
          <Car className="w-5 h-5 text-blue-600" />
        </div>
      )
    },
    {
      id: 'repuestos',
      label: 'Repuestos',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex items-center justify-center shadow-xs">
          <Box className="w-5 h-5 text-slate-700" />
        </div>
      )
    },
    {
      id: 'inventario',
      label: 'Inventario',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-100 to-yellow-200 border border-amber-300 flex items-center justify-center shadow-xs">
          <Package className="w-5 h-5 text-amber-700 fill-amber-300/40" />
        </div>
      )
    },
    {
      id: 'compras',
      label: 'Compras',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-100 to-indigo-200 border border-indigo-300 flex items-center justify-center shadow-xs">
          <ShoppingCart className="w-5 h-5 text-indigo-600" />
        </div>
      )
    },
    {
      id: 'clientes',
      label: 'Clientes',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-100 to-sky-200 border border-sky-300 flex items-center justify-center shadow-xs">
          <Users className="w-5 h-5 text-sky-700 fill-sky-200/50" />
        </div>
      )
    },
    {
      id: 'proveedores',
      label: 'Proveedores',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-300 flex items-center justify-center shadow-xs">
          <Building2 className="w-5 h-5 text-orange-700" />
        </div>
      )
    },
    {
      id: 'cxc',
      label: 'CxC',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-100 to-green-200 border border-emerald-300 flex items-center justify-center shadow-xs">
          <BadgeDollarSign className="w-5 h-5 text-emerald-700 fill-emerald-200/50" />
        </div>
      )
    },
    {
      id: 'cxp',
      label: 'CxP',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-100 to-cyan-200 border border-cyan-300 flex items-center justify-center shadow-xs">
          <Receipt className="w-5 h-5 text-cyan-700" />
        </div>
      )
    },
    {
      id: 'reportes',
      label: 'Reportes',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-100 to-blue-200 border border-blue-300 flex items-center justify-center shadow-xs">
          <FileSpreadsheet className="w-5 h-5 text-blue-700" />
        </div>
      )
    },
    {
      id: 'sistema',
      label: 'Sistema',
      icon: (
        <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-200 to-slate-300 border border-slate-400 flex items-center justify-center shadow-xs">
          <Settings className="w-5 h-5 text-slate-700" />
        </div>
      )
    }
  ];

  return (
    <div className="h-16 bg-gradient-to-b from-[#e3edf7] via-[#d1e1f2] to-[#b9d2eb] border-b border-[#8ba6c9] px-2 flex items-center justify-between select-none shadow-xs overflow-x-auto relative">
      {/* Subtle top light sheen */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/70 pointer-events-none" />

      {/* Button Ribbon */}
      <div className="flex items-center space-x-1 py-1">
        {tools.map((tool) => {
          const isSelected = currentModule === tool.id;

          if (isSelected) {
            // Selected active POS button as in the image (yellow/gold background, blue border)
            return (
              <button
                key={tool.id}
                onClick={() => onSelectModule(tool.id)}
                className="flex flex-col items-center justify-center w-14 h-13 rounded-[3px] bg-gradient-to-b from-[#ffea75] via-[#ffdf4a] to-[#f4c62b] border-[1.5px] border-[#005bb5] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.15)] transition-all cursor-pointer relative"
              >
                <div className="scale-95">{tool.icon}</div>
                <span className="text-[10.5px] font-bold text-slate-900 tracking-tight leading-tight mt-0.5">
                  {tool.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tool.id}
              onClick={() => onSelectModule(tool.id)}
              className="flex flex-col items-center justify-center w-14 h-13 rounded-[3px] border border-transparent hover:border-[#7fa2cb] hover:bg-gradient-to-b hover:from-white/80 hover:to-[#dce8f5] active:bg-[#c4daf0] active:translate-y-[0.5px] transition-all cursor-pointer group"
            >
              <div className="scale-95 group-hover:scale-100 transition-transform">
                {tool.icon}
              </div>
              <span className="text-[10px] font-medium text-slate-800 tracking-tight leading-tight mt-0.5 group-hover:text-blue-900">
                {tool.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right side: SIFER-360 Logo Banner */}
      <div className="flex items-center pl-3 shrink-0">
        <div className="h-12 bg-gradient-to-r from-[#003d7c] via-[#044c9b] to-[#012d5e] rounded-md px-3.5 flex items-center space-x-2.5 border border-[#002654] shadow-md shadow-blue-950/20">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative">
            <Cog className="w-6 h-6 text-white animate-[spin_12s_linear_infinite]" />
            <Wrench className="w-3.5 h-3.5 text-cyan-300 absolute" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-extrabold text-base tracking-wider leading-none drop-shadow-sm font-sans">
              SIFER-360
            </span>
            <span className="text-[10px] text-sky-200/90 font-medium tracking-tight italic mt-0.5">
              Tu taller, en buenas manos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
