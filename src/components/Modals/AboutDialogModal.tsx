import React from 'react';
import { Cog, Wrench, Shield, X, Check } from 'lucide-react';

interface AboutDialogModalProps {
  onClose: () => void;
}

export const AboutDialogModal: React.FC<AboutDialogModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col text-xs animate-in zoom-in-95">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244]">
          <span className="font-bold tracking-tight">Acerca de SIFER-360</span>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 bg-[#f4f8fd] space-y-3">
          <div className="flex items-center space-x-3.5 border-b pb-3 border-[#cadcee]">
            <div className="w-12 h-12 rounded bg-gradient-to-br from-[#003d7c] to-[#044c9b] border border-[#002654] flex items-center justify-center relative shadow-md">
              <Cog className="w-8 h-8 text-white animate-[spin_10s_linear_infinite]" />
              <Wrench className="w-4 h-4 text-cyan-300 absolute" />
            </div>
            <div>
              <div className="font-black text-slate-900 text-base leading-none">SIFER-360 A2</div>
              <div className="text-[11px] text-slate-600 font-medium mt-1">
                Sistema Integral de Ferretería y Repuestos Automotrices
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Versión 2026.4.12 (Edición Profesional)</div>
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-slate-700 bg-white p-2.5 border border-[#a2bfde] rounded-[2px]">
            <div>• <span className="font-bold">Motor de Base de Datos:</span> Turso LibSQL Cloud + VFS Local Cache</div>
            <div>• <span className="font-bold">Módulo de Seguridad:</span> Cifrado AES-256-GCM para Almacenamiento Protegido</div>
            <div>• <span className="font-bold">Soporte Técnico:</span> Red Nacional de Talleres SIFER-360</div>
            <div>• <span className="font-bold">Licencia Asignada:</span> SIFER-ENT-CARABOBO-2026-9041</div>
          </div>

          <div className="text-[10.5px] text-slate-500 text-center">
            © 2026 SIFER-360 Automotriz C.A. Todos los derechos reservados.
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={onClose}
              className="h-6.5 px-5 bg-gradient-to-b from-[#1975d2] to-[#125ea8] text-white border border-[#0d4e91] rounded-[2px] font-bold cursor-pointer"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
