import { Invoice } from './invoice.model';
export interface IFile {
  id: string;
  buffer: Buffer;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  invoice: Invoice;
}
