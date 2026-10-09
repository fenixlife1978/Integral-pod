import React, { useState } from 'react';
import { Mic, Send, Sparkles, Bot, Volume2 } from 'lucide-react';

interface JarvisAssistantBarProps {
  onSearchSuggestion: (query: string) => void;
  onSelectCategory?: (catId: string) => void;
}

export const JarvisAssistantBar: React.FC<JarvisAssistantBarProps> = ({
  onSearchSuggestion,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [jarvisReply, setJarvisReply] = useState<string | null>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const lower = query.toLowerCase();
    onSearchSuggestion(query);

    // Smart auto responses based on auto-parts knowledge
    if (lower.includes('aveo') || lower.includes('aceite')) {
      setJarvisReply('Recomendación técnica Aveo 1.6: Requiere 3.75 L de 15W-40 o 10W-40 con filtro W610/6 y bujías NGK calibradas a 1.1mm.');
    } else if (lower.includes('bateria') || lower.includes('batería')) {
      setJarvisReply('Las baterías recomendadas para Aveo/Spark son grupo 47 o 55D23L de 60Ah a 65Ah borne derecho.');
    } else if (lower.includes('freno') || lower.includes('pastilla')) {
      setJarvisReply('Sistema de freno Aveo utiliza pastillas Brembo P59034 y líquido DOT 4 sintético con punto de ebullición >260°C.');
    } else {
      setJarvisReply(`Filtrando catálogo y buscando referencias para "${query}"...`);
    }

    setTimeout(() => {
      setJarvisReply(null);
    }, 6000);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setJarvisReply('Escuchando orden de voz... (Ej: "Buscar bujías de Aveo")');
      setTimeout(() => {
        setIsListening(false);
        setQuery('bujía aveo');
        onSearchSuggestion('bujía aveo');
        setJarvisReply('Detectado: "bujía aveo". Mostrando resultados de bujías NGK y ACDelco.');
        setTimeout(() => setJarvisReply(null), 5000);
      }, 2500);
    }
  };

  return (
    <div className="h-10 bg-gradient-to-r from-[#031d47] via-[#062c68] to-[#02183a] border-t border-[#093d7c] px-3 flex items-center justify-between select-none shadow-md shrink-0 relative z-10">
      {/* Left Jarvis Badge with pulsating blue glow */}
      <div className="flex items-center space-x-2.5 shrink-0 pr-3">
        <div className="relative flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-700 p-[1.5px] shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-pulse">
            <div className="w-full h-full rounded-full bg-[#031d47] flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-white font-extrabold text-xs tracking-wider font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            SIFER
          </span>
          <span className="text-[9.5px] text-cyan-300 font-medium tracking-tight">
            Jarvis de Iron Man
          </span>
        </div>
      </div>

      {/* Central Input & Voice bar */}
      <form onSubmit={handleSend} className="flex-1 max-w-2xl flex items-center space-x-1.5 relative">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Estoy aquí para ayudarte..."
            className="w-full h-7 px-3 pr-8 bg-[#0a2347]/90 text-white placeholder-sky-200/50 text-xs border border-[#1e589e] rounded-full focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 shadow-inner"
          />
          {query && (
            <button
              type="submit"
              className="absolute right-2 top-1.5 text-cyan-300 hover:text-cyan-100 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Microphone Button with blue glowing border */}
        <button
          type="button"
          onClick={handleVoiceToggle}
          title="Activar micrófono Jarvis"
          className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-md ${
            isListening
              ? 'bg-red-600 border-red-300 text-white animate-bounce'
              : 'bg-gradient-to-b from-[#1975d2] to-[#0c4a8a] hover:from-[#2387ee] hover:to-[#1258a3] border-cyan-400 text-white shadow-[0_0_8px_rgba(34,211,238,0.5)] active:translate-y-[1px]'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Jarvis Notification speech bubble if active */}
      {jarvisReply && (
        <div className="absolute left-64 bottom-11 bg-[#0b244d] border border-cyan-400 text-cyan-100 text-[11px] px-3 py-1.5 rounded-md shadow-2xl z-50 flex items-center space-x-2 animate-in fade-in-50 duration-200 max-w-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          <span className="leading-tight">{jarvisReply}</span>
        </div>
      )}
    </div>
  );
};
