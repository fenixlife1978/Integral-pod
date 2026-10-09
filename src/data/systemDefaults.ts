import { BackupSchedule, BackupSnapshot, SystemConfig } from '../types/system';

export const DEFAULT_SYSTEM_CONFIG: SystemConfig = {
  companyName: 'SISTEMA INTEGRAL DE FERRETERÍA Y REPUESTOS AUTOMOTRICES C.A.',
  companyRif: 'J-40819203-9',
  commercialName: 'SIFER-360 Tu Taller, en Buenas Manos',
  companyPhone: '0241-8712345 / 0414-3456789',
  companyEmail: 'administracion@sifer360.com.ve',
  companyAddress: 'Av. Principal Los Guayos, Galpón Central SIFER-360, Edo. Carabobo',
  bcvRate: 42.50,
  defaultTaxRate: 0.16,
  masterPassword: 'admin',
  protectedStoragePath: 'C:\\SIFER360\\Backups\\AlmacenamientoProtegido',
  encryptionAlgorithm: 'AES-256-GCM',
  autoBackupOnShiftClose: true,
  retentionPolicyDays: 30,
  printerType: 'termica_80mm',
  ticketHeader: 'SIFER-360 REPUESTOS & LUBRICANTES\nRIF: J-40819203-9\nLos Guayos, Carabobo',
  ticketFooter: '*** GRACIAS POR SU COMPRA ***\nGarantía de 7 días en componentes eléctricos con factura.',
  nextInvoiceNumber: 4822
};

export const INITIAL_BACKUP_SCHEDULES: BackupSchedule[] = [
  {
    id: 'sched-1',
    name: 'Respaldo Diario Nocturno Cifrado',
    frequency: 'diario',
    time: '23:30',
    destinationPath: 'C:\\SIFER360\\Backups\\AlmacenamientoProtegido\\Diarios',
    encryptAES: true,
    compression: true,
    retentionDays: 30,
    enabled: true,
    lastRun: '08/10/2026 23:30',
    nextRun: 'Hoy a las 23:30',
    status: 'Activo'
  },
  {
    id: 'sched-2',
    name: 'Respaldo Automático Cierre de Turno Z',
    frequency: 'cierre_z',
    time: 'Al corte de caja',
    destinationPath: 'C:\\SIFER360\\Backups\\AlmacenamientoProtegido\\Cortes_Z',
    encryptAES: true,
    compression: true,
    retentionDays: 60,
    enabled: true,
    lastRun: '08/10/2026 18:00',
    nextRun: 'Al ejecutar Cierre Z',
    status: 'Activo'
  },
  {
    id: 'sched-3',
    name: 'Respaldo Semanal Integral de Inventario',
    frequency: 'semanal',
    time: 'Domingos 02:00',
    destinationPath: 'C:\\SIFER360\\Backups\\AlmacenamientoProtegido\\Semanales',
    encryptAES: true,
    compression: true,
    retentionDays: 90,
    enabled: true,
    lastRun: '05/10/2026 02:00',
    nextRun: '12/10/2026 02:00',
    status: 'Activo'
  }
];

export const INITIAL_BACKUP_SNAPSHOTS: BackupSnapshot[] = [
  {
    id: 'snap-1',
    fileName: 'SIFER360_TURSO_PROD_20261009_080000.sifer.aes',
    createdAt: '09/10/2026 08:00:12',
    fileSizeBytes: 5054128,
    fileSizeFormatted: '4.82 MB',
    checksumSha256: 'e83f910a2cd7981b34fa8892bc510e19ac4092bbf1823901a1d90f2345e89a12',
    encrypted: true,
    algorithm: 'AES-256-GCM',
    tablesBackedUp: ['productos', 'inventario', 'ventas', 'facturas', 'clientes', 'configuracion', 'usuarios', 'movimientos'],
    totalRecords: 1482,
    status: 'Protegido'
  },
  {
    id: 'snap-2',
    fileName: 'SIFER360_TURSO_PROD_20261008_233000.sifer.aes',
    createdAt: '08/10/2026 23:30:05',
    fileSizeBytes: 5022810,
    fileSizeFormatted: '4.79 MB',
    checksumSha256: '9b2c8301fe7294821a30985cde210874ff0923847ab18234908a1c89201ef345',
    encrypted: true,
    algorithm: 'AES-256-GCM',
    tablesBackedUp: ['productos', 'inventario', 'ventas', 'facturas', 'clientes', 'configuracion', 'usuarios', 'movimientos'],
    totalRecords: 1460,
    status: 'Verificado'
  },
  {
    id: 'snap-3',
    fileName: 'SIFER360_TURSO_PROD_20261007_233000.sifer.aes',
    createdAt: '07/10/2026 23:30:01',
    fileSizeBytes: 4981440,
    fileSizeFormatted: '4.75 MB',
    checksumSha256: '41ae981bc2093847589123049182349082349018239401829034819023849102',
    encrypted: true,
    algorithm: 'AES-256-GCM',
    tablesBackedUp: ['productos', 'inventario', 'ventas', 'facturas', 'clientes', 'configuracion', 'usuarios', 'movimientos'],
    totalRecords: 1442,
    status: 'Verificado'
  }
];
