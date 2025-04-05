import { Invoice } from './invoice.model';
export interface File {
  id: string;
  name: string;
  size: number;
  buffer: Buffer;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  invoice: Invoice;
}
