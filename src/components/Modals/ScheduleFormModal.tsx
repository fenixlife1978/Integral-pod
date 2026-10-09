import React, { useState } from 'react';
import { BackupSchedule } from '../../types/system';
import { CalendarClock, X, Check, FolderOpen, Lock, Shield } from 'lucide-react';

interface ScheduleFormModalProps {
  initialSchedule?: BackupSchedule | null;
  onSave: (schedule: BackupSchedule) => void;
  onClose: () => void;
}

export const ScheduleFormModal: React.FC<ScheduleFormModalProps> = ({
  initialSchedule,
  onSave,
  onClose
}) => {
  const isEditing = !!initialSchedule;

  const [name, setName] = useState(initialSchedule?.name || 'Respaldo Automático Diario');
  const [frequency, setFrequency] = useState<BackupSchedule['frequency']>(
    initialSchedule?.frequency || 'diario'
  );
  const [time, setTime] = useState(initialSchedule?.time || '23:30');
  const [destinationPath, setDestinationPath] = useState(
    initialSchedule?.destinationPath || 'C:\\SIFER360\\Backups\\AlmacenamientoProtegido'
  );
  const [encryptAES, setEncryptAES] = useState(
    initialSchedule?.encryptAES !== undefined ? initialSchedule.encryptAES : true
  );
  const [compression, setCompression] = useState(
    initialSchedule?.compression !== undefined ? initialSchedule.compression : true
  );
  const [retentionDays, setRetentionDays] = useState(initialSchedule?.retentionDays || 30);
  const [enabled, setEnabled] = useState(initialSchedule?.enabled !== undefined ? initialSchedule.enabled : true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor ingrese un nombre para la tarea programada.');
      return;
    }

    let nextRunDesc = 'Hoy a las ' + time;
    if (frequency === 'cierre_z') nextRunDesc = 'Al ejecutar Cierre Z';
    else if (frequency === 'semanal') nextRunDesc = 'Próximo Domingo 02:00';
    else if (frequency === 'cada_hora') nextRunDesc = 'En 60 minutos';

    const schedule: BackupSchedule = {
      id: initialSchedule?.id || `sched-${Date.now()}`,
      name,
      frequency,
      time: frequency === 'cierre_z' ? 'Al corte Z' : time,
      destinationPath,
      encryptAES,
      compression,
      retentionDays,
      enabled,
      lastRun: initialSchedule?.lastRun || null,
      nextRun: nextRunDesc,
      status: enabled ? 'Activo' : 'Pausado'
    };

    onSave(schedule);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-100 select-none text-xs">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244]">
          <div className="flex items-center space-x-2">
            <CalendarClock className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-tight">
              {isEditing ? 'Editar Tarea Programada de Respaldo' : 'Programar Nuevo Respaldo Automático'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-3.5 space-y-3 bg-[#f4f8fd]">
          {/* Nombre */}
          <div className="space-y-1">
            <label className="font-bold text-slate-900 block">Nombre descriptivo de la tarea:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Respaldo Diario Nocturno Cifrado"
              className="w-full h-7 px-2.5 bg-white border border-[#7f9db9] rounded-[2px] text-slate-900 font-semibold focus:outline-none focus:border-[#316ac5]"
              required
            />
          </div>

          {/* Frecuencia y Horario */}
          <div className="grid grid-cols-2 gap-2.5 bg-white p-2.5 border border-[#a2bfde] rounded-[2px]">
            <div>
              <label className="font-bold text-slate-900 block mb-1">Frecuencia de ejecución:</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full h-7 bg-white border border-[#7f9db9] rounded-[2px] px-2 font-medium focus:outline-none cursor-pointer"
              >
                <option value="diario">Diario (Todos los días)</option>
                <option value="cierre_z">Automático en Cierre de Turno Z</option>
                <option value="semanal">Semanal (Fines de semana)</option>
                <option value="cada_hora">Cada hora (Intervalo rotativo)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-900 block mb-1">
                {frequency === 'cierre_z' ? 'Disparador:' : 'Hora de ejecución:'}
              </label>
              {frequency === 'cierre_z' ? (
                <input
                  type="text"
                  disabled
                  value="Al cerrar caja / Turno Z"
                  className="w-full h-7 px-2 bg-slate-100 border border-slate-300 rounded-[2px] text-slate-600 font-medium"
                />
              ) : (
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-7 px-2 bg-white border border-[#7f9db9] rounded-[2px] font-mono text-slate-900 focus:outline-none"
                />
              )}
            </div>
          </div>

          {/* Almacenamiento Local Protegido */}
          <div className="space-y-1 bg-white p-2.5 border border-[#a2bfde] rounded-[2px]">
            <label className="font-bold text-slate-900 flex items-center space-x-1.5">
              <FolderOpen className="w-3.5 h-3.5 text-blue-700" />
              <span>Ruta en Almacenamiento Local Protegido:</span>
            </label>
            <div className="flex items-center space-x-1">
              <input
                type="text"
                value={destinationPath}
                onChange={(e) => setDestinationPath(e.target.value)}
                className="flex-1 h-7 px-2 font-mono text-[11px] bg-slate-50 border border-[#7f9db9] rounded-[2px] text-slate-800"
              />
              <button
                type="button"
                onClick={() => {
                  const newPath = prompt('Directorio local para almacenamiento protegido:', destinationPath);
                  if (newPath) setDestinationPath(newPath);
                }}
                className="h-7 px-2.5 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer shadow-xs"
              >
                Examinar...
              </button>
            </div>
            <p className="text-[10.5px] text-slate-500 mt-1">
              El directorio estará protegido con permisos de administrador y aislamiento de proceso.
            </p>
          </div>

          {/* Parámetros de Seguridad y Cifrado */}
          <div className="p-2.5 bg-[#edf4fc] border border-[#b4cce5] rounded-[2px] space-y-2">
            <div className="font-bold text-slate-900 flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-700" />
              <span>Seguridad y Retención</span>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={encryptAES}
                  onChange={(e) => setEncryptAES(e.target.checked)}
                  className="rounded text-blue-600 cursor-pointer"
                />
                <span>Cifrado de grado militar AES-256-GCM con Clave Maestra</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={compression}
                  onChange={(e) => setCompression(e.target.checked)}
                  className="rounded text-blue-600 cursor-pointer"
                />
                <span>Compresión de datos con algoritmo GZIP de alto rendimiento</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="rounded text-blue-600 cursor-pointer"
                />
                <span>Activar tarea de inmediato en el programador del sistema</span>
              </label>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <label className="font-bold text-slate-800">Conservar respaldos por:</label>
              <input
                type="number"
                min="1"
                max="365"
                value={retentionDays}
                onChange={(e) => setRetentionDays(parseInt(e.target.value) || 30)}
                className="w-16 h-6 px-1.5 text-right font-mono bg-white border border-[#7f9db9] rounded-[2px]"
              />
              <span className="text-slate-600 font-medium">días (depuración automática)</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="h-9 pt-1 flex items-center justify-end space-x-2 border-t border-[#cadcee]">
            <button
              type="button"
              onClick={onClose}
              className="h-6.5 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer shadow-xs active:translate-y-[1px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-6.5 px-4 bg-gradient-to-b from-[#1975d2] to-[#125ea8] hover:from-[#2185ec] hover:to-[#176bbd] text-white border border-[#0d4e91] rounded-[2px] font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs active:translate-y-[1px]"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{isEditing ? 'Guardar Cambios' : 'Crear Programación'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
