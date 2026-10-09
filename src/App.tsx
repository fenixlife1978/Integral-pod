import React, { useState, useEffect, useMemo } from 'react';
import { TitleBar } from './components/TitleBar';
import { MenuBar } from './components/MenuBar';
import { RibbonToolbar } from './components/RibbonToolbar';
import { CategoriesSidebar } from './components/CategoriesSidebar';
import { ProductCatalog } from './components/ProductCatalog';
import { CartAndSalePanel } from './components/CartAndSalePanel';
import { JarvisAssistantBar } from './components/JarvisAssistantBar';
import { StatusBar } from './components/StatusBar';

// Existing Modals
import { CrossReferencesModal } from './components/Modals/CrossReferencesModal';
import { InvoiceModal } from './components/Modals/InvoiceModal';
import { ClientSearchModal } from './components/Modals/ClientSearchModal';
import { ModifyCartModal } from './components/Modals/ModifyCartModal';

// New System & Module Modals
import { SystemConfigModal } from './components/Modals/SystemConfigModal';
import { InventoryManagerModal } from './components/Modals/InventoryManagerModal';
import { ClientsManagerModal, ClientRecord } from './components/Modals/ClientsManagerModal';
import { ReportsModal } from './components/Modals/ReportsModal';
import { AboutDialogModal } from './components/Modals/AboutDialogModal';

import { PRODUCTS, INITIAL_CART_ITEMS, INITIAL_CLIENTS } from './data/mockData';
import { DEFAULT_SYSTEM_CONFIG, INITIAL_BACKUP_SCHEDULES, INITIAL_BACKUP_SNAPSHOTS } from './data/systemDefaults';
import { Product, CartItem, SaleInfo } from './types/pos';
import { BackupSchedule, BackupSnapshot, SystemConfig } from './types/system';

