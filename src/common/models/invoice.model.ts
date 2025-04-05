import { Customer } from './customer.model';
import { File } from './file.model';

export interface Invoice {
  id: string;
  installationNumber: string;
  invoiceMonth: Date;
  invoiceDueDate: Date;
  invoiceAmount: number;
  publicLightingPrice: number;
  compensatedEnergyQuantity: number;
  compensatedEnergyPrice: number;
  sceeEnergyQuantity: number;
  sceeEnergyPrice: number;
  electricalEnergyQuantity: number;
  electricalEnergyPrice: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  customer: Customer;
  file?: File
}
