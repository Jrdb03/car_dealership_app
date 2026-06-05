import { Vehicle } from '../../products/interfaces/vehicle.interface';

export interface Sale {
  _id: string;
  user: string;
  items: SaleItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  _id?: string;
  vehicle: any;
  quantity: number;
  price: number;
}
