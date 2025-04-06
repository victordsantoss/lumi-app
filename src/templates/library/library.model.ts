'use client';

import { PaginatedResponse } from "@/common/dtos/base-pagination.dto";
import { Invoice } from "@/common/models/invoice.model";


export const useLibraryModel = (initialInvoicesData: PaginatedResponse<Invoice>) => {
  return {
    initialInvoicesData,
  };
};
