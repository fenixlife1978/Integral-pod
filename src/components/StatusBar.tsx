import React, { useState, useEffect } from 'react';
import { User, ShieldCheck } from 'lucide-react';

interface StatusBarProps {
  currentUser?: string;
  cashRegister?: string;
  databaseStatus?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  currentUser = 'Administrador',
  cashRegister = 'Caja 01',
  databaseStatus = 'Conectado a Turso'
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format: 08/10/2026 and 17:42
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      setDateStr(`${day}/${month}/${year}`);
      setTimeStr(`${hours}:${minutes}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-6 bg-[#dbe6f5] border-t border-[#8faecf] px-2 flex items-center justify-between text-[11px] text-slate-800 select-none shrink-0 font-sans shadow-xs">
      {/* Left Inset Segments */}
      <div className="flex items-center space-x-1 h-4.5">
        {/* User Segment */}
        <div className="h-full px-2 bg-gradient-to-b from-[#eaf2fa] to-[#d6e3f2] border-t border-l border-[#7f9db9] border-b border-r border-white rounded-[2px] flex items-center space-x-1.5 shadow-inner">
          <User className="w-3 h-3 text-slate-600" />
          <span className="font-semibold text-slate-800">{currentUser}</span>
        </div>

        {/* Cash Register Segment */}
        <div className="h-full px-2.5 bg-gradient-to-b from-[#eaf2fa] to-[#d6e3f2] border-t border-l border-[#7f9db9] border-b border-r border-white rounded-[2px] flex items-center shadow-inner font-semibold text-slate-800">
          {cashRegister}
        </div>

        {/* Database Connection Status Segment */}
        <div className="h-full px-2 bg-gradient-to-b from-[#eaf2fa] to-[#d6e3f2] border-t border-l border-[#7f9db9] border-b border-r border-white rounded-[2px] flex items-center space-x-1.5 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.9)]" />
          <span className="font-medium text-slate-800">{databaseStatus}</span>
        </div>
      </div>

      {/* Right Date and Time Segment */}
      <div className="flex items-center space-x-1 h-4.5">
        <div className="h-full px-2.5 bg-gradient-to-b from-[#eaf2fa] to-[#d6e3f2] border-t border-l border-[#7f9db9] border-b border-r border-white rounded-[2px] flex items-center space-x-2 shadow-inner font-medium text-slate-800">
          <span>{dateStr || '08/10/2026'}</span>
          <span className="text-slate-400">|</span>
          <span className="font-bold">{timeStr || '17:42'}</span>
        </div>
      </div>
    </div>
  );
};
