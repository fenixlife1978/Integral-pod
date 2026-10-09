import { Product, CategoryItem } from '../types/pos';

export const CATEGORIES: CategoryItem[] = [
  { id: 'todos', name: 'Todos', iconName: 'globe' },
  { id: 'motor', name: 'Motor y Distribución', iconName: 'engine' },
  { id: 'frenos', name: 'Frenos', iconName: 'disc' },
  { id: 'suspension', name: 'Suspensión y Dirección', iconName: 'spring' },
  { id: 'transmision', name: 'Transmisión', iconName: 'gearbox' },
  { id: 'electrico', name: 'Eléctrico y Electrónico', iconName: 'bolt' },
  { id: 'sensores', name: 'Sensores', iconName: 'sensor' },
  { id: 'filtros', name: 'Filtros', iconName: 'filter' },
  { id: 'aceites', name: 'Aceites y Lubricantes', iconName: 'oil' },
  { id: 'refrigerantes', name: 'Refrigerantes y Aditivos', iconName: 'coolant' },
  { id: 'baterias', name: 'Baterías', iconName: 'battery' },
  { id: 'neumaticos', name: 'Neumáticos', iconName: 'tire' },
  { id: 'carroceria', name: 'Carrocería y Accesorios', iconName: 'car' },
  { id: 'herramientas', name: 'Herramientas', iconName: 'wrench' },
  { id: 'quimicos', name: 'Químicos y Adhesivos', iconName: 'flask' },
];

export const BRANDS = [
  'Todas',
  'Chevrolet',
  'Toyota',
  'Ford',
  'Nissan',
  'Hyundai',
  'Kia',
  'Renault',
  'Chery',
  'Universal'
];

export const VEHICLE_MODELS: Record<string, string[]> = {
  Todas: ['Todos'],
  Chevrolet: ['Todos', 'Aveo', 'Optra', 'Spark', 'Cruze', 'Silverado', 'Corsa', 'Luv D-Max'],
  Toyota: ['Todos', 'Corolla', 'Yaris', 'Hilux', 'Fortuner', '4Runner', 'Camry'],
  Ford: ['Todos', 'Fiesta', 'Focus', 'Explorer', 'F-150', 'EcoSport', 'Ka'],
  Nissan: ['Todos', 'Sentra', 'Tiida', 'Versa', 'X-Trail', 'Frontier'],
  Hyundai: ['Todos', 'Accent', 'Elantra', 'Getz', 'Tucson', 'Santa Fe'],
  Kia: ['Todos', 'Rio', 'Picanto', 'Cerato', 'Sportage'],
  Renault: ['Todos', 'Clio', 'Logan', 'Sandero', 'Megane', 'Duster'],
  Chery: ['Todos', 'Orinoco', 'Arauca', 'Tiggo', 'Grand Tiger'],
  Universal: ['Todos', 'Estándar Universal', 'Línea Pesada', 'Línea Liviana']
};

