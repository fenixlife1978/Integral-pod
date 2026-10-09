import React from 'react';

interface ProductArtworkProps {
  type: string;
  className?: string;
  large?: boolean;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({ type, className = '', large = false }) => {
  switch (type) {
    case 'oxygen_sensor':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="50%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>
          {/* Cable */}
          <path d="M 80 15 C 65 20, 60 40, 50 48" stroke="url(#wireGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 82 12 L 88 18" stroke="#ef4444" strokeWidth="3" />
          <path d="M 85 10 L 91 16" stroke="#ffffff" strokeWidth="2" />
          {/* Sensor Body */}
          <g transform="rotate(-35 50 50)">
            {/* Hex Nut */}
            <path d="M 38 42 L 62 42 L 68 50 L 62 58 L 38 58 L 32 50 Z" fill="url(#brassGrad)" stroke="#713f12" strokeWidth="1.5" />
            <line x1="42" y1="42" x2="42" y2="58" stroke="#a16207" strokeWidth="1.5" />
            <line x1="58" y1="42" x2="58" y2="58" stroke="#a16207" strokeWidth="1.5" />
            {/* Threaded Section */}
            <rect x="22" y="44" width="16" height="12" fill="url(#metalGrad)" stroke="#374151" strokeWidth="1" />
            <line x1="25" y1="44" x2="25" y2="56" stroke="#1f2937" strokeWidth="1.2" />
            <line x1="29" y1="44" x2="29" y2="56" stroke="#1f2937" strokeWidth="1.2" />
            <line x1="33" y1="44" x2="33" y2="56" stroke="#1f2937" strokeWidth="1.2" />
            {/* Perforated Tip */}
            <path d="M 10 46 L 22 45 L 22 55 L 10 54 Q 6 50 10 46 Z" fill="#4b5563" stroke="#1f2937" strokeWidth="1" />
            <circle cx="14" cy="49" r="1.2" fill="#111827" />
            <circle cx="18" cy="48" r="1.2" fill="#111827" />
            <circle cx="18" cy="52" r="1.2" fill="#111827" />
            {/* Upper Cylinder */}
            <rect x="68" y="45" width="20" height="10" rx="1" fill="url(#metalGrad)" stroke="#374151" strokeWidth="1" />
            <rect x="88" y="46" width="6" height="8" rx="1" fill="#1f2937" />
          </g>
        </svg>
      );

    case 'spark_plug':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="whiteCeramic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="nickelPlate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <g transform="rotate(45 50 50)">
            {/* Terminal nut */}
            <rect x="47" y="10" width="6" height="8" rx="1" fill="url(#nickelPlate)" stroke="#334155" strokeWidth="0.8" />
            {/* Ribbed Ceramic Insulator */}
            <rect x="44" y="18" width="12" height="26" rx="2" fill="url(#whiteCeramic)" stroke="#94a3b8" strokeWidth="0.8" />
            <rect x="42" y="22" width="16" height="3" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
            <rect x="42" y="27" width="16" height="3" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
            <rect x="42" y="32" width="16" height="3" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />
            <text x="47" y="40" fontSize="4" fill="#0284c7" fontWeight="bold" transform="rotate(90 50 40)">NGK</text>
            {/* Hexagonal Metal Shell */}
            <path d="M 40 44 L 60 44 L 63 52 L 60 60 L 40 60 L 37 52 Z" fill="url(#nickelPlate)" stroke="#1e293b" strokeWidth="1" />
            {/* Threaded Section */}
            <rect x="43" y="60" width="14" height="20" fill="url(#nickelPlate)" stroke="#1e293b" strokeWidth="0.8" />
            <line x1="43" y1="64" x2="57" y2="64" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="43" y1="68" x2="57" y2="68" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="43" y1="72" x2="57" y2="72" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="43" y1="76" x2="57" y2="76" stroke="#0f172a" strokeWidth="1.2" />
            {/* Electrodes */}
            <rect x="49" y="80" width="2" height="6" fill="#38bdf8" />
            <path d="M 45 80 L 45 88 L 50 88" stroke="#475569" strokeWidth="1.5" strokeLinecap="square" />
          </g>
        </svg>
      );

