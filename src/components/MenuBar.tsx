import React, { useState, useRef, useEffect } from 'react';

interface MenuBarProps {
  onNewSale?: () => void;
  onClearCart?: () => void;
  onPrintPreview?: () => void;
  onOpenCatalog?: () => void;
  onOpenInventory?: () => void;
  onOpenClients?: () => void;
  onOpenReports?: () => void;
  onOpenPurchases?: () => void;
  onOpenSystemConfig?: (tab?: 'backups' | 'schedules' | 'database' | 'company' | 'printers') => void;
  onOpenAbout?: () => void;
  onShiftCloseZ?: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  onNewSale,
  onClearCart,
  onPrintPreview,
  onOpenCatalog,
  onOpenInventory,
  onOpenClients,
  onOpenReports,
  onOpenPurchases,
  onOpenSystemConfig,
  onOpenAbout,
  onShiftCloseZ
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems: {
    name: string;
    items: { label: string; shortcut?: string; action?: () => void; divider?: boolean }[];
  }[] = [
    {
      name: 'Archivo',
      items: [
        { label: 'Nueva Venta', shortcut: 'Ctrl+N', action: onNewSale },
        { label: 'Imprimir Ticket / Factura', shortcut: 'Ctrl+P', action: onPrintPreview },
        { divider: true, label: '' },
        { label: 'Cierre de Turno Z (Respaldo Automático)', shortcut: 'F12', action: onShiftCloseZ },
        { divider: true, label: '' },
        { label: 'Salir del Sistema', shortcut: 'Alt+F4', action: () => alert('Para salir de la aplicación, cierre la pestaña.') }
      ]
    },
    {
      name: 'Ventas',
      items: [
        { label: 'Punto de Venta Mostrador (POS)', shortcut: 'F2', action: onOpenCatalog },
        { label: 'Consultar Facturas / Histórico', shortcut: 'F4', action: onPrintPreview },
        { divider: true, label: '' },
        { label: 'Limpiar Carrito de Venta', shortcut: 'Esc', action: onClearCart }
      ]
    },
    {
      name: 'Inventario',
      items: [
        { label: 'Catálogo Maestro de Repuestos (CRUD)', shortcut: 'F3', action: onOpenInventory },
        { label: 'Existencias de Aceites y Lubricantes', action: onOpenInventory }
      ]
    },
    {
      name: 'Compras',
      items: [
        { label: 'Recepción de Mercancía / Compras', action: onOpenPurchases }
      ]
    },
    {
      name: 'Cuentas',
      items: [
        { label: 'Cuentas por Cobrar (CxC)', action: () => alert('Módulo CxC: Sin cuentas pendientes por cobrar.') },
        { label: 'Cuentas por Pagar (CxP)', action: () => alert('Módulo CxP: Proveedores al día.') }
      ]
    },
    {
      name: 'Contactos',
      items: [
        { label: 'Directorio de Clientes (CRUD)', action: onOpenClients }
      ]
    },
    {
      name: 'Reportes',
      items: [
        { label: 'Reporte Diario y Estadísticas de Venta', action: onOpenReports }
      ]
    },
    {
      name: 'Sistema',
      items: [
        {
          label: 'Configuración General del Taller (F10)',
          shortcut: 'F10',
          action: () => onOpenSystemConfig && onOpenSystemConfig('company')
        },
        {
          label: 'Respaldos y Seguridad Local Protegida (F9)',
          shortcut: 'F9',
          action: () => onOpenSystemConfig && onOpenSystemConfig('backups')
        },
        {
          label: 'Programación Automática de Respaldos',
          action: () => onOpenSystemConfig && onOpenSystemConfig('schedules')
        },
        {
          label: 'Motor de Base de Datos Turso',
          action: () => onOpenSystemConfig && onOpenSystemConfig('database')
        },
        {
          label: 'Configuración de Impresora Fiscal / Térmica',
          action: () => onOpenSystemConfig && onOpenSystemConfig('printers')
        },
        { divider: true, label: '' },
        {
          label: 'Acerca de SIFER-360 A2',
          action: onOpenAbout
        }
      ]
    }
  ];

  return (
    <div
      ref={menuRef}
      className="h-6 bg-gradient-to-b from-[#eef4fc] to-[#d6e3f3] border-b border-[#a0b8d7] flex items-center px-1 text-[11px] text-slate-800 select-none relative z-20 shadow-xs shrink-0"
    >
      {menuItems.map((menu) => {
        const isOpen = activeMenu === menu.name;
        return (
          <div key={menu.name} className="relative">
            <button
              onClick={() => setActiveMenu(isOpen ? null : menu.name)}
              onMouseEnter={() => {
                if (activeMenu) setActiveMenu(menu.name);
              }}
              className={`px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                isOpen
                  ? 'bg-[#316ac5] text-white shadow-inner font-medium'
                  : 'hover:bg-[#c9ddf5] hover:text-blue-950 font-normal'
              }`}
            >
              {menu.name}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 top-full mt-[1px] w-64 bg-[#f7f9fd] border border-[#7a96df] shadow-xl py-1 text-slate-900 rounded-[2px] z-50 animate-in fade-in-50 duration-75">
                {menu.items.map((item, idx) => {
                  if (item.divider) {
                    return <div key={idx} className="my-1 border-t border-[#d0dbeb]" />;
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (item.action) item.action();
                        setActiveMenu(null);
                      }}
                      className="w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-[#316ac5] hover:text-white transition-colors text-[11.5px] cursor-pointer"
                    >
                      <span className="truncate">{item.label}</span>
                      {item.shortcut && (
                        <span className="text-[10px] text-slate-500 hover:text-white ml-2 opacity-80 font-mono">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