export const YEARS = [
  'Todos',
  '2024', '2023', '2022', '2021', '2020',
  '2019', '2018', '2017', '2016', '2015',
  '2014', '2013', '2012', '2011', '2010',
  '2009', '2008', '2007', '2006', '2005',
  '2004', '2003', '2002', '2001', '2000'
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Sensor de oxígeno',
    application: 'Chevrolet Aveo 1.6 (2006-2012)',
    brand: 'ACDelco',
    reference: '12626116',
    price: 2850.00,
    stock: 12,
    category: 'sensores',
    imageType: 'oxygen_sensor',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 (2006-2012)',
      'Chevrolet Optra 1.8 (2006-2010)',
      'Chevrolet Spark 1.0 (2011-2015)'
    ],
    oemCodes: ['GM 96418965', 'GM 25182881', 'GM 96415640'],
    crossReferences: [
      { brand: 'Bosch', code: '0258006537', notes: '4 hilos / Conector original plano' },
      { brand: 'Delphi', code: 'ES20045-12B1', notes: 'Cable 320mm blindado' },
      { brand: 'Denso', code: 'DOX-0125', notes: 'Zirconia planar precalentado' },
      { brand: 'GM Original', code: '12626116', notes: 'Equipo original de ensamble' }
    ],
    vehicleBrands: ['Chevrolet'],
    vehicleModels: ['Aveo', 'Optra', 'Spark'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
  },
  {
    id: 'prod-02',
    name: 'Bujía de iridio',
    application: 'Aveo 1.6 / Optra / Spark',
    brand: 'NGK',
    reference: 'ILZKR7B11',
    price: 1250.00,
    stock: 25,
    category: 'electrico',
    imageType: 'spark_plug',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 (2006-2012)',
      'Chevrolet Optra 1.8 (2006-2011)',
      'Chevrolet Spark 1.0 (2007-2015)',
      'Hyundai Accent 1.6 (2008-2014)'
    ],
    oemCodes: ['NGK 7751', 'BOSCH FR7DCX', 'DENSO IK20TT'],
    crossReferences: [
      { brand: 'Denso Iridium', code: 'IK16TT', notes: 'Electrodo doble 0.4mm' },
      { brand: 'Bosch Platinum', code: '0242236577', notes: 'Calibración 1.1mm' },
      { brand: 'ACDelco', code: '41-103', notes: 'Garantía 100.000 km' }
    ],
    vehicleBrands: ['Chevrolet', 'Hyundai'],
    vehicleModels: ['Aveo', 'Optra', 'Spark', 'Accent'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
  },
  {
    id: 'prod-03',
    name: 'Filtro de aceite',
    application: 'Aveo 1.6 / Optra',
    brand: 'Mann Filter',
    reference: 'W610/6',
    price: 680.00,
    stock: 40,
    category: 'filtros',
    imageType: 'oil_filter',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 (2006-2012)',
      'Chevrolet Optra 1.4 / 1.8 (2005-2012)',
      'Daewoo Lanos / Nubira 1.5-1.6',
      'Chevrolet Corsa 1.4 / 1.6'
    ],
    oemCodes: ['GM 96879797', 'GM 94632619', 'FRAM PH3387A'],
    crossReferences: [
      { brand: 'Wix', code: '51040', notes: 'Válvula antidrenaje de silicona' },
      { brand: 'Fram Extra Guard', code: 'PH3387A', notes: 'Filtración celulosa sintética' },
      { brand: 'Millard', code: 'ML-3387', notes: 'Rosca M18 x 1.5' }
    ],
    vehicleBrands: ['Chevrolet'],
    vehicleModels: ['Aveo', 'Optra', 'Corsa'],
    years: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012]
  },
  {
    id: 'prod-04',
    name: 'Pastillas de freno',
    application: 'Aveo / Spark / Sonic',
    brand: 'Brembo',
    reference: 'P59034',
    price: 2420.00,
    stock: 18,
    category: 'frenos',
    imageType: 'brake_pads',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 (2006-2014)',
      'Chevrolet Spark GT 1.2 (2011-2017)',
      'Chevrolet Sonic 1.6 (2012-2016)'
    ],
    oemCodes: ['GM 96405129', 'GM 96534653', 'BENDIX DB1482'],
    crossReferences: [
      { brand: 'Wagner Ceramic', code: 'QC1037', notes: 'Compuesto cerámico bajo polvo' },
      { brand: 'Raybestos', code: 'ATD1037C', notes: 'Láminas antirruido vulcanizadas' },
      { brand: 'Ferodo', code: 'FDB1448', notes: 'Homologación ECE R90' }
    ],
    vehicleBrands: ['Chevrolet'],
    vehicleModels: ['Aveo', 'Spark', 'Sonic'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
  },
  {
    id: 'prod-05',
    name: 'Filtro de aire',
    application: 'Aveo 1.6 / Optra',
    brand: 'Fram',
    reference: 'CA10673',
    price: 890.00,
    stock: 32,
    category: 'filtros',
    imageType: 'air_filter',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 (2006-2012)',
      'Chevrolet Aveo Emotion 1.6',
      'Chevrolet Optra Design 1.8 (2007-2011)'
    ],
    oemCodes: ['GM 96536696', 'MANN C2324', 'WIX 49007'],
    crossReferences: [
      { brand: 'Mann Filter', code: 'C 2324', notes: 'Sello de poliuretano inyectado' },
      { brand: 'Wix', code: 'WA9508', notes: 'Capacidad de retención 99.4%' },
      { brand: 'Acdelco', code: 'A3097C', notes: 'Especificación OEM' }
    ],
    vehicleBrands: ['Chevrolet'],
    vehicleModels: ['Aveo', 'Optra'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012]
  },
  {
    id: 'prod-06',
    name: 'Correa de distribución',
    application: 'Aveo 1.6',
    brand: 'Gates',
    reference: 'T247',
    price: 3650.00,
    stock: 10,
    category: 'motor',
    imageType: 'timing_belt',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 16V (2006-2014)',
      'Daewoo Nubira 1.6 16V',
      'Chevrolet Tacuma 1.6'
    ],
    oemCodes: ['GM 96417177', 'CONTITECH CT887', 'DAYCO 94747'],
    crossReferences: [
      { brand: 'Continental ContiTech', code: 'CT887', notes: '127 dientes / Ancho 25mm HNBR' },
      { brand: 'Dayco Isoran', code: '94747', notes: 'Perfil parabólico alta resistencia' },
      { brand: 'Flennor', code: '4247V', notes: 'Refuerzo de fibra de vidrio' }
    ],
    vehicleBrands: ['Chevrolet'],
    vehicleModels: ['Aveo'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
  },
  {
    id: 'prod-07',
    name: 'Líquido de frenos DOT 4',
    application: 'Universal',
    brand: 'Bardahl',
    reference: 'BD-401',
    price: 420.00,
    stock: 50,
    category: 'frenos',
    imageType: 'brake_fluid',
    compatibleVehicles: [
      'Universal - Apto para todos los vehículos',
      'Sistemas ABS, ESP y tambor/disco'
    ],
    oemCodes: ['DOT 4 ISO 4925', 'SAE J1704', 'FMVSS 116'],
    crossReferences: [
      { brand: 'Castrol Brake Fluid', code: 'DOT4-500', notes: 'Punto ebullición seco 260°C' },
      { brand: 'Prestone', code: 'AS400', notes: 'Protección anticorrosión avanzada' },
      { brand: 'Brembo Premium', code: 'L04005', notes: 'Baja viscosidad a bajas temp' }
    ],
    vehicleBrands: ['Universal', 'Chevrolet', 'Toyota', 'Ford', 'Nissan'],
    vehicleModels: ['Todos'],
    years: [2000, 2005, 2010, 2015, 2020, 2024]
  },
  {
    id: 'prod-08',
    name: 'Batería 12V 60Ah',
    application: 'Aveo / Spark',
    brand: 'Willard',
    reference: '54515',
    price: 6850.00,
    stock: 8,
    category: 'baterias',
    imageType: 'car_battery',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 (2006-2015)',
      'Chevrolet Spark 1.0 (2007-2015)',
      'Toyota Yaris 1.3 / 1.5 (2006-2012)',
      'Renault Clio 1.6 (2004-2010)'
    ],
    oemCodes: ['BCI Grupo 47', 'DIN 55D23L', 'CCA 550A'],
    crossReferences: [
      { brand: 'Duncan', code: 'Libre Mantenimiento 800', notes: 'Borne estándar derecho' },
      { brand: 'Titanio', code: 'TIT-60AH', notes: 'Placas reforzadas calcio-plata' },
      { brand: 'Bosch S4', code: 'S4-002', notes: 'Arranque en frío 540A CCA' }
    ],
    vehicleBrands: ['Chevrolet', 'Toyota', 'Renault'],
    vehicleModels: ['Aveo', 'Spark', 'Yaris', 'Clio'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
  },
  {
    id: 'prod-09',
    name: 'Aceite 15W-40 Mineral Galón (3.785L)',
    application: 'Motor a Gasolina / Diésel Ligero',
    brand: 'Shell Helix',
    reference: 'HX5-15W40',
    price: 2450.00,
    stock: 35,
    category: 'aceites',
    imageType: 'oil_gallon',
    compatibleVehicles: [
      'Chevrolet Aveo, Optra, Corsa, Silverado',
      'Toyota Corolla 1.6 / 1.8, Hilux 2.7',
      'Ford Fiesta, Focus, Explorer 4.0',
      'Universal motores > 100.000 km'
    ],
    oemCodes: ['API SP / SN PLUS', 'ACEA A3/B3'],
    crossReferences: [
      { brand: 'Mobil Super 1000', code: '15W40-GAL', notes: 'Protección mineral premium' },
      { brand: 'Castrol GTX', code: '15W40-4L', notes: 'Fórmula anti-lodos Ultra Clean' },
      { brand: 'PDV Extra Multigrado', code: '15W40-VEN', notes: 'Grado API SN' }
    ],
    vehicleBrands: ['Universal', 'Chevrolet', 'Toyota', 'Ford'],
    vehicleModels: ['Todos', 'Aveo', 'Corolla', 'Hilux', 'Fiesta'],
    years: [2000, 2005, 2008, 2010, 2012, 2015, 2018, 2020]
  },
  {
    id: 'prod-10',
    name: 'Aceite 20W-50 Alto Kilometraje Litro',
    application: 'Motores con desgaste / Protección Térmica',
    brand: 'Mobil Super',
    reference: 'MS20W50-1L',
    price: 780.00,
    stock: 65,
    category: 'aceites',
    imageType: 'oil_bottle',
    compatibleVehicles: [
      'Universal - Motores de 4, 6 y 8 cilindros',
      'Chevrolet Silverado, Corsa, Aveo alto rodaje',
      'Ford Explorer, F-150, Fiesta Power'
    ],
    oemCodes: ['API SL / SM', 'SAE 20W-50'],
    crossReferences: [
      { brand: 'Castrol GTX High Mileage', code: '20W50-1QT', notes: 'Sella fugas y acondiciona sellos' },
      { brand: 'Valvoline MaxLife', code: 'VV150', notes: 'Tecnología sintética para >150k km' }
    ],
    vehicleBrands: ['Universal', 'Chevrolet', 'Ford'],
    vehicleModels: ['Todos', 'Silverado', 'Explorer', 'Aveo'],
    years: [2000, 2004, 2006, 2008, 2010, 2012, 2015]
  },
  {
    id: 'prod-11',
    name: 'Refrigerante 50/50 Verde Galón 3.785L',
    application: 'Radiadores de Aluminio y Cobre',
    brand: 'Prestone',
    reference: 'AF2100',
    price: 1350.00,
    stock: 28,
    category: 'refrigerantes',
    imageType: 'coolant_gallon',
    compatibleVehicles: [
      'Universal para todos los sistemas de enfriamiento',
      'Protección hasta 129°C y anticongelante -37°C'
    ],
    oemCodes: ['ASTM D3306', 'SAE J1034'],
    crossReferences: [
      { brand: 'Bardahl Kool', code: 'BD-5050', notes: 'Fórmula anticorrosiva con silicato' },
      { brand: 'Valvoline Zerex', code: 'ZXGO51', notes: 'Larga duración 5 años / 240.000 km' }
    ],
    vehicleBrands: ['Universal', 'Chevrolet', 'Toyota', 'Ford', 'Nissan', 'Hyundai'],
    vehicleModels: ['Todos'],
    years: [2000, 2005, 2010, 2015, 2020, 2024]
  },
  {
    id: 'prod-12',
    name: 'Amortiguador Delantero a Gas',
    application: 'Chevrolet Aveo (2006-2015)',
    brand: 'Monroe',
    reference: '72235',
    price: 3150.00,
    stock: 14,
    category: 'suspension',
    imageType: 'shock_absorber',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 Hatchback y Sedan (2006-2015)',
      'Pontiac G3 (2007-2010)'
    ],
    oemCodes: ['GM 96586885', 'KYB 333417', 'GABRIEL G51834'],
    crossReferences: [
      { brand: 'KYB Excel-G', code: '333417', notes: 'Válvula de triple etapa bitubo' },
      { brand: 'Gabriel Ultra', code: 'G51834', notes: 'Vástago cromado templado' },
      { brand: 'Cofap', code: 'GP32840', notes: 'Presurizado con nitrógeno' }
    ],
    vehicleBrands: ['Chevrolet'],
    vehicleModels: ['Aveo'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
  },
  {
    id: 'prod-13',
    name: 'Kit de Embrague Completo 3 Pzs',
    application: 'Aveo 1.6 (Prensa, Disco, Collarín)',
    brand: 'Valeo',
    reference: '826345',
    price: 5400.00,
    stock: 7,
    category: 'transmision',
    imageType: 'clutch_kit',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 (2006-2014)',
      'Daewoo Lanos 1.6 16V',
      'Chevrolet Optra 1.4'
    ],
    oemCodes: ['GM 96343034', 'LUK 622 3097 00', 'SACHS 3000 951 028'],
    crossReferences: [
      { brand: 'LuK RepSet', code: '622 3097 00', notes: 'Diámetro 215mm / 24 estrías' },
      { brand: 'Sachs Performance', code: '3000 951 028', notes: 'Resortes reforzados progresivos' }
    ],
    vehicleBrands: ['Chevrolet'],
    vehicleModels: ['Aveo'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
  },
  {
    id: 'prod-14',
    name: 'Silicón Mega Grey Alta Temp 85g',
    application: 'Cárter, Bombas de Agua, Tapa Válvulas',
    brand: 'Permatex',
    reference: '82194',
    price: 360.00,
    stock: 45,
    category: 'quimicos',
    imageType: 'silicone_tube',
    compatibleVehicles: [
      'Universal - Apto para tapas de distribución y cajas de agua',
      'Resiste aceites sintéticos y anticongelante hasta 343°C'
    ],
    oemCodes: ['OEM Specified 9985991'],
    crossReferences: [
      { brand: 'Loctite SI 598', code: '59875', notes: 'Vulcanizado rápido a temperatura ambiente' },
      { brand: 'Abro Grey 999', code: '9-AB', notes: 'Silicona neutra no corrosiva' }
    ],
    vehicleBrands: ['Universal'],
    vehicleModels: ['Todos'],
    years: [2000, 2005, 2010, 2015, 2020, 2024]
  },
  {
    id: 'prod-15',
    name: 'Bomba de Agua con Empacadura',
    application: 'Chevrolet Aveo 1.6 / Optra Design',
    brand: 'Dolz',
    reference: 'D-211',
    price: 1980.00,
    stock: 11,
    category: 'motor',
    imageType: 'water_pump',
    compatibleVehicles: [
      'Chevrolet Aveo 1.6 (2006-2015)',
      'Chevrolet Optra 1.8 Design',
      'Daewoo Nubira 1.6'
    ],
    oemCodes: ['GM 96352650', 'SKF VKPC 80602', 'AIRTEX 1656'],
    crossReferences: [
      { brand: 'GMB Japan', code: 'GWG-92A', notes: 'Rodamiento de precisión blindado' },
      { brand: 'SKF Aquamax', code: 'VKPC 80602', notes: 'Turbina de fundición balanceada' }
    ],
    vehicleBrands: ['Chevrolet'],
    vehicleModels: ['Aveo', 'Optra'],
    years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
  },
  {
    id: 'prod-16',
    name: 'Filtro de Gasolina en Línea',
    application: 'Toyota Corolla / Yaris / Hilux',
    brand: 'Mann Filter',
    reference: 'WK511/1',
    price: 720.00,
    stock: 22,
    category: 'filtros',
    imageType: 'fuel_filter',
    compatibleVehicles: [
      'Toyota Corolla 1.6 / 1.8 (2003-2014)',
      'Toyota Yaris 1.3 / 1.5 (2005-2013)',
      'Toyota Hilux 2.7 VVTi (2006-2015)'
    ],
    oemCodes: ['Toyota 23300-21010', 'FRAM G10157'],
    crossReferences: [
      { brand: 'Fram Fuel Shield', code: 'G10157', notes: 'Carcasa de acero anticorrosiva' },
      { brand: 'Wix Filters', code: '33560', notes: 'Conexión rápida tipo clip' }
    ],
    vehicleBrands: ['Toyota'],
    vehicleModels: ['Corolla', 'Yaris', 'Hilux'],
    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
  }
];

