import React, { useState } from 'react';
import { CartItem } from '../../types/pos';
import { Edit3, Check, X } from 'lucide-react';

interface ModifyCartModalProps {
  item: CartItem | null;
  onUpdate: (id: string, newQty: number, newUnitPrice: number) => void;
  onClose: () => void;
}

export const ModifyCartModal: React.FC<ModifyCartModalProps> = ({
  item,
  onUpdate,
  onClose
}) => {
  if (!item) return null;

  const [qty, setQty] = useState(item.quantity);
  const [price, setPrice] = useState(item.unitPrice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (qty > 0 && price >= 0) {
      onUpdate(item.id, qty, price);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-100 select-none">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244]">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-tight">Modificar Ítem del Carrito</span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 bg-[#f4f8fd] space-y-3 text-xs">
          <div>
            <div className="font-bold text-slate-900">{item.product.name}</div>
            <div className="text-slate-500 text-[11px]">{item.product.brand} · {item.product.reference}</div>
          </div>

          <div className="space-y-2 bg-white p-2.5 border border-[#a2bfde] rounded-[2px]">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Cantidad:</label>
              <input
                type="number"
                min="1"
                max={item.product.stock}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-7 px-2 font-mono text-sm bg-white border border-[#7f9db9] rounded-[2px] focus:outline-none focus:border-[#316ac5]"
                autoFocus
              />
              <span className="text-[10px] text-slate-500">Stock máximo: {item.product.stock} unids</span>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Precio Unitario (Bs.):</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full h-7 px-2 font-mono text-sm bg-white border border-[#7f9db9] rounded-[2px] focus:outline-none focus:border-[#316ac5]"
              />
            </div>

            <div className="pt-1 flex justify-between font-bold text-slate-900 border-t border-slate-100">
              <span>Nuevo Total:</span>
              <span className="font-mono text-blue-700 font-extrabold">
                {(qty * price).toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-6.5 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] text-slate-800 border border-[#8faecf] rounded-[2px] text-xs font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-6.5 px-4 bg-gradient-to-b from-[#1975d2] to-[#125ea8] text-white border border-[#0d4e91] rounded-[2px] text-xs font-bold cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
