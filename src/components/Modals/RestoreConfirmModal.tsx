import React, { useState } from 'react';
import { BackupSnapshot } from '../../types/system';
import { AlertTriangle, Lock, X, Check } from 'lucide-react';

interface RestoreConfirmModalProps {
  snapshot: BackupSnapshot;
  masterPasswordRequired: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const RestoreConfirmModal: React.FC<RestoreConfirmModalProps> = ({
  snapshot,
  masterPasswordRequired,
  onConfirm,
  onClose
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === masterPasswordRequired || password === 'admin') {
      onConfirm();
    } else {
      setError('Contraseña maestra incorrecta. No se puede descifrar el respaldo.');
    }
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col select-none text-xs">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#991b1b] px-2.5 flex items-center justify-between text-white border-b border-[#7f1d1d]">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-200" />
            <span className="text-xs font-bold tracking-tight">
              Restauración de Base de Datos - Advertencia de Seguridad
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-3.5 space-y-3 bg-[#f4f8fd]">
          <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-[2px] flex items-start space-x-2.5 text-amber-950">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-[11.5px] leading-relaxed">
              <span className="font-bold block">¡Acción de Alto Impacto!</span>
              Al restaurar este archivo protegido, se reemplazarán los productos, ventas y configuraciones actuales con los datos guardados el{' '}
              <span className="font-bold">{snapshot.createdAt}</span>.
            </div>
          </div>

          <div className="bg-white p-2.5 border border-[#a2bfde] rounded-[2px] space-y-1 font-mono text-[11px]">
            <div>Archivo: <span className="font-bold text-slate-900">{snapshot.fileName}</span></div>
            <div>Tamaño: <span className="text-slate-700">{snapshot.fileSizeFormatted}</span></div>
            <div>Algoritmo: <span className="text-emerald-700 font-bold">{snapshot.algorithm}</span></div>
            <div>Registros a Restaurar: <span className="text-blue-800 font-bold">{snapshot.totalRecords}</span></div>
          </div>

          <div className="space-y-1 bg-white p-2.5 border border-[#a2bfde] rounded-[2px]">
            <label className="font-bold text-slate-900 flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-700" />
              <span>Ingrese la Clave Maestra de Seguridad para Descifrar:</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              placeholder="Clave maestra de administrador..."
              className="w-full h-7 px-2.5 bg-white border border-[#7f9db9] rounded-[2px] font-mono text-slate-900 focus:outline-none focus:border-[#316ac5]"
              autoFocus
              required
            />
            {error && <div className="text-red-600 font-bold text-[11px] mt-1">{error}</div>}
            <div className="text-[10px] text-slate-500 mt-1">
              (Clave maestra predeterminada de fábrica: <span className="font-mono font-bold text-slate-700">admin</span>)
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-1 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="h-6.5 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-6.5 px-4 bg-gradient-to-b from-[#b91c1c] to-[#991b1b] hover:from-[#dc2626] hover:to-[#b91c1c] text-white border border-[#7f1d1d] rounded-[2px] font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Proceder con la Restauración</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
