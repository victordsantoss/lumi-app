import { Invoice } from "@/common/models/invoice.model";

export interface IDashboardViewProps {
  totalInvoiceAmount: number;
  averageInvoiceAmount: number;
  totalCompensatedEnergy: number;
  totalElectricalEnergy: number;
  invoices?: Invoice[];
  isLoading?: boolean;
}