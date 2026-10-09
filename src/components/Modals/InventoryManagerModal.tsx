import React, { useState } from 'react';
import { Product } from '../../types/pos';
import { ProductArtwork } from '../ProductArtwork';
import { CATEGORIES, BRANDS } from '../../data/mockData';
import {
  Box,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Check,
  Save,
  PackagePlus,
  Filter
} from 'lucide-react';

interface InventoryManagerModalProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onClose: () => void;
}

export const InventoryManagerModal: React.FC<InventoryManagerModalProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');

  // Form mode for Add/Edit
  const [isEditingForm, setIsEditingForm] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'todos' && p.category !== categoryFilter) return false;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(s) ||
        p.reference.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s) ||
        p.application.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handleStartAdd = () => {
    setEditFormData({
      id: `prod-${Date.now()}`,
      name: '',
      application: '',
      brand: 'ACDelco',
      reference: '',
      price: 1500,
      stock: 10,
      category: 'motor',
      imageType: 'fuel_filter',
      compatibleVehicles: ['Universal'],
      vehicleBrands: ['Universal'],
      vehicleModels: ['Todos'],
      years: [2010, 2011, 2012, 2013, 2014, 2015]
    });
    setIsEditingForm(true);
  };

  const handleStartEdit = (prod: Product) => {
    setEditFormData({ ...prod });
    setIsEditingForm(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.name || !editFormData.reference) {
      alert('Por favor complete los campos obligatorios (Nombre y Referencia).');
      return;
    }

    const exists = products.some((p) => p.id === editFormData.id);
    if (exists) {
      onUpdateProduct(editFormData as Product);
    } else {
      onAddProduct(editFormData as Product);
    }

    setIsEditingForm(false);
    if (editFormData.id) setSelectedProductId(editFormData.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Desea dar de baja este repuesto del inventario general?')) {
      onDeleteProduct(id);
      if (selectedProductId === id) setSelectedProductId(products[0]?.id || '');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-4xl bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-xs">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244] shrink-0">
          <div className="flex items-center space-x-2">
            <Box className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-tight">
              Catálogo Maestro y Control de Inventario de Repuestos - SIFER-360 A2
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-2 bg-[#dce8f7] border-b border-[#a0bbdb] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center space-x-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por repuesto, marca, referencia..."
                className="w-full h-7 px-3 bg-white border border-[#7f9db9] rounded-[2px] text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2" />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-7 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-slate-800"
            >
              <option value="todos">Todas las categorías</option>
              {CATEGORIES.filter((c) => c.id !== 'todos').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStartAdd}
            className="h-7 px-3 bg-gradient-to-b from-[#15803d] to-[#14532d] hover:from-[#16a34a] hover:to-[#15803d] text-white border border-[#0d4a22] rounded-[2px] font-bold flex items-center space-x-1.5 shadow-xs cursor-pointer active:translate-y-[1px]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Nuevo Repuesto (F3)</span>
          </button>
        </div>

        {/* Table & Details Split */}
        <div className="flex-1 overflow-hidden flex divide-x divide-[#a9c4e2]">
          {/* Products Table */}
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="sticky top-0 bg-[#dce9f8] text-slate-800 border-b border-[#a9c4e2] font-semibold">
                <tr>
                  <th className="py-1 px-2 border-r border-[#a9c4e2]">Producto</th>
                  <th className="py-1 px-2 border-r border-[#a9c4e2] w-24">Marca</th>
                  <th className="py-1 px-2 border-r border-[#a9c4e2] w-28">Referencia</th>
                  <th className="py-1 px-2 border-r border-[#a9c4e2] w-24 text-right">Precio Bs.</th>
                  <th className="py-1 px-2 border-r border-[#a9c4e2] w-16 text-center">Stock</th>
                  <th className="py-1 px-2 text-center w-20">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaf2fa]">
                {filtered.map((prod) => {
                  const isSel = selectedProductId === prod.id;
                  return (
                    <tr
                      key={prod.id}
                      onClick={() => setSelectedProductId(prod.id)}
                      className={`cursor-pointer transition-colors ${
                        isSel ? 'bg-[#1975d2] text-white' : 'hover:bg-[#f0f6fd] text-slate-800'
                      }`}
                    >
                      <td className="py-1 px-2">
                        <div className="font-bold">{prod.name}</div>
                        <div className={`text-[10.5px] ${isSel ? 'text-sky-100' : 'text-slate-500'}`}>
                          {prod.application}
                        </div>
                      </td>
                      <td className="py-1 px-2 font-medium">{prod.brand}</td>
                      <td className="py-1 px-2 font-mono">{prod.reference}</td>
                      <td className="py-1 px-2 text-right font-bold">
                        {prod.price.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-1 px-2 text-center font-bold">{prod.stock}</td>
                      <td className="py-1 px-2 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(prod);
                            }}
                            title="Editar"
                            className={`p-1 rounded-[2px] border ${
                              isSel ? 'bg-white/20 border-white text-white' : 'border-[#7f9db9] hover:bg-slate-100'
                            }`}
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(prod.id);
                            }}
                            title="Eliminar"
                            className={`p-1 rounded-[2px] border ${
                              isSel ? 'bg-white/20 border-white text-white' : 'border-[#7f9db9] hover:bg-slate-100 text-red-600'
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

          {/* Right Preview or Edit Form */}
          <div className="w-80 bg-[#f4f8fd] p-3 flex flex-col overflow-y-auto">
            {isEditingForm ? (
              <form onSubmit={handleSaveForm} className="space-y-2.5">
                <div className="font-bold text-slate-900 text-sm border-b pb-1">
                  {editFormData.id && products.some((p) => p.id === editFormData.id)
                    ? 'Modificar Repuesto'
                    : 'Nuevo Repuesto'}
                </div>

                <div>
                  <label className="font-bold text-slate-800 block">Nombre del Producto:</label>
                  <input
                    type="text"
                    value={editFormData.name || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block">Aplicación / Vehículo:</label>
                  <input
                    type="text"
                    value={editFormData.application || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, application: e.target.value })}
                    className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-800 block">Marca:</label>
                    <input
                      type="text"
                      value={editFormData.brand || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, brand: e.target.value })}
                      className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block">Referencia:</label>
                    <input
                      type="text"
                      value={editFormData.reference || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, reference: e.target.value })}
                      className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-800 block">Precio (Bs.):</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editFormData.price || 0}
                      onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block">Stock Actual:</label>
                    <input
                      type="number"
                      value={editFormData.stock || 0}
                      onChange={(e) => setEditFormData({ ...editFormData, stock: parseInt(e.target.value) || 0 })}
                      className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block">Familia / Categoría:</label>
                  <select
                    value={editFormData.category || 'motor'}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'todos').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingForm(false)}
                    className="h-6.5 px-3 bg-[#eaf2fa] border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="h-6.5 px-3 bg-[#1975d2] hover:bg-[#125ea8] text-white border border-[#0d4e91] rounded-[2px] font-bold cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            ) : selectedProduct ? (
              <div className="space-y-3">
                <div className="h-32 bg-white border border-[#a2bfde] rounded-[2px] p-2 flex items-center justify-center shadow-inner">
                  <ProductArtwork type={selectedProduct.imageType} className="w-full h-full object-contain" large />
                </div>

                <div className="space-y-1.5 text-xs bg-white p-2.5 border border-[#a2bfde] rounded-[2px]">
                  <div>
                    <span className="font-bold text-slate-500 block text-[10px]">PRODUCTO</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedProduct.name}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block text-[10px]">APLICACIÓN</span>
                    <span className="text-slate-800 font-medium">{selectedProduct.application}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t">
                    <div>
                      <span className="font-bold text-slate-500 block text-[10px]">MARCA</span>
                      <span className="font-bold text-slate-900">{selectedProduct.brand}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block text-[10px]">REFERENCIA</span>
                      <span className="font-mono text-blue-700 font-bold">{selectedProduct.reference}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t">
                    <div>
                      <span className="font-bold text-slate-500 block text-[10px]">PRECIO</span>
                      <span className="font-bold text-emerald-700 text-sm">
                        {selectedProduct.price.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs.
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block text-[10px]">STOCK</span>
                      <span className="font-bold text-slate-900 text-sm">{selectedProduct.stock} unids</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleStartEdit(selectedProduct)}
                    className="flex-1 h-7 bg-[#1975d2] hover:bg-[#125ea8] text-white border border-[#0d4e91] rounded-[2px] font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Modificar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(selectedProduct.id)}
                    className="h-7 px-3 bg-[#e87a70] hover:bg-[#dc382b] text-white border border-[#8f1a10] rounded-[2px] font-bold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="h-9 bg-[#dbe6f5] border-t border-[#8faecf] px-3 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-600 font-medium">
            Total en inventario: {products.length} productos registrados
          </span>
          <button
            onClick={onClose}
            className="h-6.5 px-4 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
