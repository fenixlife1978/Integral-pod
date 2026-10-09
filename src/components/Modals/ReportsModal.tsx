import React, { useState } from 'react';
import { FileSpreadsheet, Printer, Download, Calendar, DollarSign, X, Check } from 'lucide-react';

interface ReportsModalProps {
  onClose: () => void;
  bcvRate: number;
}

export const ReportsModal: React.FC<ReportsModalProps> = ({ onClose, bcvRate }) => {
  const [reportType, setReportType] = useState('diario_ventas');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-3xl bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-xs">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244] shrink-0">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-tight">
              Módulo de Reportes Contables y Estadísticas de Venta - SIFER-360 A2
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
        <div className="p-2.5 bg-[#dce8f7] border-b border-[#a0bbdb] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center space-x-2">
            <label className="font-bold text-slate-800">Tipo de Reporte:</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="h-7 bg-white border border-[#7f9db9] rounded-[2px] px-2 text-slate-900 font-semibold"
            >
              <option value="diario_ventas">Reporte Diario de Ventas por Caja y Turno Z</option>
              <option value="ranking_repuestos">Ranking de Repuestos Más Vendidos (Top 20)</option>
              <option value="stock_critico">Existencias Bajo Mínimo y Alertas de Stock</option>
              <option value="libro_ventas">Libro de Ventas Fiscal SENIAT (IVA 16%)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="h-7 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={() => alert('Reporte exportado exitosamente a formato Excel / CSV')}
              className="h-7 px-3 bg-gradient-to-b from-[#15803d] to-[#14532d] hover:from-[#16a34a] hover:to-[#15803d] text-white border border-[#0d4a22] rounded-[2px] font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel</span>
            </button>
          </div>
        </div>

        {/* Content Report Preview */}
        <div className="flex-1 overflow-auto p-4 bg-white space-y-4">
          <div className="border border-slate-300 p-4 rounded-xs font-mono space-y-3">
            <div className="text-center border-b pb-2">
              <div className="font-bold text-sm text-slate-900 font-sans">SIFER-360 C.A. - REPORTE GERENCIAL</div>
              <div className="text-[10px] text-slate-500">RIF: J-40819203-9 · Fecha de emisión: {new Date().toLocaleDateString('es-VE')}</div>
              <div className="text-xs font-bold text-blue-900 mt-1 uppercase">
                {reportType === 'diario_ventas' && 'REPORTE DIARIO DE OPERACIONES - CAJA 01'}
                {reportType === 'ranking_repuestos' && 'ROTACIÓN Y DEMANDA DE REPUESTOS Y ACEITES'}
                {reportType === 'stock_critico' && 'INFORME DE REABASTECIMIENTO Y PUNTO DE REORDEN'}
                {reportType === 'libro_ventas' && 'LIBRO ESPECIAL DE VENTAS MENSUAL'}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 border border-slate-200 text-center">
              <div>
                <div className="text-[10px] text-slate-500">Total Facturado (Bs.)</div>
                <div className="font-extrabold text-sm text-slate-900">48.950,00 Bs.</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Equivalente Divisa USD</div>
                <div className="font-extrabold text-sm text-blue-700">
                  ${(48950 / bcvRate).toFixed(2)} USD
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Operaciones Procesadas</div>
                <div className="font-extrabold text-sm text-emerald-700">18 tickets</div>
              </div>
            </div>

            {/* Report Table */}
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-600">
                  <th className="py-1">Ítem / Código</th>
                  <th className="py-1">Detalle</th>
                  <th className="py-1 text-center">Cant.</th>
                  <th className="py-1 text-right">Monto Bs.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-1 font-bold">12626116</td>
                  <td>Sensor de oxígeno Aveo 1.6</td>
                  <td className="text-center font-bold">5</td>
                  <td className="text-right">14.250,00</td>
                </tr>
                <tr>
                  <td className="py-1 font-bold">ILZKR7B11</td>
                  <td>Bujía de iridio NGK Aveo/Optra</td>
                  <td className="text-center font-bold">16</td>
                  <td className="text-right">20.000,00</td>
                </tr>
                <tr>
                  <td className="py-1 font-bold">W610/6</td>
                  <td>Filtro de aceite Mann Filter</td>
                  <td className="text-center font-bold">8</td>
                  <td className="text-right">5.440,00</td>
                </tr>
                <tr>
                  <td className="py-1 font-bold">P59034</td>
                  <td>Pastillas de freno Brembo Aveo</td>
                  <td className="text-center font-bold">3</td>
                  <td className="text-right">7.260,00</td>
                </tr>
                <tr>
                  <td className="py-1 font-bold">HX5-15W40</td>
                  <td>Aceite Shell Helix 15W-40 Galón</td>
                  <td className="text-center font-bold">2</td>
                  <td className="text-right">4.900,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="h-9 bg-[#dbe6f5] border-t border-[#8faecf] px-3 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="h-6.5 px-4 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] text-slate-800 border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer"
          >
            Cerrar Reportes
          </button>
        </div>
      </div>
    </div>
  );
};
