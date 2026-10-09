import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, X, Check, Phone, FileText } from 'lucide-react';

export interface ClientRecord {
  id: string;
  name: string;
  doc: string;
  phone: string;
  type: string;
  email?: string;
  address?: string;
}

interface ClientsManagerModalProps {
  clients: ClientRecord[];
  onAddClient: (client: ClientRecord) => void;
  onUpdateClient: (client: ClientRecord) => void;
  onDeleteClient: (id: string) => void;
  onClose: () => void;
}

export const ClientsManagerModal: React.FC<ClientsManagerModalProps> = ({
  clients,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
  onClose
}) => {
  const [filter, setFilter] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ClientRecord>>({});

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.doc.toLowerCase().includes(filter.toLowerCase()) ||
      c.phone.toLowerCase().includes(filter.toLowerCase())
  );

  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const handleStartAdd = () => {
    setFormData({
      id: `client-${Date.now()}`,
      name: '',
      doc: 'V-',
      phone: '0414-',
      type: 'Cliente Frecuente',
      email: '',
      address: ''
    });
    setIsEditing(true);
  };

  const handleStartEdit = (client: ClientRecord) => {
    setFormData({ ...client });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.doc) {
      alert('Por favor complete Nombre y Documento.');
      return;
    }

    const exists = clients.some((c) => c.id === formData.id);
    if (exists) {
      onUpdateClient(formData as ClientRecord);
    } else {
      onAddClient(formData as ClientRecord);
    }
    setIsEditing(false);
    if (formData.id) setSelectedClientId(formData.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este cliente del directorio?')) {
      onDeleteClient(id);
      if (selectedClientId === id) setSelectedClientId(clients[0]?.id || '');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-3xl bg-[#eaf1fb] border border-[#003875] rounded-[3px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-xs">
        {/* Title bar */}
        <div className="h-7 bg-gradient-to-r from-[#003875] via-[#0952a5] to-[#012d5e] px-2.5 flex items-center justify-between text-white border-b border-[#002244] shrink-0">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold tracking-tight">
              Directorio y Gestión de Clientes y Talleres - SIFER-360 A2
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4.5 bg-gradient-to-b from-[#e87a70] to-[#c72d20] hover:from-[#f89088] hover:to-[#dc382b] border border-[#8f1a10] rounded-[2px] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-2 bg-[#dce8f7] border-b border-[#a0bbdb] flex items-center justify-between gap-2 shrink-0">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar cliente por nombre o cédula/RIF..."
              className="w-full h-7 px-3 bg-white border border-[#7f9db9] rounded-[2px] text-slate-800"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2" />
          </div>

          <button
            onClick={handleStartAdd}
            className="h-7 px-3 bg-gradient-to-b from-[#15803d] to-[#14532d] hover:from-[#16a34a] hover:to-[#15803d] text-white border border-[#0d4a22] rounded-[2px] font-bold flex items-center space-x-1.5 shadow-xs cursor-pointer active:translate-y-[1px]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Nuevo Cliente</span>
          </button>
        </div>

        {/* Content split */}
        <div className="flex-1 overflow-hidden flex divide-x divide-[#a9c4e2]">
          {/* Table */}
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="sticky top-0 bg-[#dce9f8] text-slate-800 border-b border-[#a9c4e2] font-semibold">
                <tr>
                  <th className="py-1 px-2 border-r border-[#a9c4e2]">Nombre / Razón Social</th>
                  <th className="py-1 px-2 border-r border-[#a9c4e2] w-28">Doc / RIF</th>
                  <th className="py-1 px-2 border-r border-[#a9c4e2] w-28">Teléfono</th>
                  <th className="py-1 px-2 border-r border-[#a9c4e2] w-28">Tipo</th>
                  <th className="py-1 px-2 text-center w-16">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaf2fa]">
                {filtered.map((cli) => {
                  const isSel = selectedClientId === cli.id;
                  return (
                    <tr
                      key={cli.id}
                      onClick={() => setSelectedClientId(cli.id)}
                      className={`cursor-pointer transition-colors ${
                        isSel ? 'bg-[#1975d2] text-white' : 'hover:bg-[#f0f6fd] text-slate-800'
                      }`}
                    >
                      <td className="py-1.5 px-2 font-bold">{cli.name}</td>
                      <td className="py-1.5 px-2 font-mono">{cli.doc}</td>
                      <td className="py-1.5 px-2">{cli.phone}</td>
                      <td className="py-1.5 px-2">{cli.type}</td>
                      <td className="py-1.5 px-2 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(cli);
                            }}
                            className={`p-1 rounded-[2px] border ${
                              isSel ? 'bg-white/20 border-white text-white' : 'border-[#7f9db9] hover:bg-slate-100'
                            }`}
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(cli.id);
                            }}
                            className={`p-1 rounded-[2px] border ${
                              isSel ? 'bg-white/20 border-white text-white' : 'border-[#7f9db9] text-red-600 hover:bg-slate-100'
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

          {/* Details / Edit Column */}
          <div className="w-72 bg-[#f4f8fd] p-3 flex flex-col overflow-y-auto">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="font-bold text-slate-900 text-sm border-b pb-1">
                  {formData.id && clients.some((c) => c.id === formData.id)
                    ? 'Editar Cliente'
                    : 'Nuevo Cliente'}
                </div>

                <div>
                  <label className="font-bold text-slate-800 block">Nombre / Razón Social:</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block">Cédula o RIF:</label>
                  <input
                    type="text"
                    value={formData.doc || ''}
                    onChange={(e) => setFormData({ ...formData, doc: e.target.value })}
                    className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block">Teléfono:</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block">Categoría de Cliente:</label>
                  <select
                    value={formData.type || 'Público General'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-6 px-1.5 border border-[#7f9db9] rounded-[2px] bg-white"
                  >
                    <option value="Público General">Público General</option>
                    <option value="Taller / Mayorista">Taller / Mayorista</option>
                    <option value="Distribuidor">Distribuidor</option>
                    <option value="Cliente Frecuente">Cliente Frecuente</option>
                    <option value="Flota Comercial">Flota Comercial</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="h-6.5 px-3 bg-[#eaf2fa] border border-[#8faecf] rounded-[2px] font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="h-6.5 px-3 bg-[#1975d2] text-white border border-[#0d4e91] rounded-[2px] font-bold cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            ) : selectedClient ? (
              <div className="space-y-3">
                <div className="bg-white p-2.5 border border-[#a2bfde] rounded-[2px] space-y-2">
                  <div className="font-bold text-slate-900 text-sm">{selectedClient.name}</div>
                  <div className="font-mono text-blue-800 font-bold text-xs">{selectedClient.doc}</div>
                  <div className="text-slate-600 text-[11px]">Tipo: {selectedClient.type}</div>
                  <div className="text-slate-600 text-[11px]">Tel: {selectedClient.phone}</div>
                </div>

                <button
                  onClick={() => handleStartEdit(selectedClient)}
                  className="w-full h-7 bg-[#1975d2] hover:bg-[#125ea8] text-white border border-[#0d4e91] rounded-[2px] font-bold flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Modificar Datos</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="h-9 bg-[#dbe6f5] border-t border-[#8faecf] px-3 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-600 font-medium">
            Total de clientes: {clients.length}
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
