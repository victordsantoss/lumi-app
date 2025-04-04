import { Invoice } from './invoice.model';

export interface Customer {
  id: string;
  number: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  invoices: Invoice[];
}
