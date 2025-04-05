import { PaginatedResponse } from "@/common/dtos/base-pagination.dto";
import { Invoice } from "@/common/models/invoice.model";

export interface ILibraryViewModelProps {
  invoicesData: PaginatedResponse<Invoice>;
}

export interface ILibraryViewProps {
  invoices: PaginatedResponse<Invoice>;
}
