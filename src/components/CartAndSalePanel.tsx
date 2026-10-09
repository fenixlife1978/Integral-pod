import React, { useState } from 'react';
import { CartItem, SaleInfo } from '../types/pos';
import {
  ShoppingCart,
  X,
  Edit3,
  Trash2,
  Save,
  Users,
  Search,
  Monitor,
  UserCheck,
  Banknote,
  Check,
  ChevronDown
} from 'lucide-react';

interface CartAndSalePanelProps {
  cart: CartItem[];
  selectedCartItem: CartItem | null;
  onSelectCartItem: (item: CartItem | null) => void;
  onRemoveCartItem: (id: string) => void;
  onModifyCartItem: (item: CartItem) => void;
  onClearCart: () => void;
  onSaveQuote: () => void;
  saleInfo: SaleInfo;
  onUpdateSaleInfo: (partial: Partial<SaleInfo>) => void;
  onFinalizeSale: () => void;
  onCancelSale: () => void;
  onOpenClientSearch: () => void;
}

export const CartAndSalePanel: React.FC<CartAndSalePanelProps> = ({
  cart,
  selectedCartItem,
  onSelectCartItem,
  onRemoveCartItem,
  onModifyCartItem,
  onClearCart,
  onSaveQuote,
  saleInfo,
  onUpdateSaleInfo,
  onFinalizeSale,
  onCancelSale,
  onOpenClientSearch
}) => {
  const formatPrice = (val: number) => {
    return val.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const discountAmount = subtotal * (saleInfo.discountPercent / 100);
  const taxableBase = Math.max(0, subtotal - discountAmount);
  const iva = taxableBase * saleInfo.taxRate;
  const total = taxableBase + iva;

  return (
    <div className="w-[390px] shrink-0 flex flex-col bg-[#eaf1fb] select-none h-full overflow-hidden">
      {/* 1. TOP BOX: Carrito de Compras */}
      <div className="flex-1 flex flex-col border-b border-[#8faecf] overflow-hidden">
        {/* Header */}
        <div className="h-7 bg-gradient-to-r from-[#074b96] via-[#095ebc] to-[#043d7c] px-3 flex items-center justify-between text-white border-b border-[#043265] shadow-xs shrink-0">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 text-sky-200" />
            <span className="text-xs font-bold tracking-tight">Carrito de Compras</span>
          </div>
          <span className="text-[11px] text-sky-200 font-medium">
            {cart.length} {cart.length === 1 ? 'ítem' : 'ítems'}
          </span>
        </div>

        {/* Cart Items Table */}
        <div className="flex-1 overflow-auto bg-white border-b border-[#a9c4e2]">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="sticky top-0 z-10 select-none shadow-xs">
              <tr className="bg-gradient-to-b from-[#eaf2fa] via-[#d7e6f6] to-[#c2d9f2] text-slate-800 text-[11px] font-semibold border-b border-[#7f9db9]">
                <th className="py-1 px-1.5 border-r border-[#a0bad6] w-7 text-center">#</th>
                <th className="py-1 px-2 border-r border-[#a0bad6]">Producto</th>
                <th className="py-1 px-1.5 border-r border-[#a0bad6] w-12 text-center">Cant.</th>
                <th className="py-1 px-2 border-r border-[#a0bad6] w-20 text-right">P. Unit.</th>
                <th className="py-1 px-2 w-20 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaf2fa]">
              {cart.map((item, idx) => {
                const isSelected = selectedCartItem?.id === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectCartItem(isSelected ? null : item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#1975d2] text-white font-medium'
                        : 'hover:bg-[#f0f6fd] text-slate-800'
                    }`}
                  >
                    <td className={`py-1 px-1 text-center border-r ${isSelected ? 'border-[#388be3]' : 'border-[#eaf2fa]'}`}>
                      {idx + 1}
                    </td>
                    <td className={`py-1 px-2 truncate max-w-[130px] border-r ${isSelected ? 'border-[#388be3]' : 'border-[#eaf2fa]'}`}>
                      <div className="truncate font-semibold text-[11.5px] leading-tight">
                        {item.product.name}
                      </div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                        {item.product.brand} · {item.product.reference}
                      </div>
                    </td>
                    <td className={`py-1 px-1 text-center font-bold border-r ${isSelected ? 'border-[#388be3]' : 'border-[#eaf2fa]'}`}>
                      {item.quantity}
                    </td>
                    <td className={`py-1 px-2 text-right border-r ${isSelected ? 'border-[#388be3]' : 'border-[#eaf2fa]'}`}>
                      {formatPrice(item.unitPrice)}
                    </td>
                    <td className="py-1 px-2 text-right font-bold">
                      {formatPrice(item.total)}
                    </td>
                  </tr>
                );
              })}

              {/* Blank filler rows to look like classic desktop grid */}
              {Array.from({ length: Math.max(0, 5 - cart.length) }).map((_, i) => (
                <tr key={`filler-${i}`} className="h-6">
                  <td className="border-r border-[#eaf2fa]"></td>
                  <td className="border-r border-[#eaf2fa]"></td>
                  <td className="border-r border-[#eaf2fa]"></td>
                  <td className="border-r border-[#eaf2fa]"></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4 Action Buttons under table */}
        <div className="p-1.5 bg-[#eaf2fa] flex items-center justify-between gap-1.5 border-b border-[#a9c4e2] shrink-0">
          {/* Eliminar */}
          <button
            onClick={() => {
              if (selectedCartItem) onRemoveCartItem(selectedCartItem.id);
              else if (cart.length > 0) onRemoveCartItem(cart[cart.length - 1].id);
            }}
            disabled={cart.length === 0}
            className="flex-1 h-6 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] active:bg-[#c8d6e8] disabled:opacity-50 text-slate-800 border border-[#8faecf] rounded-[2px] text-[11px] font-semibold flex items-center justify-center space-x-1 shadow-xs cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3.5 h-3.5 text-red-600 stroke-[3]" />
            <span>Eliminar</span>
          </button>

          {/* Modificar */}
          <button
            onClick={() => {
              if (selectedCartItem) onModifyCartItem(selectedCartItem);
              else if (cart.length > 0) onModifyCartItem(cart[0]);
            }}
            disabled={cart.length === 0}
            className="flex-1 h-6 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] active:bg-[#c8d6e8] disabled:opacity-50 text-slate-800 border border-[#8faecf] rounded-[2px] text-[11px] font-semibold flex items-center justify-center space-x-1 shadow-xs cursor-pointer active:translate-y-[1px]"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
            <span>Modificar</span>
          </button>

          {/* Vaciar */}
          <button
            onClick={onClearCart}
            disabled={cart.length === 0}
            className="flex-1 h-6 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] active:bg-[#c8d6e8] disabled:opacity-50 text-slate-800 border border-[#8faecf] rounded-[2px] text-[11px] font-semibold flex items-center justify-center space-x-1 shadow-xs cursor-pointer active:translate-y-[1px]"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Vaciar</span>
          </button>

          {/* Guardar */}
          <button
            onClick={onSaveQuote}
            disabled={cart.length === 0}
            className="flex-1 h-6 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] active:bg-[#c8d6e8] disabled:opacity-50 text-slate-800 border border-[#8faecf] rounded-[2px] text-[11px] font-semibold flex items-center justify-center space-x-1 shadow-xs cursor-pointer active:translate-y-[1px]"
          >
            <Save className="w-3.5 h-3.5 text-blue-700" />
            <span>Guardar</span>
          </button>
        </div>

        {/* Totals Section */}
        <div className="p-2 bg-[#f4f8fd] border-b border-[#a9c4e2] space-y-1 text-xs shrink-0">
          {/* Subtotal */}
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>Subtotal:</span>
            <span className="font-mono text-[13px]">{formatPrice(subtotal)}</span>
          </div>

          {/* Descuento */}
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>Descuento:</span>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min="0"
                max="100"
                value={saleInfo.discountPercent}
                onChange={(e) => onUpdateSaleInfo({ discountPercent: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })}
                className="w-16 h-5.5 px-1.5 text-right font-mono bg-white border border-[#7f9db9] rounded-[2px] text-xs focus:outline-none focus:border-[#316ac5]"
              />
              <span className="font-bold">%</span>
            </div>
          </div>

          {/* IVA (16%) */}
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>IVA (16%):</span>
            <span className="font-mono text-[13px]">{formatPrice(iva)}</span>
          </div>

          {/* Total: Big Yellow Banner */}
          <div className="mt-1.5 py-1.5 px-3 bg-gradient-to-b from-[#ffea75] via-[#ffdf4a] to-[#f4c62b] border-[1.5px] border-[#d8aa13] rounded-[3px] flex items-center justify-between shadow-xs">
            <span className="text-sm font-extrabold text-slate-900 tracking-tight">Total:</span>
            <span className="text-lg font-black text-slate-950 font-mono tracking-tight">
              {formatPrice(total)} Bs.
            </span>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM BOX: Datos de la Venta */}
      <div className="h-56 flex flex-col bg-[#f0f6fd] shrink-0 select-none">
        {/* Header */}
        <div className="h-6 bg-gradient-to-r from-[#074b96] via-[#095ebc] to-[#043d7c] px-3 flex items-center space-x-2 text-white border-b border-[#043265] shadow-xs shrink-0">
          <ShoppingCart className="w-3.5 h-3.5 text-sky-200" />
          <span className="text-xs font-bold tracking-tight">Datos de la Venta</span>
        </div>

        {/* Form Fields */}
        <div className="p-2 space-y-1.5 text-xs flex-1">
          {/* Cliente */}
          <div className="flex items-center space-x-2">
            <label className="w-24 font-bold text-slate-900 shrink-0">Cliente:</label>
            <div className="flex-1 flex items-center space-x-1">
              <div className="w-5 h-5 rounded bg-blue-100 border border-blue-300 flex items-center justify-center shrink-0">
                <Users className="w-3.5 h-3.5 text-blue-700" />
              </div>
              <input
                type="text"
                value={saleInfo.clientName}
                onChange={(e) => onUpdateSaleInfo({ clientName: e.target.value })}
                className="flex-1 h-6 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#316ac5]"
              />
              <button
                onClick={onOpenClientSearch}
                title="Buscar o Seleccionar Cliente"
                className="h-6 w-6 bg-gradient-to-b from-[#eaf2fa] to-[#d2e3f5] hover:from-white hover:to-[#deecf9] border border-[#7f9db9] rounded-[2px] flex items-center justify-center cursor-pointer shadow-xs active:translate-y-[1px]"
              >
                <Search className="w-3.5 h-3.5 text-blue-800" />
              </button>
            </div>
          </div>

          {/* Caja */}
          <div className="flex items-center space-x-2">
            <label className="w-24 font-bold text-slate-900 shrink-0">Caja:</label>
            <div className="flex-1 flex items-center space-x-1">
              <div className="w-5 h-5 rounded bg-sky-100 border border-sky-300 flex items-center justify-center shrink-0">
                <Monitor className="w-3.5 h-3.5 text-sky-700" />
              </div>
              <select
                value={saleInfo.cashRegister}
                onChange={(e) => onUpdateSaleInfo({ cashRegister: e.target.value })}
                className="flex-1 h-6 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-xs text-slate-900 font-medium focus:outline-none cursor-pointer"
              >
                <option value="Caja 01 (Admin)">Caja 01 (Admin)</option>
                <option value="Caja 02 (Mostrador Repuestos)">Caja 02 (Mostrador Repuestos)</option>
                <option value="Caja 03 (Servicio y Taller)">Caja 03 (Servicio y Taller)</option>
              </select>
            </div>
          </div>

          {/* Vendedor */}
          <div className="flex items-center space-x-2">
            <label className="w-24 font-bold text-slate-900 shrink-0">Vendedor:</label>
            <div className="flex-1 flex items-center space-x-1">
              <div className="w-5 h-5 rounded bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <select
                value={saleInfo.seller}
                onChange={(e) => onUpdateSaleInfo({ seller: e.target.value })}
                className="flex-1 h-6 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-xs text-slate-900 font-medium focus:outline-none cursor-pointer"
              >
                <option value="Administrador">Administrador</option>
                <option value="Carlos Ruiz (Asesor Técnico)">Carlos Ruiz (Asesor Técnico)</option>
                <option value="Ana Gómez (Especialista Aceites)">Ana Gómez (Especialista Aceites)</option>
                <option value="Jesús Silva (Mecánico Maestro)">Jesús Silva (Mecánico Maestro)</option>
              </select>
            </div>
          </div>

          {/* Forma de Pago */}
          <div className="flex items-center space-x-2">
            <label className="w-24 font-bold text-slate-900 shrink-0">Forma de Pago:</label>
            <div className="flex-1 flex items-center space-x-1">
              <div className="w-5 h-5 rounded bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                <Banknote className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <select
                value={saleInfo.paymentMethod}
                onChange={(e) => onUpdateSaleInfo({ paymentMethod: e.target.value })}
                className="flex-1 h-6 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-xs text-slate-900 font-medium focus:outline-none cursor-pointer"
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Pago Móvil">Pago Móvil</option>
                <option value="Punto de Venta / Débito">Punto de Venta / Débito</option>
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                <option value="Zelle / Divisas USD">Zelle / Divisas USD</option>
                <option value="Crédito 15 días">Crédito 15 días (Taller)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Big Action Buttons */}
        <div className="p-2 pt-0 flex items-center space-x-2 shrink-0">
          {/* Finalizar Venta (F5) */}
          <button
            onClick={onFinalizeSale}
            disabled={cart.length === 0}
            className="flex-1 h-8 bg-gradient-to-b from-[#15803d] via-[#166534] to-[#14532d] hover:from-[#16a34a] hover:to-[#15803d] disabled:opacity-50 text-white font-bold text-xs rounded-[3px] border border-[#0d4a22] shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer active:translate-y-[1px]"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Finalizar Venta (F5)</span>
          </button>

          {/* Cancelar (Esc) */}
          <button
            onClick={onCancelSale}
            className="h-8 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 font-bold text-xs rounded-[3px] border border-[#8faecf] shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-4 h-4 text-red-600 stroke-[3]" />
            <span>Cancelar (Esc)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
