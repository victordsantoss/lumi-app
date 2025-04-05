import { PaginatedResponse } from '@/common/dtos/base-pagination.dto';
import { IFetchSuccessResponse, IFetchErrorResponse } from '@/common/dtos/fetch.dto';
import { Invoice } from '@/common/models/invoice.model';
import { apiFetch, handleApiError } from '@/configs/api/fetch';
import { LibraryViewModel } from '@/templates/library/library.view-model';

export type IInvoiceResponseDto = PaginatedResponse<Invoice>

export type InvoicesResponse =
  | IFetchSuccessResponse<IInvoiceResponseDto>
  | IFetchErrorResponse

export default async function Library() {

  const listInvoicesEndpoint = `/invoice`;

  const [invoices] = await Promise.all([
    await apiFetch<InvoicesResponse>(listInvoicesEndpoint, {
      method: 'GET',
      next: {
        tags: ['list-invoices'],
      },
      cache: 'no-cache',
    })
  ])

  const invoicesData = handleApiError<IInvoiceResponseDto>(invoices);


  return <LibraryViewModel invoicesData={invoicesData} />;
}