export default function App() {
  // Navigation
  const [currentModule, setCurrentModule] = useState<string>('pos');

  // Master Data States (with full CRUD)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(DEFAULT_SYSTEM_CONFIG);
  const [backupSchedules, setBackupSchedules] = useState<BackupSchedule[]>(INITIAL_BACKUP_SCHEDULES);
  const [backupSnapshots, setBackupSnapshots] = useState<BackupSnapshot[]>(INITIAL_BACKUP_SNAPSHOTS);

  // Products and Filtering in POS
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('Todos');
  const [selectedYear, setSelectedYear] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Selected Product (default to first row: Sensor de oxígeno Aveo, matching screenshot!)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || null);

  // Cart (default initialized to the exact 4 items in the screenshot)
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null);

  // Sale metadata
  const [saleInfo, setSaleInfo] = useState<SaleInfo>({
    clientName: 'Consumidor Final',
    clientDoc: 'V-00000000',
    cashRegister: 'Caja 01 (Admin)',
    seller: 'Administrador',
    paymentMethod: 'Efectivo',
    discountPercent: 0,
    taxRate: systemConfig.defaultTaxRate
  });

  // Modal States
  const [isCrossReferencesOpen, setIsCrossReferencesOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isClientSearchOpen, setIsClientSearchOpen] = useState(false);
  const [modifyItem, setModifyItem] = useState<CartItem | null>(null);

  // System & Management Modals
  const [isSystemConfigOpen, setIsSystemConfigOpen] = useState(false);
  const [systemConfigTab, setSystemConfigTab] = useState<'backups' | 'schedules' | 'database' | 'company' | 'printers'>('backups');
  const [isInventoryManagerOpen, setIsInventoryManagerOpen] = useState(false);
  const [isClientsManagerOpen, setIsClientsManagerOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Filtered Products in Catalog
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'Todas') {
        const matchesBrand =
          item.brand.toLowerCase().includes(selectedBrand.toLowerCase()) ||
          item.vehicleBrands.includes(selectedBrand) ||
          item.vehicleBrands.includes('Universal');
        if (!matchesBrand) return false;
      }
      // Vehicle model filter
      if (selectedVehicle !== 'Todos') {
        const matchesModel =
          item.vehicleModels.includes(selectedVehicle) ||
          item.vehicleModels.includes('Todos') ||
          item.application.toLowerCase().includes(selectedVehicle.toLowerCase());
        if (!matchesModel) return false;
      }
      // Year filter
      if (selectedYear !== 'Todos') {
        const yearNum = parseInt(selectedYear);
        if (!isNaN(yearNum) && item.years && item.years.length > 0) {
          if (!item.years.includes(yearNum)) return false;
        }
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesText =
          item.name.toLowerCase().includes(term) ||
          item.application.toLowerCase().includes(term) ||
          item.brand.toLowerCase().includes(term) ||
          item.reference.toLowerCase().includes(term) ||
          (item.oemCodes && item.oemCodes.some((code) => code.toLowerCase().includes(term))) ||
          (item.crossReferences &&
            item.crossReferences.some(
              (cr) =>
                cr.code.toLowerCase().includes(term) || cr.brand.toLowerCase().includes(term)
            ));
        if (!matchesText) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedBrand, selectedVehicle, selectedYear, searchTerm]);

  // Keep selectedProduct in sync
  useEffect(() => {
    if (filteredProducts.length > 0 && !filteredProducts.some((p) => p.id === selectedProduct?.id)) {
      setSelectedProduct(filteredProducts[0]);
    }
  }, [filteredProducts, selectedProduct]);

  // Sync tax rate from system config
  useEffect(() => {
    setSaleInfo((prev) => ({ ...prev, taxRate: systemConfig.defaultTaxRate }));
  }, [systemConfig.defaultTaxRate]);

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.unitPrice
              }
            : item
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        product,
        quantity: 1,
        unitPrice: product.price,
        total: product.price
      };
      return [...prev, newItem];
    });
  };

  // Remove from cart handler
  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (selectedCartItem?.id === id) {
      setSelectedCartItem(null);
    }
  };

  // Clear cart handler
  const handleClearCart = () => {
    if (cart.length === 0) return;
    if (window.confirm('¿Está seguro de vaciar todos los ítems del carrito de venta?')) {
      setCart([]);
      setSelectedCartItem(null);
    }
  };

  // Update line item in cart
  const handleUpdateCartItem = (id: string, newQty: number, newUnitPrice: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQty,
              unitPrice: newUnitPrice,
              total: newQty * newUnitPrice
            }
          : item
      )
    );
  };

  // Finalize sale / F5
  const handleFinalizeSale = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío. Agregue repuestos para finalizar la venta.');
      return;
    }
    setIsInvoiceOpen(true);
  };

  // Cancel sale / Esc
  const handleCancelSale = () => {
    if (cart.length > 0) {
      if (window.confirm('¿Desea cancelar la venta actual y limpiar los datos?')) {
        setCart([]);
        setSelectedCartItem(null);
        setSaleInfo((prev) => ({
          ...prev,
          discountPercent: 0,
          clientName: 'Consumidor Final',
          clientDoc: 'V-00000000'
        }));
      }
    }
  };

  // Confirm new sale after invoice
  const handleConfirmNewSale = () => {
    setIsInvoiceOpen(false);
    setCart([]);
    setSelectedCartItem(null);
    setSaleInfo((prev) => ({
      ...prev,
      discountPercent: 0,
      clientName: 'Consumidor Final',
      clientDoc: 'V-00000000'
    }));
  };

  // Automated Shift Close Z with Backup
  const handleShiftCloseZ = () => {
    const confirm = window.confirm(
      '¿Desea ejecutar el Cierre de Turno Z? Esto generará un reporte de caja y un respaldo automático inmediato en el almacenamiento local protegido.'
    );
    if (!confirm) return;

    const now = new Date();
    const dateStamp = now
      .toISOString()
      .replace(/[-:T]/g, '')
      .slice(0, 15);
    const newSnapshot: BackupSnapshot = {
      id: `snap-${Date.now()}`,
      fileName: `SIFER360_TURSO_PROD_CORTE_Z_${dateStamp}.sifer.aes`,
      createdAt: now.toLocaleString('es-VE'),
      fileSizeBytes: 5180000,
      fileSizeFormatted: '4.94 MB',
      checksumSha256: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      encrypted: true,
      algorithm: 'AES-256-GCM',
      tablesBackedUp: ['productos', 'inventario', 'ventas', 'facturas', 'clientes', 'cortes_z'],
      totalRecords: 1510,
      status: 'Protegido'
    };

    setBackupSnapshots((prev) => [newSnapshot, ...prev]);
    alert(
      `Cierre de Turno Z completado exitosamente.\n\nRespaldo protegido guardado en:\n${systemConfig.protectedStoragePath}\\${newSnapshot.fileName}\n\nCifrado: AES-256-GCM\nChecksum SHA-256: ${newSnapshot.checksumSha256.slice(0, 24)}...`
    );
  };

  // Database restore handler
  const handleRestoreDatabase = (snapshot: BackupSnapshot) => {
    // Reverts or confirms restoration
    setProducts([...PRODUCTS]);
    setCart([]);
    setSelectedCartItem(null);
  };

  // PRODUCT CRUD
  const handleAddProduct = (prod: Product) => {
    setProducts((prev) => [prod, ...prev]);
    setSelectedProduct(prod);
  };
  const handleUpdateProduct = (prod: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === prod.id ? prod : p)));
    if (selectedProduct?.id === prod.id) setSelectedProduct(prod);
  };
  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // CLIENT CRUD
  const handleAddClient = (client: ClientRecord) => {
    setClients((prev) => [client, ...prev]);
  };
  const handleUpdateClient = (client: ClientRecord) => {
    setClients((prev) => prev.map((c) => (c.id === client.id ? client : c)));
  };
  const handleDeleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F5') {
        e.preventDefault();
        handleFinalizeSale();
      } else if (e.key === 'F9') {
        e.preventDefault();
        setSystemConfigTab('backups');
        setIsSystemConfigOpen(true);
      } else if (e.key === 'F10') {
        e.preventDefault();
        setSystemConfigTab('company');
        setIsSystemConfigOpen(true);
      } else if (e.key === 'F3') {
        e.preventDefault();
        setIsInventoryManagerOpen(true);
      } else if (e.key === 'F12') {
        e.preventDefault();
        handleShiftCloseZ();
      } else if (e.key === 'Escape') {
        if (isCrossReferencesOpen) setIsCrossReferencesOpen(false);
        else if (isInvoiceOpen) setIsInvoiceOpen(false);
        else if (isClientSearchOpen) setIsClientSearchOpen(false);
        else if (modifyItem) setModifyItem(null);
        else if (isSystemConfigOpen) setIsSystemConfigOpen(false);
        else if (isInventoryManagerOpen) setIsInventoryManagerOpen(false);
        else if (isClientsManagerOpen) setIsClientsManagerOpen(false);
        else if (isReportsOpen) setIsReportsOpen(false);
        else if (isAboutOpen) setIsAboutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isCrossReferencesOpen,
    isInvoiceOpen,
    isClientSearchOpen,
    modifyItem,
    isSystemConfigOpen,
    isInventoryManagerOpen,
    isClientsManagerOpen,
    isReportsOpen,
    isAboutOpen,
    cart
  ]);

  // Ribbon Module Switcher
  const handleSelectModule = (mod: string) => {
    setCurrentModule(mod);
    if (mod === 'sistema') {
      setSystemConfigTab('backups');
      setIsSystemConfigOpen(true);
    } else if (mod === 'repuestos' || mod === 'inventario') {
      setIsInventoryManagerOpen(true);
    } else if (mod === 'clientes') {
      setIsClientsManagerOpen(true);
    } else if (mod === 'reportes') {
      setIsReportsOpen(true);
    } else if (mod === 'compras') {
      alert('Módulo de Compras: Todos los pedidos a proveedores al día.');
    } else if (mod === 'cxc') {
      alert('Módulo CxC: Cartera de clientes solvente.');
    } else if (mod === 'cxp') {
      alert('Módulo CxP: Cuentas con distribuidores conciliadas.');
    } else if (mod === 'catalogo' || mod === 'inicio' || mod === 'pos') {
      // stays on main POS
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-[#004b98] font-sans text-slate-800 antialiased select-none">
      {/* 1. Windows Classic Title Bar */}
      <TitleBar />

      {/* 2. Top Menu Bar */}
      <MenuBar
        onNewSale={() => {
          setCart([]);
          setSelectedCartItem(null);
        }}
        onClearCart={handleClearCart}
        onPrintPreview={() => {
          if (cart.length > 0) setIsInvoiceOpen(true);
          else alert('No hay ítems en la venta para imprimir.');
        }}
        onOpenCatalog={() => {
          setSelectedCategory('todos');
          setSelectedBrand('Todas');
          setSelectedVehicle('Todos');
        }}
        onOpenInventory={() => setIsInventoryManagerOpen(true)}
        onOpenClients={() => setIsClientsManagerOpen(true)}
        onOpenReports={() => setIsReportsOpen(true)}
        onOpenPurchases={() => alert('Módulo de Compras: Recepción de órdenes de compra habilitada.')}
        onOpenSystemConfig={(tab) => {
          if (tab) setSystemConfigTab(tab);
          setIsSystemConfigOpen(true);
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
        onShiftCloseZ={handleShiftCloseZ}
      />

      {/* 3. Ribbon Toolbar with 3D Icons and SIFER-360 Logo */}
      <RibbonToolbar
        currentModule={currentModule}
        onSelectModule={handleSelectModule}
      />

      {/* 4. Main 3-Column Work Area */}
      <div className="flex-1 flex overflow-hidden bg-[#d7e4f3] p-[2px] gap-[2px]">
        {/* Left Column: Categorías */}
        <CategoriesSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => setSelectedCategory(id)}
        />

        {/* Center Column: Punto de Venta (Products & Details) */}
        <ProductCatalog
          products={filteredProducts}
          selectedProduct={selectedProduct}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onOpenCrossReferences={(p) => {
            setSelectedProduct(p);
            setIsCrossReferencesOpen(true);
          }}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          onVoiceSearch={() => {
            const query = prompt('Búsqueda por Voz: Diga o escriba el repuesto o vehículo (ej: Aveo, bujía, filtro):');
            if (query) setSearchTerm(query);
          }}
        />

        {/* Right Column: Carrito de Compras & Datos de la Venta */}
        <CartAndSalePanel
          cart={cart}
          selectedCartItem={selectedCartItem}
          onSelectCartItem={setSelectedCartItem}
          onRemoveCartItem={handleRemoveCartItem}
          onModifyCartItem={(item) => setModifyItem(item)}
          onClearCart={handleClearCart}
          onSaveQuote={() => {
            alert(`Presupuesto #PRE-${Math.floor(1000 + Math.random() * 9000)} guardado satisfactoriamente para ${saleInfo.clientName}.`);
          }}
          saleInfo={saleInfo}
          onUpdateSaleInfo={(partial) => setSaleInfo((prev) => ({ ...prev, ...partial }))}
          onFinalizeSale={handleFinalizeSale}
          onCancelSale={handleCancelSale}
          onOpenClientSearch={() => setIsClientSearchOpen(true)}
        />
      </div>

      {/* 5. Bottom Jarvis Assistant Bar */}
      <JarvisAssistantBar
        onSearchSuggestion={(q) => setSearchTerm(q)}
        onSelectCategory={(c) => setSelectedCategory(c)}
      />

      {/* 6. Bottom Windows Classic Status Bar */}
      <StatusBar
        currentUser="Administrador"
        cashRegister="Caja 01"
        databaseStatus="Conectado a Turso"
      />

      {/* SYSTEM CONFIG & BACKUPS MODAL */}
      {isSystemConfigOpen && (
        <SystemConfigModal
          initialTab={systemConfigTab}
          systemConfig={systemConfig}
          onUpdateSystemConfig={(newConf) => setSystemConfig(newConf)}
          schedules={backupSchedules}
          onUpdateSchedules={(scheds) => setBackupSchedules(scheds)}
          snapshots={backupSnapshots}
          onUpdateSnapshots={(snaps) => setBackupSnapshots(snaps)}
          onRestoreDatabase={handleRestoreDatabase}
          onClose={() => setIsSystemConfigOpen(false)}
        />
      )}

      {/* INVENTORY / SPARE PARTS MANAGER (CRUD) */}
      {isInventoryManagerOpen && (
        <InventoryManagerModal
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onClose={() => setIsInventoryManagerOpen(false)}
        />
      )}

      {/* CLIENTS MANAGER (CRUD) */}
      {isClientsManagerOpen && (
        <ClientsManagerModal
          clients={clients}
          onAddClient={handleAddClient}
          onUpdateClient={handleUpdateClient}
          onDeleteClient={handleDeleteClient}
          onClose={() => setIsClientsManagerOpen(false)}
        />
      )}

      {/* REPORTS MODAL */}
      {isReportsOpen && (
        <ReportsModal
          onClose={() => setIsReportsOpen(false)}
          bcvRate={systemConfig.bcvRate}
        />
      )}

      {/* ABOUT MODAL */}
      {isAboutOpen && (
        <AboutDialogModal onClose={() => setIsAboutOpen(false)} />
      )}

      {/* CROSS REFERENCES MODAL */}
      {isCrossReferencesOpen && (
        <CrossReferencesModal
          product={selectedProduct}
          onClose={() => setIsCrossReferencesOpen(false)}
          onSelectRefCode={(code) => {
            setSearchTerm(code);
            setIsCrossReferencesOpen(false);
          }}
        />
      )}

      {/* INVOICE MODAL */}
      {isInvoiceOpen && (
        <InvoiceModal
          cart={cart}
          saleInfo={saleInfo}
          onClose={() => setIsInvoiceOpen(false)}
          onConfirmNewSale={handleConfirmNewSale}
        />
      )}

      {/* CLIENT SEARCH MODAL */}
      {isClientSearchOpen && (
        <ClientSearchModal
          onSelectClient={(name, doc) => {
            setSaleInfo((prev) => ({ ...prev, clientName: name, clientDoc: doc }));
          }}
          onClose={() => setIsClientSearchOpen(false)}
        />
      )}

      {/* MODIFY CART ITEM MODAL */}
      {modifyItem && (
        <ModifyCartModal
          item={modifyItem}
          onUpdate={handleUpdateCartItem}
          onClose={() => setModifyItem(null)}
        />
      )}
    </div>
  );
}
