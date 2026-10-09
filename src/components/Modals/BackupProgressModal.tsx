import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

interface BackupProgressModalProps {
  onComplete: () => void;
  mode?: 'backup' | 'restore';
  fileName?: string;
}

export const BackupProgressModal: React.FC<BackupProgressModalProps> = ({
  onComplete,
  mode = 'backup',
  fileName = 'SIFER360_TURSO_PROD_AUTO.sifer.aes'
}) => {
  const [progress, setProgress] = useState(5);
  const [currentStep, setCurrentStep] = useState(
    mode === 'backup'
      ? 'Iniciando conexión segura con el motor de base de datos Turso...'
      : 'Verificando firma digital y clave maestra...'
  );
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const steps =
      mode === 'backup'
        ? [
            { pct: 15, msg: 'Conectando con Turso Database Engine (Local SQLite Cache)...' },
            { pct: 35, msg: 'Extrayendo tablas [productos], [familias], [referencias_cruzadas]...' },
            { pct: 55, msg: 'Volcando registros de [ventas], [facturas], [clientes] y [caja_01]...' },
            { pct: 75, msg: 'Generando suma de verificación SHA-256 de consistencia de datos...' },
            { pct: 90, msg: 'Aplicando cifrado de alta seguridad AES-256-GCM con clave protegida...' },
            { pct: 100, msg: '¡Respaldo almacenado exitosamente en directorio local protegido!' }
          ]
        : [
            { pct: 20, msg: 'Descifrando archivo respaldado con clave maestra AES-256...' },
            { pct: 45, msg: 'Validando integridad de suma hash SHA-256...' },
            { pct: 70, msg: 'Restaurando esquema de tablas y consistencia de llaves foráneas...' },
            { pct: 90, msg: 'Insertando registros de productos, inventario y ventas...' },
            { pct: 100, msg: '¡Base de datos restaurada correctamente a su estado anterior!' }
          ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < steps.length) {
        setProgress(steps[currentIdx].pct);
        setCurrentStep(steps[currentIdx].msg);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsFinished(true);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col select-none text-xs">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center space-x-2 text-white border-b border-[#002244]">
          <Database className="w-4 h-4 text-cyan-200" />
          <span className="text-xs font-bold tracking-tight">
            {mode === 'backup'
              ? 'Procesando Respaldo Seguro de Base de Datos'
              : 'Restaurando Base de Datos'}
          </span>
        </div>

        {/* Body */}
        <div className="p-4 bg-[#f4f8fd] space-y-3.5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center shrink-0">
              {isFinished ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-in zoom-in-50" />
              ) : (
                <Lock className="w-5 h-5 text-blue-700 animate-pulse" />
              )}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">
                {isFinished
                  ? mode === 'backup'
                    ? 'Respaldo Generado con Éxito'
                    : 'Restauración Completada'
                  : mode === 'backup'
                  ? 'Generando Respaldo Protegido...'
                  : 'Restaurando Base de Datos...'}
              </div>
              <div className="text-[11px] text-slate-500 font-mono truncate max-w-[280px]">
                {fileName}
              </div>
            </div>
          </div>

          {/* Windows Classic Progress Bar */}
          <div className="space-y-1">
            <div className="h-5 bg-white border border-[#7f9db9] rounded-[2px] p-[2px] overflow-hidden shadow-inner flex">
              <div
                className="h-full bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-[#15803d] rounded-[1px] transition-all duration-300 flex items-center justify-end pr-1 text-[10px] text-white font-mono font-bold"
                style={{ width: `${progress}%` }}
              >
                {progress > 15 && `${progress}%`}
              </div>
            </div>
            <div className="text-[11px] text-slate-700 font-medium h-4 truncate">
              {currentStep}
            </div>
          </div>

          <div className="bg-white p-2 border border-[#a2bfde] rounded-[2px] text-[10.5px] text-slate-600 space-y-0.5 font-mono">
            <div>Motor: <span className="text-slate-900 font-bold">Turso Cloud + SQLite Local VFS</span></div>
            <div>Cifrado: <span className="text-emerald-700 font-bold">AES-256-GCM Hardware Accelerated</span></div>
            <div>Destino: <span className="text-blue-800">C:\SIFER360\Backups\AlmacenamientoProtegido</span></div>
          </div>

          {/* Action button when done */}
          {isFinished && (
            <div className="pt-1 flex justify-end">
              <button
                onClick={onComplete}
                className="h-7 px-5 bg-gradient-to-b from-[#1975d2] to-[#125ea8] hover:from-[#2185ec] hover:to-[#176bbd] text-white border border-[#0d4e91] rounded-[2px] font-bold cursor-pointer shadow-xs active:translate-y-[1px]"
              >
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
