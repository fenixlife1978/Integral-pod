export interface Product {
  id: string;
  name: string;
  application: string;
  brand: string;
  reference: string;
  price: number; // in Bs.
  stock: number;
  category: string;
  imageType: string;
  compatibleVehicles: string[];
  oemCodes?: string[];
  crossReferences?: {
    brand: string;
    code: string;
    notes?: string;
  }[];
  vehicleBrands: string[]; // e.g. ['Chevrolet', 'Toyota']
  vehicleModels: string[]; // e.g. ['Aveo', 'Optra', 'Spark']
  years: number[]; // e.g. [2006, 2007, 2008, 2009, 2010, 2011, 2012]
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface SaleInfo {
  clientName: string;
  clientDoc: string;
  cashRegister: string;
  seller: string;
  paymentMethod: string;
  discountPercent: number;
  taxRate: number; // 0.16 (16%)
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
}
