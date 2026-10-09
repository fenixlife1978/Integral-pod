import React, { useRef } from 'react';
import { CartItem, SaleInfo } from '../../types/pos';
import { Printer, Check, X, FileText, CheckCircle2 } from 'lucide-react';

interface InvoiceModalProps {
  cart: CartItem[];
  saleInfo: SaleInfo;
  onClose: () => void;
  onConfirmNewSale: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  cart,
  saleInfo,
  onClose,
  onConfirmNewSale
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  const formatPrice = (val: number) => {
    return val.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
  const discountAmount = subtotal * (saleInfo.discountPercent / 100);
  const taxableBase = Math.max(0, subtotal - discountAmount);
  const iva = taxableBase * saleInfo.taxRate;
  const total = taxableBase + iva;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Modal Dialog */}
      <div className="w-full max-w-lg bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-100 select-none">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244]">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span className="text-xs font-bold tracking-tight">
              Venta Procesada Exitosamente - SIFER-360 A2
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Invoice Printable View */}
        <div className="p-3 bg-slate-100 max-h-[70vh] overflow-y-auto">
          <div
            ref={printAreaRef}
            className="bg-white border border-slate-300 p-5 rounded-xs shadow-xs text-slate-800 font-mono text-xs space-y-3"
          >
            {/* Header */}
            <div className="text-center border-b border-dashed border-slate-300 pb-3">
              <div className="font-extrabold text-base tracking-wider text-slate-900 font-sans">
                SIFER-360
              </div>
              <div className="text-[10px] text-slate-600 font-sans">
                SISTEMA INTEGRAL DE FERRETERÍA Y REPUESTOS AUTOMOTRICES C.A.
              </div>
              <div className="text-[10px] text-slate-500">RIF: J-40819203-9 · NIT: 0192837482</div>
              <div className="text-[10px] text-slate-500">Av. Principal Los Guayos, Galpón SIFER-360</div>
              <div className="text-[11px] font-bold text-slate-900 mt-1">
                FACTURA FISCAL NRO: FACT-0004821
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-1 text-[11px] border-b border-dashed border-slate-300 pb-2">
              <div>
                <span className="text-slate-500">Fecha:</span> {new Date().toLocaleDateString('es-VE')}
              </div>
              <div>
                <span className="text-slate-500">Hora:</span> {new Date().toLocaleTimeString('es-VE')}
              </div>
              <div>
                <span className="text-slate-500">Cliente:</span> {saleInfo.clientName}
              </div>
              <div>
                <span className="text-slate-500">Doc:</span> {saleInfo.clientDoc || 'V-00000000'}
              </div>
              <div>
                <span className="text-slate-500">Caja:</span> {saleInfo.cashRegister}
              </div>
              <div>
                <span className="text-slate-500">Vendedor:</span> {saleInfo.seller}
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Forma Pago:</span> {saleInfo.paymentMethod}
              </div>
            </div>

            {/* Items Table */}
            <div>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-600">
                    <th className="text-left py-1">Cant.</th>
                    <th className="text-left py-1">Descripción</th>
                    <th className="text-right py-1">P. Unit</th>
                    <th className="text-right py-1">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cart.map((item, idx) => (
                    <tr key={idx} className="py-1">
                      <td className="py-1 font-bold">{item.quantity}</td>
                      <td className="py-1 pr-1">
                        <div>{item.product.name}</div>
                        <div className="text-[9.5px] text-slate-500">{item.product.brand} {item.product.reference}</div>
                      </td>
                      <td className="text-right py-1">{formatPrice(item.unitPrice)}</td>
                      <td className="text-right py-1 font-bold">{formatPrice(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financials Breakdown */}
            <div className="border-t border-dashed border-slate-300 pt-2 space-y-1 text-right text-[11px]">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span>{formatPrice(subtotal)} Bs.</span>
              </div>
              {saleInfo.discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>DESCUENTO ({saleInfo.discountPercent}%):</span>
                  <span>-{formatPrice(discountAmount)} Bs.</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>IVA (16%):</span>
                <span>{formatPrice(iva)} Bs.</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-950 border-t border-slate-900 pt-1">
                <span>TOTAL A PAGAR:</span>
                <span>{formatPrice(total)} Bs.</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-[9.5px] text-slate-500 pt-2 border-t border-dashed border-slate-200">
              *** GRACIAS POR SU COMPRA · SIFER-360 ***
              <div>Garantía en repuestos eléctricos 7 días con factura</div>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="h-11 bg-[#dbe6f5] border-t border-[#8faecf] px-3 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="h-7 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer active:translate-y-[1px]"
          >
            <Printer className="w-3.5 h-3.5 text-slate-700" />
            <span>Imprimir Ticket</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="h-7 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] text-xs font-semibold shadow-xs cursor-pointer active:translate-y-[1px]"
            >
              Cerrar
            </button>
            <button
              onClick={onConfirmNewSale}
              className="h-7 px-4 bg-gradient-to-b from-[#15803d] to-[#14532d] hover:from-[#16a34a] hover:to-[#15803d] text-white border border-[#0d4a22] rounded-[2px] text-xs font-bold flex items-center space-x-1.5 shadow-xs cursor-pointer active:translate-y-[1px]"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Nueva Venta (Enter)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
