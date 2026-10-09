import React from 'react';
import { Product } from '../../types/pos';
import { ProductArtwork } from '../ProductArtwork';
import { X, GitCompare, Check, Copy } from 'lucide-react';

interface CrossReferencesModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRefCode?: (code: string) => void;
}

export const CrossReferencesModal: React.FC<CrossReferencesModalProps> = ({
  product,
  onClose,
  onSelectRefCode
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Windows Classic Modal Window */}
      <div className="w-full max-w-xl bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-100 select-none">
        {/* Title Bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244]">
          <div className="flex items-center space-x-2">
            <GitCompare className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-tight">
              Referencias Cruzadas e Intercambiabilidad Técnica
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3 space-y-3 text-xs bg-[#f4f8fd]">
          {/* Product Header Card */}
          <div className="p-2 bg-white border border-[#a2bfde] rounded-[2px] flex items-center space-x-3 shadow-inner">
            <div className="w-14 h-14 bg-[#f8fafc] border border-slate-200 rounded-[2px] p-1 flex items-center justify-center shrink-0">
              <ProductArtwork type={product.imageType} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm text-[#0c4a8a]">{product.name}</div>
              <div className="text-slate-600 font-medium">{product.application}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Marca Original: <span className="font-bold text-slate-800">{product.brand}</span> · Ref:{' '}
                <span className="font-mono font-bold text-blue-700">{product.reference}</span>
              </div>
            </div>
          </div>

          {/* OEM Equivalents */}
          {product.oemCodes && product.oemCodes.length > 0 && (
            <div className="space-y-1">
              <span className="font-bold text-slate-800 text-[11.5px] block">
                Números de Equipo Original (OEM):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.oemCodes.map((oem, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#e0ecf8] text-[#074b96] font-mono font-bold text-[11px] border border-[#9bbde0] rounded-[2px]"
                  >
                    {oem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cross References Table */}
          <div className="space-y-1">
            <span className="font-bold text-slate-800 text-[11.5px] block">
              Marcas Equivalentes Homologadas:
            </span>
            <div className="bg-white border border-[#7f9db9] rounded-[2px] overflow-hidden max-h-48 overflow-y-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="bg-[#dce9f8] text-slate-800 border-b border-[#a9c4e2]">
                  <tr>
                    <th className="py-1 px-2 border-r border-[#a9c4e2]">Fabricante</th>
                    <th className="py-1 px-2 border-r border-[#a9c4e2]">Código de Referencia</th>
                    <th className="py-1 px-2 border-r border-[#a9c4e2]">Especificación Técnica</th>
                    <th className="py-1 px-2 text-center w-16">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaf2fa]">
                  {product.crossReferences?.map((cross, i) => (
                    <tr key={i} className="hover:bg-[#f0f6fd]">
                      <td className="py-1 px-2 font-bold text-slate-800 border-r border-[#eaf2fa]">
                        {cross.brand}
                      </td>
                      <td className="py-1 px-2 font-mono font-bold text-blue-700 border-r border-[#eaf2fa]">
                        {cross.code}
                      </td>
                      <td className="py-1 px-2 text-slate-600 text-[11px] border-r border-[#eaf2fa]">
                        {cross.notes || 'Reemplazo directo'}
                      </td>
                      <td className="py-1 px-2 text-center">
                        <button
                          onClick={() => {
                            if (onSelectRefCode) onSelectRefCode(cross.code);
                            onClose();
                          }}
                          className="px-1.5 py-0.5 bg-[#eaf2fa] hover:bg-[#316ac5] hover:text-white border border-[#7f9db9] rounded-[2px] text-[10px] font-semibold cursor-pointer active:translate-y-[1px]"
                        >
                          Usar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="h-10 bg-[#dbe6f5] border-t border-[#8faecf] px-3 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="h-6.5 px-4 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] text-xs font-semibold shadow-xs cursor-pointer active:translate-y-[1px]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
