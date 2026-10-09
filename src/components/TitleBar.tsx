import React, { useState } from 'react';
import { Shield, Minus, Square, X, Wrench, Settings } from 'lucide-react';

interface TitleBarProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ onMinimize, onMaximize, onClose }) => {
  const [isMaximized, setIsMaximized] = useState(true);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  return (
    <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] flex items-center justify-between px-2 text-white select-none border-b border-[#002244] shadow-sm relative z-30">
      {/* Top subtle highlight reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30 pointer-events-none" />

      {/* Left Icon and Title */}
      <div className="flex items-center space-x-2 overflow-hidden">
        <div className="w-4 h-4 rounded bg-[#0a458f] border border-cyan-300/40 flex items-center justify-center shadow-inner">
          <Shield className="w-3 h-3 text-cyan-200 fill-cyan-400/30" />
        </div>
        <span className="text-xs font-bold tracking-tight text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] truncate">
          SIFER-360 - Sistema Integral de Ferretería y Repuestos Automotrices
        </span>
      </div>

      {/* Right Title and Windows Controls */}
      <div className="flex items-center space-x-3">
        <span className="text-[11px] font-semibold text-sky-100/90 tracking-wide hidden sm:inline">
          POS - Punto de Venta
        </span>

        {/* Windows 7 / XP Classic Window Controls */}
        <div className="flex items-center space-x-[2px]">
          {/* Minimize */}
          <button
            onClick={onMinimize}
            title="Minimizar"
            className="w-5 h-4.5 bg-gradient-to-b from-[#bcd6f5] to-[#7fa4d4] hover:from-[#d6e7fa] hover:to-[#9cbce5] border border-[#507ca8] rounded-[2px] flex items-center justify-center text-slate-800 shadow-sm active:translate-y-[1px]"
          >
            <div className="w-2.5 h-[2px] bg-slate-900 mt-2" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={toggleMaximize}
            title={isMaximized ? "Restaurar" : "Maximizar"}
            className="w-5 h-4.5 bg-gradient-to-b from-[#bcd6f5] to-[#7fa4d4] hover:from-[#d6e7fa] hover:to-[#9cbce5] border border-[#507ca8] rounded-[2px] flex items-center justify-center text-slate-800 shadow-sm active:translate-y-[1px]"
          >
            <div className="w-2.5 h-2.5 border-[1.5px] border-slate-900 rounded-[1px]" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            title="Cerrar"
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white shadow-sm active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
