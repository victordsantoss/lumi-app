import { PaginatedResponse } from "@/common/dtos/base-pagination.dto";
import { Invoice } from "@/common/models/invoice.model";

export interface IDashboardViewModelProps {
  invoicesData: PaginatedResponse<Invoice>;
}

export interface IDashboardViewProps {
  totalInvoiceAmount: number;
  averageInvoiceAmount: number;
  totalCompensatedEnergy: number;
  totalElectricalEnergy: number;
  invoices: PaginatedResponse<Invoice>;
  isLoading?: boolean;
}