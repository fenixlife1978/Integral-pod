import React, { useState } from 'react';
import { INITIAL_CLIENTS } from '../../data/mockData';
import { Users, Search, Check, X, UserPlus } from 'lucide-react';

interface ClientSearchModalProps {
  onSelectClient: (name: string, doc: string) => void;
  onClose: () => void;
}

export const ClientSearchModal: React.FC<ClientSearchModalProps> = ({
  onSelectClient,
  onClose
}) => {
  const [filter, setFilter] = useState('');
  const [selectedId, setSelectedId] = useState(INITIAL_CLIENTS[0].id);

  const filtered = INITIAL_CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.doc.toLowerCase().includes(filter.toLowerCase())
  );

  const handleConfirm = () => {
    const found = INITIAL_CLIENTS.find((c) => c.id === selectedId);
    if (found) {
      onSelectClient(found.name, found.doc);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-100 select-none">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244]">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-tight">Directorio de Clientes</span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Search */}
        <div className="p-2.5 bg-[#f4f8fd] border-b border-[#a9c4e2]">
          <div className="relative">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar por nombre, RIF o Cédula..."
              className="w-full h-7 px-3 pr-8 bg-white border border-[#7f9db9] rounded-[2px] text-xs text-slate-800 focus:outline-none focus:border-[#316ac5]"
              autoFocus
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2" />
          </div>
        </div>

        {/* List */}
        <div className="max-h-60 overflow-y-auto bg-white divide-y divide-[#eaf2fa] p-1">
          {filtered.map((client) => {
            const isSel = client.id === selectedId;
            return (
              <div
                key={client.id}
                onClick={() => setSelectedId(client.id)}
                onDoubleClick={handleConfirm}
                className={`p-2 rounded-[2px] cursor-pointer text-xs flex items-center justify-between transition-colors ${
                  isSel
                    ? 'bg-[#1975d2] text-white font-medium'
                    : 'hover:bg-[#f0f6fd] text-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold">{client.name}</div>
                  <div className={`text-[11px] ${isSel ? 'text-sky-100' : 'text-slate-500'}`}>
                    {client.doc} · {client.type}
                  </div>
                </div>
                <div className={`text-[10px] ${isSel ? 'text-sky-100' : 'text-slate-400'}`}>
                  {client.phone}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="h-10 bg-[#dbe6f5] border-t border-[#8faecf] px-3 flex items-center justify-between">
          <button
            onClick={() => {
              const name = prompt('Nombre o Razón Social del nuevo cliente:');
              if (name) {
                const doc = prompt('Cédula o RIF:') || 'V-00000000';
                onSelectClient(name, doc);
                onClose();
              }
            }}
            className="h-6.5 px-2 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] text-[11px] font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <UserPlus className="w-3 h-3 text-blue-700" />
            <span>Nuevo Cliente</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="h-6.5 px-3 bg-gradient-to-b from-[#fdfdfe] to-[#e4eaf2] hover:from-white hover:to-[#d6e1ee] text-slate-800 border border-[#8faecf] rounded-[2px] text-xs font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="h-6.5 px-4 bg-gradient-to-b from-[#1975d2] to-[#125ea8] text-white border border-[#0d4e91] rounded-[2px] text-xs font-bold cursor-pointer"
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