    case 'oil_filter':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="filterDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="metalRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          {/* Bottom can base */}
          <ellipse cx="50" cy="72" rx="32" ry="12" fill="url(#metalRim)" stroke="#334155" strokeWidth="1.5" />
          {/* Can body */}
          <path d="M 18 36 C 18 36 18 72 18 72 C 18 84 82 84 82 72 L 82 36 Z" fill="url(#filterDark)" />
          {/* Top dome */}
          <ellipse cx="50" cy="36" rx="32" ry="14" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <ellipse cx="50" cy="36" rx="28" ry="11" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <ellipse cx="50" cy="36" rx="14" ry="6" fill="#f59e0b" />
          {/* Filter brand text */}
          <rect x="30" y="48" width="40" height="15" rx="2" fill="#15803d" />
          <text x="50" y="59" fontSize="7" fill="#ffffff" fontWeight="bold" textAnchor="middle">MANN</text>
          <text x="50" y="68" fontSize="6" fill="#cbd5e1" fontWeight="bold" textAnchor="middle">W 610/6</text>
        </svg>
      );

    case 'brake_pads':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="padFriction" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="padSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
          </defs>
          {/* Steel backing plate */}
          <path d="M 12 40 Q 15 28 26 28 L 74 28 Q 85 28 88 40 L 92 48 L 86 52 L 82 70 Q 50 78 18 70 L 14 52 L 8 48 Z" fill="url(#padSteel)" stroke="#111827" strokeWidth="1.5" />
          {/* Friction lining */}
          <path d="M 22 36 L 78 36 L 76 66 Q 50 72 24 66 Z" fill="url(#padFriction)" stroke="#111827" strokeWidth="1.5" />
          {/* Chamfers and Center Slot */}
          <line x1="50" y1="36" x2="50" y2="68" stroke="#111827" strokeWidth="2.5" />
          <path d="M 22 36 L 28 48 L 22 66" fill="#1f2937" opacity="0.6" />
          <path d="M 78 36 L 72 48 L 78 66" fill="#1f2937" opacity="0.6" />
          {/* Logo badge Brembo red */}
          <rect x="42" y="24" width="16" height="4" rx="1" fill="#dc2626" />
        </svg>
      );

    case 'air_filter':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="orangeGasket" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
          </defs>
          {/* Filter outer orange frame */}
          <g transform="perspective(200) rotateX(25) translate(0, 10)">
            <rect x="14" y="24" width="72" height="52" rx="6" fill="url(#orangeGasket)" stroke="#9a3412" strokeWidth="2" />
            {/* Inner Pleated Paper */}
            <rect x="22" y="32" width="56" height="36" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            {/* Pleat lines */}
            {[...Array(11)].map((_, i) => (
              <line key={i} x1={26 + i * 4.8} y1="32" x2={26 + i * 4.8} y2="68" stroke="#d97706" strokeWidth="1.2" />
            ))}
          </g>
        </svg>
      );

    case 'timing_belt':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rubberBelt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="50%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>
          {/* Looped belt path */}
          <path d="M 25 35 C 25 20, 75 20, 75 35 C 75 55, 60 75, 45 80 C 25 75, 25 50, 25 35 Z" fill="none" stroke="url(#rubberBelt)" strokeWidth="11" strokeLinejoin="round" />
          <path d="M 25 35 C 25 20, 75 20, 75 35 C 75 55, 60 75, 45 80 C 25 75, 25 50, 25 35 Z" fill="none" stroke="#4b5563" strokeWidth="2" strokeDasharray="3 3" />
          <text x="50" y="30" fontSize="5" fill="#facc15" fontWeight="bold" textAnchor="middle">GATES T247</text>
        </svg>
      );

    case 'brake_fluid':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bottleRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="40%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
          {/* Cap */}
          <rect x="42" y="14" width="16" height="8" rx="2" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
          {/* Neck */}
          <rect x="44" y="22" width="12" height="10" fill="url(#bottleRed)" />
          {/* Bottle body */}
          <path d="M 44 32 C 32 38, 28 46, 28 56 L 28 80 C 28 85, 72 85, 72 80 L 72 56 C 72 46, 68 38, 56 32 Z" fill="url(#bottleRed)" stroke="#7f1d1d" strokeWidth="1.5" />
          {/* Label */}
          <rect x="34" y="48" width="32" height="26" rx="2" fill="#ffffff" stroke="#d1d5db" strokeWidth="1" />
          <text x="50" y="58" fontSize="5" fill="#b91c1c" fontWeight="bold" textAnchor="middle">BARDAHL</text>
          <text x="50" y="66" fontSize="6" fill="#1e293b" fontWeight="black" textAnchor="middle">DOT 4</text>
        </svg>
      );

    case 'car_battery':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="battCasing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="60%" stopColor="#111827" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>
          </defs>
          {/* Terminals */}
          <rect x="24" y="20" width="10" height="6" fill="#dc2626" rx="1" />
          <text x="29" y="18" fontSize="8" fill="#dc2626" fontWeight="bold" textAnchor="middle">+</text>
          <rect x="66" y="20" width="10" height="6" fill="#3b82f6" rx="1" />
          <text x="71" y="18" fontSize="8" fill="#3b82f6" fontWeight="bold" textAnchor="middle">-</text>
          {/* Handle */}
          <path d="M 32 24 L 32 16 L 68 16 L 68 24" stroke="#eab308" strokeWidth="3" fill="none" />
          {/* Main Case */}
          <rect x="16" y="26" width="68" height="56" rx="3" fill="url(#battCasing)" stroke="#374151" strokeWidth="1.5" />
          {/* Top Lid */}
          <rect x="14" y="24" width="72" height="10" rx="2" fill="#374151" stroke="#4b5563" strokeWidth="1" />
          {/* Brand sticker */}
          <rect x="22" y="42" width="56" height="30" rx="2" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <text x="50" y="54" fontSize="7" fill="#000000" fontWeight="bold" textAnchor="middle">WILLARD</text>
          <text x="50" y="63" fontSize="5.5" fill="#1e3a8a" fontWeight="bold" textAnchor="middle">12V · 60Ah</text>
          <text x="50" y="69" fontSize="4.5" fill="#000000" textAnchor="middle">54515 CCA 550A</text>
        </svg>
      );

    case 'oil_gallon':
    case 'oil_bottle':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="oilJugYellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <rect x="36" y="12" width="14" height="8" rx="2" fill="#dc2626" />
          {/* Jug handle */}
          <path d="M 68 26 C 68 38, 68 55, 68 62" stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
          {/* Jug body */}
          <path d="M 36 20 L 32 30 L 22 40 L 22 84 C 22 86, 74 86, 74 84 L 74 34 L 52 20 Z" fill="url(#oilJugYellow)" stroke="#b45309" strokeWidth="1.5" />
          {/* Label */}
          <rect x="28" y="44" width="40" height="32" rx="3" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
          <text x="48" y="56" fontSize="6.5" fill="#fef08a" fontWeight="black" textAnchor="middle">SHELL</text>
          <text x="48" y="64" fontSize="5" fill="#ffffff" fontWeight="bold" textAnchor="middle">HELIX 15W-40</text>
          <text x="48" y="72" fontSize="4.5" fill="#60a5fa" textAnchor="middle">GALÓN 4L</text>
        </svg>
      );

    case 'coolant_gallon':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="coolantNeon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect x="34" y="14" width="14" height="7" rx="1" fill="#eab308" />
          <path d="M 32 21 L 24 35 L 24 82 L 76 82 L 76 35 L 50 21 Z" fill="url(#coolantNeon)" stroke="#047857" strokeWidth="1.5" />
          <rect x="30" y="44" width="40" height="30" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="50" y="55" fontSize="5.5" fill="#34d399" fontWeight="black" textAnchor="middle">PRESTONE</text>
          <text x="50" y="63" fontSize="5" fill="#ffffff" fontWeight="bold" textAnchor="middle">50/50 VERDE</text>
        </svg>
      );

    case 'shock_absorber':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="14" r="7" fill="none" stroke="#1e293b" strokeWidth="3" />
          <circle cx="50" cy="14" r="3" fill="#cbd5e1" />
          <rect x="47" y="21" width="6" height="28" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
          <rect x="42" y="48" width="16" height="38" rx="2" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
          <circle cx="50" cy="90" r="6" fill="none" stroke="#1e293b" strokeWidth="3" />
          <circle cx="50" cy="90" r="2.5" fill="#cbd5e1" />
        </svg>
      );

    case 'clutch_kit':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="38" fill="#475569" stroke="#1e293b" strokeWidth="2" />
          <circle cx="50" cy="50" r="26" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          {/* Spring dampers */}
          <rect x="44" y="28" width="12" height="6" rx="2" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          <rect x="44" y="66" width="12" height="6" rx="2" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          <rect x="28" y="44" width="6" height="12" rx="2" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          <rect x="66" y="44" width="6" height="12" rx="2" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
        </svg>
      );

    case 'water_pump':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="46" r="28" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          <circle cx="50" cy="46" r="14" fill="#64748b" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="50" cy="46" r="6" fill="#0f172a" />
          <path d="M 28 66 L 36 78 L 64 78 L 72 66" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
        </svg>
      );

    case 'silicone_tube':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(-30 50 50)">
            <path d="M 20 50 L 32 46 L 32 54 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
            <rect x="32" y="44" width="46" height="12" rx="2" fill="#6b7280" stroke="#374151" strokeWidth="1.5" />
            <rect x="78" y="43" width="6" height="14" fill="#374151" />
            <text x="52" y="52" fontSize="4.5" fill="#ffffff" fontWeight="bold">PERMATEX</text>
          </g>
        </svg>
      );

    case 'fuel_filter':
    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="47" y="16" width="6" height="12" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
          <rect x="32" y="28" width="36" height="44" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <rect x="47" y="72" width="6" height="12" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
          <text x="50" y="52" fontSize="5" fill="#1e293b" fontWeight="bold" textAnchor="middle">FILTER</text>
        </svg>
      );
  }
};
