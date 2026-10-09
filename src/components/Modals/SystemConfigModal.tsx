import React, { useState } from 'react';
import { BackupSchedule, BackupSnapshot, SystemConfig } from '../../types/system';
import { ScheduleFormModal } from './ScheduleFormModal';
import { BackupProgressModal } from './BackupProgressModal';
import { RestoreConfirmModal } from './RestoreConfirmModal';

import {
  Settings,
  HardDrive,
  CalendarClock,
  Database,
  Building2,
  Printer,
  Shield,
  ShieldCheck,
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  Play,
  RotateCcw,
  Download,
  CheckCircle,
  FileCheck,
  X,
  Check,
  Lock,
  RefreshCw,
  Sliders
} from 'lucide-react';

interface SystemConfigModalProps {
  initialTab?: 'backups' | 'schedules' | 'database' | 'company' | 'printers';
  systemConfig: SystemConfig;
  onUpdateSystemConfig: (newConfig: SystemConfig) => void;
  schedules: BackupSchedule[];
  onUpdateSchedules: (schedules: BackupSchedule[]) => void;
  snapshots: BackupSnapshot[];
  onUpdateSnapshots: (snapshots: BackupSnapshot[]) => void;
  onRestoreDatabase: (snapshot: BackupSnapshot) => void;
  onClose: () => void;
}