// Initial Cart items that EXACTLY match the uploaded screenshot!
export const INITIAL_CART_ITEMS = [
  {
    id: 'cart-1',
    product: PRODUCTS[0], // Sensor de oxígeno Aveo
    quantity: 1,
    unitPrice: 2850.00,
    total: 2850.00
  },
  {
    id: 'cart-2',
    product: PRODUCTS[1], // Bujía de iridio NGK
    quantity: 4,
    unitPrice: 1250.00,
    total: 5000.00
  },
  {
    id: 'cart-3',
    product: PRODUCTS[2], // Filtro de aceite Mann
    quantity: 1,
    unitPrice: 680.00,
    total: 680.00
  },
  {
    id: 'cart-4',
    product: PRODUCTS[3], // Pastillas de freno Brembo
    quantity: 1,
    unitPrice: 2420.00,
    total: 2420.00
  }
];

export const INITIAL_CLIENTS = [
  { id: 'c1', name: 'Consumidor Final', doc: 'V-00000000', phone: '0414-0000000', type: 'Público General' },
  { id: 'c2', name: 'Taller Mecánico El Chivo C.A.', doc: 'J-31459820-1', phone: '0412-5551234', type: 'Taller / Mayorista' },
  { id: 'c3', name: 'Inversiones Auto Repuestos El Ávila', doc: 'J-40192837-5', phone: '0424-9876543', type: 'Distribuidor' },
  { id: 'c4', name: 'Carlos Mendoza', doc: 'V-18.423.901', phone: '0416-3334455', type: 'Cliente Frecuente' },
  { id: 'c5', name: 'Transportes y Flotas Guayana S.A.', doc: 'J-29837162-0', phone: '0414-7778899', type: 'Flota Comercial' },
];
