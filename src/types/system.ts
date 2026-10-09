export interface BackupSchedule {
  id: string;
  name: string;
  frequency: 'diario' | 'semanal' | 'cierre_z' | 'cada_hora';
  time: string; // e.g., "22:00"
  destinationPath: string; // e.g. "C:\SIFER360\Backups\AlmacenamientoProtegido"
  encryptAES: boolean;
  compression: boolean;
  retentionDays: number;
  enabled: boolean;
  lastRun: string | null;
  nextRun: string;
  status: 'Activo' | 'Pausado' | 'Ejecutado';
}

export interface BackupSnapshot {
  id: string;
  fileName: string;
  createdAt: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  checksumSha256: string;
  encrypted: boolean;
  algorithm: string;
  tablesBackedUp: string[];
  totalRecords: number;
  status: 'Válido' | 'Protegido' | 'Verificado';
  dataPayload?: string; // JSON snapshot representation
}

export interface SystemConfig {
  companyName: string;
  companyRif: string;
  commercialName: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  bcvRate: number; // e.g. 42.50 Bs/USD
  defaultTaxRate: number; // 0.16 (16%)
  masterPassword: string;
  protectedStoragePath: string;
  encryptionAlgorithm: 'AES-256-GCM' | 'ChaCha20-Poly1305';
  autoBackupOnShiftClose: boolean;
  retentionPolicyDays: number;
  printerType: 'termica_80mm' | 'termica_58mm' | 'fiscal_bixolon' | 'pdf_a4';
  ticketHeader: string;
  ticketFooter: string;
  nextInvoiceNumber: number;
}