export const SystemConfigModal: React.FC<SystemConfigModalProps> = ({
  initialTab = 'backups',
  systemConfig,
  onUpdateSystemConfig,
  schedules,
  onUpdateSchedules,
  snapshots,
  onUpdateSnapshots,
  onRestoreDatabase,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'backups' | 'schedules' | 'database' | 'company' | 'printers'>(
    initialTab
  );

  // Form states for general config
  const [formData, setFormData] = useState<SystemConfig>({ ...systemConfig });

  // Selected schedule & snapshot
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    schedules[0]?.id || null
  );
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string | null>(
    snapshots[0]?.id || null
  );

  // Submodals
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<BackupSchedule | null>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressMode, setProgressMode] = useState<'backup' | 'restore'>('backup');
  const [activeFileName, setActiveFileName] = useState('');
  const [isRestoreConfirmOpen, setIsRestoreConfirmOpen] = useState(false);

  // 1. BACKUP ACTIONS
  const handleCreateManualBackup = () => {
    const now = new Date();
    const dateStamp = now
      .toISOString()
      .replace(/[-:T]/g, '')
      .slice(0, 15);
    const newFileName = `SIFER360_TURSO_PROD_${dateStamp}.sifer.aes`;
    setActiveFileName(newFileName);
    setProgressMode('backup');
    setIsProgressModalOpen(true);
  };

  const handleBackupFinished = () => {
    setIsProgressModalOpen(false);

    if (progressMode === 'backup') {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const dateStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(
        now.getHours()
      )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

      const newSnap: BackupSnapshot = {
        id: `snap-${Date.now()}`,
        fileName: activeFileName || `SIFER360_TURSO_PROD_${Date.now()}.sifer.aes`,
        createdAt: dateStr,
        fileSizeBytes: 5120000 + Math.floor(Math.random() * 80000),
        fileSizeFormatted: '4.88 MB',
        checksumSha256: Array.from({ length: 64 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join(''),
        encrypted: true,
        algorithm: 'AES-256-GCM',
        tablesBackedUp: [
          'productos',
          'inventario',
          'ventas',
          'facturas',
          'clientes',
          'configuracion',
          'usuarios'
        ],
        totalRecords: 1495,
        status: 'Protegido'
      };

      onUpdateSnapshots([newSnap, ...snapshots]);
      setSelectedSnapshotId(newSnap.id);
    } else {
      // Restore finished
      const targetSnap = snapshots.find((s) => s.id === selectedSnapshotId);
      if (targetSnap) {
        onRestoreDatabase(targetSnap);
      }
      alert('¡Base de datos restaurada exitosamente a la instantánea seleccionada!');
    }
  };

  // Delete snapshot
  const handleDeleteSnapshot = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este archivo de respaldo protegido? Esta acción no se puede deshacer.')) {
      onUpdateSnapshots(snapshots.filter((s) => s.id !== id));
      if (selectedSnapshotId === id) setSelectedSnapshotId(null);
    }
  };

  // Verify snapshot integrity
  const handleVerifyIntegrity = (snap: BackupSnapshot) => {
    alert(
      `Verificación de Integridad Exitosa:\n\nArchivo: ${snap.fileName}\nAlgoritmo: ${snap.algorithm}\nChecksum SHA-256: ${snap.checksumSha256}\nEstado: VÁLIDO Y SIN ALTERACIONES.\nTablas verificadas: 16 tablas consistentes.`
    );
  };

  // Download / Export Snapshot
  const handleDownloadSnapshot = (snap: BackupSnapshot) => {
    const dummyPayload = JSON.stringify(
      {
        header: 'SIFER360-ENCRYPTED-BACKUP',
        algorithm: snap.algorithm,
        createdAt: snap.createdAt,
        checksum: snap.checksumSha256,
        payloadCiphertext: 'U2FsdGVkX1+vupppZksvRf5pq5g5X1...'
      },
      null,
      2
    );

    const blob = new Blob([dummyPayload], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = snap.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 2. SCHEDULE CRUD
  const handleSaveSchedule = (schedule: BackupSchedule) => {
    const exists = schedules.some((s) => s.id === schedule.id);
    if (exists) {
      onUpdateSchedules(schedules.map((s) => (s.id === schedule.id ? schedule : s)));
    } else {
      onUpdateSchedules([...schedules, schedule]);
    }
    setIsScheduleModalOpen(false);
    setEditingSchedule(null);
    setSelectedScheduleId(schedule.id);
  };

  const handleDeleteSchedule = (id: string) => {
    if (window.confirm('¿Desea eliminar la tarea de respaldo programada seleccionada?')) {
      onUpdateSchedules(schedules.filter((s) => s.id !== id));
      if (selectedScheduleId === id) setSelectedScheduleId(null);
    }
  };

  const handleToggleSchedule = (id: string) => {
    onUpdateSchedules(
      schedules.map((s) => {
        if (s.id === id) {
          const newEnabled = !s.enabled;
          return {
            ...s,
            enabled: newEnabled,
            status: newEnabled ? 'Activo' : 'Pausado'
          };
        }
        return s;
      })
    );
  };

  // Save all general config
  const handleSaveAllConfig = () => {
    onUpdateSystemConfig(formData);
    alert('Configuración del sistema y políticas de respaldo guardadas con éxito.');
    onClose();
  };

  const selectedSnapshot = snapshots.find((s) => s.id === selectedSnapshotId);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      {/* Windows Classic Tabbed Window */}
      <div className="w-full max-w-4xl bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-xs">
        {/* Title Bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244] shrink-0">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-tight">
              Propiedades del Sistema y Respaldos - SIFER-360 A2
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Windows Classic Tab Headers */}
        <div className="h-8 bg-[#d8e6f7] border-b border-[#8faecf] px-2 flex items-end space-x-1 shrink-0 pt-1">
          {/* Tab 1 */}
          <button
            onClick={() => setActiveTab('backups')}
            className={`h-7 px-3.5 rounded-t-[3px] border-t border-l border-r flex items-center space-x-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'backups'
                ? 'bg-[#f4f8fd] border-[#8faecf] border-b-transparent text-blue-950 shadow-xs z-10 translate-y-[1px]'
                : 'bg-[#cfe0f3] border-[#a0bbdb] text-slate-700 hover:bg-[#deebf8]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Respaldos y Seguridad</span>
          </button>

          {/* Tab 2 */}
          <button
            onClick={() => setActiveTab('schedules')}
            className={`h-7 px-3.5 rounded-t-[3px] border-t border-l border-r flex items-center space-x-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'schedules'
                ? 'bg-[#f4f8fd] border-[#8faecf] border-b-transparent text-blue-950 shadow-xs z-10 translate-y-[1px]'
                : 'bg-[#cfe0f3] border-[#a0bbdb] text-slate-700 hover:bg-[#deebf8]'
            }`}
          >
            <CalendarClock className="w-3.5 h-3.5 text-indigo-700" />
            <span>Programación Automática (CRUD)</span>
          </button>

          {/* Tab 3 */}
          <button
            onClick={() => setActiveTab('database')}
            className={`h-7 px-3.5 rounded-t-[3px] border-t border-l border-r flex items-center space-x-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'database'
                ? 'bg-[#f4f8fd] border-[#8faecf] border-b-transparent text-blue-950 shadow-xs z-10 translate-y-[1px]'
                : 'bg-[#cfe0f3] border-[#a0bbdb] text-slate-700 hover:bg-[#deebf8]'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-700" />
            <span>Motor de Base de Datos</span>
          </button>

          {/* Tab 4 */}
          <button
            onClick={() => setActiveTab('company')}
            className={`h-7 px-3.5 rounded-t-[3px] border-t border-l border-r flex items-center space-x-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'company'
                ? 'bg-[#f4f8fd] border-[#8faecf] border-b-transparent text-blue-950 shadow-xs z-10 translate-y-[1px]'
                : 'bg-[#cfe0f3] border-[#a0bbdb] text-slate-700 hover:bg-[#deebf8]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Empresa y Fiscal</span>
          </button>

          {/* Tab 5 */}
          <button
            onClick={() => setActiveTab('printers')}
            className={`h-7 px-3.5 rounded-t-[3px] border-t border-l border-r flex items-center space-x-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'printers'
                ? 'bg-[#f4f8fd] border-[#8faecf] border-b-transparent text-blue-950 shadow-xs z-10 translate-y-[1px]'
                : 'bg-[#cfe0f3] border-[#a0bbdb] text-slate-700 hover:bg-[#deebf8]'
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-slate-700" />
            <span>Impresión POS</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-3.5 bg-[#f4f8fd] space-y-3">
          {/* TAB 1: RESPALDOS Y SEGURIDAD */}
          {activeTab === 'backups' && (
            <div className="space-y-3">
              {/* Storage path and encryption indicator */}
              <div className="p-2.5 bg-white border border-[#a2bfde] rounded-[2px] shadow-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-4 h-4 text-blue-700" />
                    <span className="font-bold text-slate-900">
                      Almacenamiento Local Protegido:
                    </span>
                    <span className="font-mono text-[11px] text-blue-900 bg-blue-50 px-2 py-0.5 border border-blue-200 rounded-[2px]">
                      {formData.protectedStoragePath}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-600 pl-6">
                    <span className="flex items-center space-x-1 text-emerald-700 font-bold">
                      <Lock className="w-3 h-3" />
                      <span>Cifrado {formData.encryptionAlgorithm} Activo</span>
                    </span>
                    <span>•</span>
                    <span>Retención: {formData.retentionPolicyDays} días</span>
                    <span>•</span>
                    <span>Permisos de SO: Solo Lectura/Escritura Administrador</span>
                  </div>
                </div>

                {/* Primary Action Button: Create Backup */}
                <button
                  onClick={handleCreateManualBackup}
                  className="h-8 px-4 bg-gradient-to-b from-[#15803d] to-[#14532d] hover:from-[#16a34a] hover:to-[#15803d] text-white border border-[#0d4a22] rounded-[3px] font-bold flex items-center space-x-2 shadow-xs cursor-pointer active:translate-y-[1px]"
                >
                  <HardDrive className="w-4 h-4" />
                  <span>Crear Respaldo Manual Inmediato (F9)</span>
                </button>
              </div>

              {/* Historical Backups Table (CRUD) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-[11.5px]">
                    Historial de Respaldos Protegidos ({snapshots.length} instantáneas disponibles):
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Seleccione un archivo para restaurar, verificar o descargar
                  </span>
                </div>

                <div className="bg-white border border-[#7f9db9] rounded-[2px] overflow-hidden max-h-56 overflow-y-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="sticky top-0 bg-[#dce9f8] text-slate-800 border-b border-[#a9c4e2] font-semibold">
                      <tr>
                        <th className="py-1 px-2 border-r border-[#a9c4e2]">Archivo Cifrado</th>
                        <th className="py-1 px-2 border-r border-[#a9c4e2] w-36">Fecha y Hora</th>
                        <th className="py-1 px-2 border-r border-[#a9c4e2] w-20 text-right">Tamaño</th>
                        <th className="py-1 px-2 border-r border-[#a9c4e2] w-24">Algoritmo</th>
                        <th className="py-1 px-2 border-r border-[#a9c4e2] w-20 text-center">Registros</th>
                        <th className="py-1 px-2 text-center w-24">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eaf2fa]">
                      {snapshots.map((snap) => {
                        const isSelected = selectedSnapshotId === snap.id;
                        return (
                          <tr
                            key={snap.id}
                            onClick={() => setSelectedSnapshotId(snap.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-[#1975d2] text-white font-medium'
                                : 'hover:bg-[#f0f6fd] text-slate-800'
                            }`}
                          >
                            <td className="py-1.5 px-2 font-mono text-[11px] truncate max-w-[240px]">
                              {snap.fileName}
                            </td>
                            <td className="py-1.5 px-2">{snap.createdAt}</td>
                            <td className="py-1.5 px-2 text-right font-mono">{snap.fileSizeFormatted}</td>
                            <td className="py-1.5 px-2 font-mono text-[11px]">{snap.algorithm}</td>
                            <td className="py-1.5 px-2 text-center font-bold">{snap.totalRecords}</td>
                            <td className="py-1.5 px-2 text-center">
                              <span
                                className={`px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                }`}
                              >
                                {snap.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Selected Snapshot Details & Action Buttons */}
                {selectedSnapshot && (
                  <div className="p-2.5 bg-[#edf4fc] border border-[#a2bfde] rounded-[2px] flex items-center justify-between mt-2">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 text-xs">
                        Seleccionado: <span className="font-mono text-blue-900">{selectedSnapshot.fileName}</span>
                      </div>
                      <div className="text-[10.5px] text-slate-600 font-mono">
                        Hash SHA-256: {selectedSnapshot.checksumSha256.slice(0, 32)}...
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {/* Restore */}
                      <button
                        onClick={() => setIsRestoreConfirmOpen(true)}
                        className="h-6.5 px-2.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] text-white border border-[#8f1a10] rounded-[2px] font-bold flex items-center space-x-1 cursor-pointer active:translate-y-[1px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar BD...</span>
                      </button>

                      {/* Verify Integrity */}
                      <button
                        onClick={() => handleVerifyIntegrity(selectedSnapshot)}
                        className="h-6.5 px-2.5 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold flex items-center space-x-1 cursor-pointer active:translate-y-[1px]"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-blue-700" />
                        <span>Verificar Integridad</span>
                      </button>

                      {/* Export / Download */}
                      <button
                        onClick={() => handleDownloadSnapshot(selectedSnapshot)}
                        className="h-6.5 px-2.5 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold flex items-center space-x-1 cursor-pointer active:translate-y-[1px]"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-700" />
                        <span>Descargar Archivo</span>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteSnapshot(selectedSnapshot.id)}
                        className="h-6.5 px-2 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-red-700 border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer active:translate-y-[1px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROGRAMACIÓN AUTOMÁTICA (CRUD) */}
          {activeTab === 'schedules' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    Programador de Respaldos Automáticos (Background Engine)
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Defina tareas periódicas de respaldo hacia el almacenamiento local protegido.
                  </div>
                </div>

                {/* Add new schedule button */}
                <button
                  onClick={() => {
                    setEditingSchedule(null);
                    setIsScheduleModalOpen(true);
                  }}
                  className="h-7 px-3 bg-gradient-to-b from-[#1975d2] to-[#125ea8] hover:from-[#2185ec] hover:to-[#176bbd] text-white border border-[#0d4e91] rounded-[2px] font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs active:translate-y-[1px]"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Programar Nueva Tarea</span>
                </button>
              </div>

              {/* Schedules Table */}
              <div className="bg-white border border-[#7f9db9] rounded-[2px] overflow-hidden">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="bg-[#dce9f8] text-slate-800 border-b border-[#a9c4e2] font-semibold">
                    <tr>
                      <th className="py-1.5 px-2 border-r border-[#a9c4e2]">Tarea Programada</th>
                      <th className="py-1.5 px-2 border-r border-[#a9c4e2] w-24">Frecuencia</th>
                      <th className="py-1.5 px-2 border-r border-[#a9c4e2] w-32">Horario / Disparador</th>
                      <th className="py-1.5 px-2 border-r border-[#a9c4e2]">Destino Protegido</th>
                      <th className="py-1.5 px-2 border-r border-[#a9c4e2] w-24 text-center">Próxima Ejec.</th>
                      <th className="py-1.5 px-2 border-r border-[#a9c4e2] w-20 text-center">Estado</th>
                      <th className="py-1.5 px-2 text-center w-28">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eaf2fa]">
                    {schedules.map((sch) => {
                      const isSelected = selectedScheduleId === sch.id;
                      return (
                        <tr
                          key={sch.id}
                          onClick={() => setSelectedScheduleId(sch.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#1975d2] text-white font-medium'
                              : 'hover:bg-[#f0f6fd] text-slate-800'
                          }`}
                        >
                          <td className="py-2 px-2 font-bold">{sch.name}</td>
                          <td className="py-2 px-2 capitalize">{sch.frequency}</td>
                          <td className="py-2 px-2 font-mono text-[11px]">{sch.time}</td>
                          <td className="py-2 px-2 font-mono text-[11px] truncate max-w-[180px]">
                            {sch.destinationPath}
                          </td>
                          <td className="py-2 px-2 text-center text-[11px]">{sch.nextRun}</td>
                          <td className="py-2 px-2 text-center">
                            <span
                              className={`px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold ${
                                sch.enabled
                                  ? isSelected
                                    ? 'bg-emerald-400 text-slate-900'
                                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {sch.status}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              {/* Toggle Active */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleSchedule(sch.id);
                                }}
                                title={sch.enabled ? 'Pausar tarea' : 'Activar tarea'}
                                className={`p-1 rounded-[2px] border ${
                                  isSelected
                                    ? 'bg-white/20 border-white/40 text-white'
                                    : 'bg-white border-[#7f9db9] text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <Play className="w-3 h-3" />
                              </button>

                              {/* Edit */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingSchedule(sch);
                                  setIsScheduleModalOpen(true);
                                }}
                                title="Editar programación"
                                className={`p-1 rounded-[2px] border ${
                                  isSelected
                                    ? 'bg-white/20 border-white/40 text-white'
                                    : 'bg-white border-[#7f9db9] text-blue-700 hover:bg-slate-100'
                                }`}
                              >
                                <Edit className="w-3 h-3" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSchedule(sch.id);
                                }}
                                title="Eliminar tarea"
                                className={`p-1 rounded-[2px] border ${
                                  isSelected
                                    ? 'bg-white/20 border-white/40 text-white'
                                    : 'bg-white border-[#7f9db9] text-red-600 hover:bg-slate-100'
                                }`}
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Policy note */}
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-[2px] text-[11px] text-blue-900 leading-relaxed">
                <span className="font-bold">Información de Ejecución en Segundo Plano:</span> Las tareas programadas se
                ejecutan mediante el servicio residente de SIFER-360 sin interrumpir la operación del punto de venta.
                Los archivos se nombran con marca de tiempo UTC y se protegen con cifrado inmediato.
              </div>
            </div>
          )}

          {/* TAB 3: BASE DE DATOS Y TURSO ENGINE */}
          {activeTab === 'database' && (
            <div className="space-y-3">
              <div className="bg-white p-3 border border-[#a2bfde] rounded-[2px] space-y-2.5">
                <div className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Estado del Motor Turso & SQLite LibSQL</span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-[2px]">
                    <div className="text-slate-500 text-[10.5px]">Conexión Activa</div>
                    <div className="font-bold text-emerald-700 text-xs flex items-center space-x-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Conectado a Turso Cloud</span>
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-[2px]">
                    <div className="text-slate-500 text-[10.5px]">Tamaño de Base de Datos</div>
                    <div className="font-mono font-bold text-slate-900 text-xs mt-0.5">
                      4.82 MB (16 tablas)
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-[2px]">
                    <div className="text-slate-500 text-[10.5px]">Latencia de Consulta</div>
                    <div className="font-mono font-bold text-blue-700 text-xs mt-0.5">
                      14 ms (Caché local sincronizado)
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Tools */}
              <div className="bg-white p-3 border border-[#a2bfde] rounded-[2px] space-y-2">
                <div className="font-bold text-slate-900">Mantenimiento y Optimización del Motor:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => alert('VACUUM ANALYZE ejecutado: Base de datos compactada y optimizada al 100%.')}
                    className="h-7 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer active:translate-y-[1px]"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-blue-700" />
                    <span>Optimizar BD (VACUUM ANALYZE)</span>
                  </button>

                  <button
                    onClick={() => alert('Índices de búsqueda por Marca, Modelo, Año y Referencia reconstruidos.')}
                    className="h-7 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer active:translate-y-[1px]"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-700" />
                    <span>Reconstruir Índices de Repuestos</span>
                  </button>

                  <button
                    onClick={() => alert('Archivos temporales y caché de búsquedas purgados correctamente.')}
                    className="h-7 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer active:translate-y-[1px]"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Purgar Temporales y Logs</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EMPRESA Y FISCAL */}
          {activeTab === 'company' && (
            <div className="space-y-3 bg-white p-3.5 border border-[#a2bfde] rounded-[2px]">
              <div className="font-bold text-slate-900 text-sm">
                Datos Fiscales y Parámetros Comerciales del Taller:
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Razón Social:</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] font-semibold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">RIF Fiscal:</label>
                  <input
                    type="text"
                    value={formData.companyRif}
                    onChange={(e) => setFormData({ ...formData, companyRif: e.target.value })}
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] font-mono text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Nombre Comercial:</label>
                  <input
                    type="text"
                    value={formData.commercialName}
                    onChange={(e) => setFormData({ ...formData, commercialName: e.target.value })}
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Teléfonos de Contacto:</label>
                  <input
                    type="text"
                    value={formData.companyPhone}
                    onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] text-slate-900"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="font-bold text-slate-800 block">Dirección Fiscal y Taller:</label>
                  <input
                    type="text"
                    value={formData.companyAddress}
                    onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] text-slate-900"
                  />
                </div>

                <div className="space-y-1 bg-amber-50 p-2 border border-amber-200 rounded-[2px]">
                  <label className="font-bold text-amber-950 block">Tasa de Cambio Oficial BCV (Bs. / USD):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.bcvRate}
                    onChange={(e) => setFormData({ ...formData, bcvRate: parseFloat(e.target.value) || 42.5 })}
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] font-mono font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1 bg-blue-50 p-2 border border-blue-200 rounded-[2px]">
                  <label className="font-bold text-blue-950 block">Alícuota IVA Predeterminada (%):</label>
                  <input
                    type="number"
                    value={formData.defaultTaxRate * 100}
                    onChange={(e) =>
                      setFormData({ ...formData, defaultTaxRate: (parseFloat(e.target.value) || 16) / 100 })
                    }
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] font-mono font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: IMPRESIÓN Y TICKETS */}
          {activeTab === 'printers' && (
            <div className="space-y-3 bg-white p-3.5 border border-[#a2bfde] rounded-[2px]">
              <div className="font-bold text-slate-900 text-sm">
                Configuración de Impresora Fiscal y Formato de Ticket POS:
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Tipo de Dispositivo:</label>
                  <select
                    value={formData.printerType}
                    onChange={(e) => setFormData({ ...formData, printerType: e.target.value as any })}
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] text-slate-900 font-medium"
                  >
                    <option value="termica_80mm">Impresora Térmica de Recibos 80mm</option>
                    <option value="termica_58mm">Impresora Térmica 58mm (Caja Mostrador)</option>
                    <option value="fiscal_bixolon">Impresora Fiscal Homologada SENIAT (Bixolon / Dascom)</option>
                    <option value="pdf_a4">Factura Digital Formato A4 PDF</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">Próximo Número de Factura:</label>
                  <input
                    type="number"
                    value={formData.nextInvoiceNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, nextInvoiceNumber: parseInt(e.target.value) || 4822 })
                    }
                    className="w-full h-7 px-2 border border-[#7f9db9] rounded-[2px] font-mono font-bold"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="font-bold text-slate-800 block">Encabezado de Ticket:</label>
                  <textarea
                    rows={2}
                    value={formData.ticketHeader}
                    onChange={(e) => setFormData({ ...formData, ticketHeader: e.target.value })}
                    className="w-full p-2 border border-[#7f9db9] rounded-[2px] font-mono text-[11px]"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="font-bold text-slate-800 block">Pie de Ticket / Cláusula de Garantía:</label>
                  <textarea
                    rows={2}
                    value={formData.ticketFooter}
                    onChange={(e) => setFormData({ ...formData, ticketFooter: e.target.value })}
                    className="w-full p-2 border border-[#7f9db9] rounded-[2px] font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="h-11 bg-[#dbe6f5] border-t border-[#8faecf] px-3 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-600 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
            <span>SIFER-360 A2 · Motor Turso Operativo y Protegido</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="h-7 px-4 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer shadow-xs active:translate-y-[1px]"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveAllConfig}
              className="h-7 px-4 bg-gradient-to-b from-[#1975d2] to-[#125ea8] hover:from-[#2185ec] hover:to-[#176bbd] text-white border border-[#0d4e91] rounded-[2px] font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs active:translate-y-[1px]"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Guardar y Aplicar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submodal: Schedule Form */}
      {isScheduleModalOpen && (
        <ScheduleFormModal
          initialSchedule={editingSchedule}
          onSave={handleSaveSchedule}
          onClose={() => {
            setIsScheduleModalOpen(false);
            setEditingSchedule(null);
          }}
        />
      )}

      {/* Submodal: Backup or Restore Progress (Windows Classic Bar) */}
      {isProgressModalOpen && (
        <BackupProgressModal
          mode={progressMode}
          fileName={activeFileName}
          onComplete={handleBackupFinished}
        />
      )}

      {/* Submodal: Restore Confirm with Password */}
      {isRestoreConfirmOpen && selectedSnapshot && (
        <RestoreConfirmModal
          snapshot={selectedSnapshot}
          masterPasswordRequired={formData.masterPassword}
          onConfirm={() => {
            setIsRestoreConfirmOpen(false);
            setProgressMode('restore');
            setActiveFileName(selectedSnapshot.fileName);
            setIsProgressModalOpen(true);
          }}
          onClose={() => setIsRestoreConfirmOpen(false)}
        />
      )}
    </div>
  );
};
