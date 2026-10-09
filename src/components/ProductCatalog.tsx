import React from 'react';
import { Product } from '../types/pos';
import { BRANDS, VEHICLE_MODELS, YEARS } from '../data/mockData';
import { ProductArtwork } from './ProductArtwork';
import {
  ShoppingCart,
  Search,
  Mic,
  GitCompare,
  Plus,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCrossReferences: (product: Product) => void;
  // Filters
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedVehicle: string;
  setSelectedVehicle: (vehicle: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  onVoiceSearch?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
  onAddToCart,
  onOpenCrossReferences,
  searchTerm,
  setSearchTerm,
  selectedBrand,
  setSelectedBrand,
  selectedVehicle,
  setSelectedVehicle,
  selectedYear,
  setSelectedYear,
  onVoiceSearch
}) => {
  const formatPrice = (val: number) => {
    return val.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const availableVehicles = VEHICLE_MODELS[selectedBrand] || ['Todos'];

  return (
    <div className="flex-1 flex flex-col bg-[#eaf1fb] select-none h-full overflow-hidden border-r border-[#8faecf]">
      {/* Panel Header */}
      <div className="h-7 bg-gradient-to-r from-[#074b96] via-[#095ebc] to-[#043d7c] px-3 flex items-center justify-between text-white border-b border-[#043265] shadow-xs shrink-0">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-4 h-4 text-sky-200" />
          <span className="text-xs font-bold tracking-tight">Punto de Venta</span>
        </div>
        <span className="text-[11px] text-sky-200/90 font-medium">
          {products.length} repuestos disponibles
        </span>
      </div>

      {/* Search and Filters Section */}
      <div className="p-2 bg-gradient-to-b from-[#f5f9fe] to-[#e4effa] border-b border-[#a9c4e2] space-y-2 shrink-0">
        {/* Top Search Row */}
        <div className="flex items-center space-x-1.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por producto, referencia, marca o vehículo..."
              className="w-full h-7.5 px-3 bg-white border border-[#7f9db9] rounded-[2px] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#316ac5] focus:ring-1 focus:ring-[#316ac5] shadow-inner"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={() => {}}
            className="h-7.5 px-3 bg-gradient-to-b from-[#1975d2] to-[#125ea8] hover:from-[#2185ec] hover:to-[#176bbd] text-white border border-[#0d4e91] rounded-[2px] text-xs font-semibold flex items-center space-x-1.5 shadow-xs active:translate-y-[1px] cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Buscar</span>
          </button>

          {/* Voice Search Button */}
          <button
            onClick={onVoiceSearch}
            title="Búsqueda por Voz"
            className="h-7.5 px-3 bg-gradient-to-b from-[#eaf2fa] to-[#d2e3f5] hover:from-white hover:to-[#deecf9] text-blue-900 border border-[#7f9db9] rounded-[2px] text-xs font-semibold flex items-center space-x-1 shadow-xs active:translate-y-[1px] cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-blue-700" />
            <span>Voz</span>
          </button>
        </div>

        {/* Filters Row: Marca, Vehículo, Año */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-800 font-medium pt-0.5">
          {/* Marca */}
          <div className="flex items-center space-x-1.5">
            <label className="text-slate-900 font-bold">Marca:</label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedVehicle('Todos');
              }}
              className="h-6 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-xs focus:outline-none focus:border-[#316ac5] cursor-pointer min-w-28 shadow-xs"
            >
              {BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Vehículo */}
          <div className="flex items-center space-x-1.5">
            <label className="text-slate-900 font-bold">Vehículo:</label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="h-6 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-xs focus:outline-none focus:border-[#316ac5] cursor-pointer min-w-32 shadow-xs"
            >
              {availableVehicles.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Año */}
          <div className="flex items-center space-x-1.5">
            <label className="text-slate-900 font-bold">Año:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="h-6 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-xs focus:outline-none focus:border-[#316ac5] cursor-pointer min-w-24 shadow-xs"
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {(selectedBrand !== 'Todas' || selectedVehicle !== 'Todos' || selectedYear !== 'Todos' || searchTerm !== '') && (
            <button
              onClick={() => {
                setSelectedBrand('Todas');
                setSelectedVehicle('Todos');
                setSelectedYear('Todos');
                setSearchTerm('');
              }}
              className="text-[11px] text-blue-700 hover:text-blue-900 underline font-normal ml-auto cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {/* Products Table (Windows Classic Grid) */}
      <div className="flex-1 overflow-auto bg-white border-b border-[#a9c4e2]">
        <table className="w-full border-collapse text-left text-xs">
          {/* Table Header */}
          <thead className="sticky top-0 z-10 select-none shadow-xs">
            <tr className="bg-gradient-to-b from-[#eaf2fa] via-[#d7e6f6] to-[#c2d9f2] text-slate-800 text-[11.5px] font-semibold border-b border-[#7f9db9]">
              <th className="py-1 px-2 border-r border-[#a0bad6] w-14 text-center">Imagen</th>
              <th className="py-1 px-2.5 border-r border-[#a0bad6]">Producto / Descripción</th>
              <th className="py-1 px-2.5 border-r border-[#a0bad6] w-28">Marca</th>
              <th className="py-1 px-2.5 border-r border-[#a0bad6] w-28">Referencia</th>
              <th className="py-1 px-3 border-r border-[#a0bad6] w-28 text-right">Precio (Bs.)</th>
              <th className="py-1 px-3 w-16 text-center">Stock</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#e4edf7]">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500 text-xs">
                  No se encontraron repuestos con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              products.map((prod) => {
                const isSelected = selectedProduct?.id === prod.id;

                if (isSelected) {
                  // Vibrant Windows Blue active selection row matching row 1 in screenshot!
                  return (
                    <tr
                      key={prod.id}
                      onClick={() => onSelectProduct(prod)}
                      onDoubleClick={() => onAddToCart(prod)}
                      className="bg-[#1975d2] text-white cursor-pointer select-none border-t border-b border-[#0f5ca8] transition-colors"
                    >
                      <td className="py-1.5 px-2 text-center border-r border-[#3b8eed] bg-white/10">
                        <div className="w-10 h-10 mx-auto bg-white rounded-[2px] p-0.5 shadow-xs border border-white/50 flex items-center justify-center">
                          <ProductArtwork type={prod.imageType} className="w-full h-full object-contain" />
                        </div>
                      </td>
                      <td className="py-1.5 px-2.5 border-r border-[#3b8eed]">
                        <div className="font-bold text-white text-[12.5px] leading-tight">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-sky-100 font-normal leading-tight mt-0.5">
                          {prod.application}
                        </div>
                      </td>
                      <td className="py-1.5 px-2.5 border-r border-[#3b8eed] font-medium text-white">
                        {prod.brand}
                      </td>
                      <td className="py-1.5 px-2.5 border-r border-[#3b8eed] font-mono text-white text-[11.5px]">
                        {prod.reference}
                      </td>
                      <td className="py-1.5 px-3 border-r border-[#3b8eed] text-right font-bold text-[12.5px] text-white">
                        {formatPrice(prod.price)}
                      </td>
                      <td className="py-1.5 px-3 text-center font-bold text-white">
                        {prod.stock}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    onDoubleClick={() => onAddToCart(prod)}
                    className="hover:bg-[#eaf3fe] cursor-pointer transition-colors text-slate-800"
                  >
                    <td className="py-1 px-2 text-center border-r border-[#e4edf7]">
                      <div className="w-10 h-10 mx-auto bg-white rounded-[2px] p-0.5 shadow-xs border border-slate-200 flex items-center justify-center">
                        <ProductArtwork type={prod.imageType} className="w-full h-full object-contain" />
                      </div>
                    </td>
                    <td className="py-1 px-2.5 border-r border-[#e4edf7]">
                      <div className="font-bold text-[#0c4a8a] text-[12.5px] leading-tight">
                        {prod.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                        {prod.application}
                      </div>
                    </td>
                    <td className="py-1 px-2.5 border-r border-[#e4edf7] text-slate-700 font-medium">
                      {prod.brand}
                    </td>
                    <td className="py-1 px-2.5 border-r border-[#e4edf7] text-slate-600 font-mono text-[11.5px]">
                      {prod.reference}
                    </td>
                    <td className="py-1 px-3 border-r border-[#e4edf7] text-right font-bold text-slate-900 text-[12px]">
                      {formatPrice(prod.price)}
                    </td>
                    <td className="py-1 px-3 text-center font-bold text-slate-700">
                      {prod.stock}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Product Detail Bottom Card */}
      {selectedProduct && (
        <div className="h-44 bg-[#f2f7fd] border-t border-[#8faecf] flex flex-col shrink-0 select-none">
          {/* Detail Bar Header */}
          <div className="h-6 bg-gradient-to-r from-[#12569e] via-[#1a66b8] to-[#0d4785] px-3 flex items-center justify-between text-white border-b border-[#0a3e73]">
            <span className="text-[11.5px] font-bold tracking-tight">Detalle del producto</span>
            <button
              onClick={() => onAddToCart(selectedProduct)}
              className="text-[10.5px] bg-[#22c55e] hover:bg-[#16a34a] text-white px-2 py-0.5 rounded-[2px] font-bold shadow-xs active:translate-y-[1px] cursor-pointer flex items-center space-x-1"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>Agregar al carrito (Enter)</span>
            </button>
          </div>

          {/* Inset Detail Body */}
          <div className="flex-1 p-2.5 flex items-stretch space-x-3 overflow-hidden">
            {/* Left: Product Artwork Preview */}
            <div className="w-32 h-full bg-white rounded-[2px] border border-[#a2bfde] p-2 flex items-center justify-center shadow-inner shrink-0">
              <ProductArtwork type={selectedProduct.imageType} className="w-full h-full object-contain" large />
            </div>

            {/* Middle: Specs */}
            <div className="w-60 flex flex-col justify-center space-y-1 text-xs border-r border-[#cadcee] pr-3 shrink-0">
              <div className="flex items-baseline">
                <span className="w-20 font-bold text-slate-900">Producto:</span>
                <span className="font-semibold text-slate-800 truncate">{selectedProduct.name}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-20 font-bold text-slate-900">Aplicación:</span>
                <span className="text-slate-700 truncate">{selectedProduct.application}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-20 font-bold text-slate-900">Marca:</span>
                <span className="font-semibold text-slate-800">{selectedProduct.brand}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-20 font-bold text-slate-900">Referencia:</span>
                <span className="font-mono text-blue-700 font-bold underline cursor-pointer">
                  {selectedProduct.reference}
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="w-20 font-bold text-slate-900">Precio:</span>
                <span className="font-extrabold text-[#0d5ca8] text-sm">
                  {formatPrice(selectedProduct.price)} Bs.
                </span>
              </div>
            </div>

            {/* Right: Compatible Vehicles and Cross References button */}
            <div className="flex-1 flex flex-col justify-between pl-1 overflow-hidden">
              <div>
                <span className="font-bold text-slate-900 text-xs block mb-1">
                  Vehículos compatibles
                </span>
                <ul className="text-[11px] text-slate-700 space-y-0.5 overflow-y-auto max-h-18 pr-1">
                  {selectedProduct.compatibleVehicles.map((veh, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1975d2] shrink-0" />
                      <span className="truncate">{veh}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cross references button */}
              <div className="pt-1">
                <button
                  onClick={() => onOpenCrossReferences(selectedProduct)}
                  className="h-6 px-2.5 bg-gradient-to-b from-[#eaf2fa] to-[#d2e3f5] hover:from-white hover:to-[#deecf9] text-blue-900 border border-[#7f9db9] rounded-[2px] text-xs font-semibold flex items-center space-x-1.5 shadow-xs active:translate-y-[1px] cursor-pointer"
                >
                  <GitCompare className="w-3.5 h-3.5 text-blue-700" />
                  <span>Ver referencias cruzadas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
