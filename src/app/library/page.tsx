import { PaginatedResponse } from '@/common/dtos/base-pagination.dto';
import { IFetchSuccessResponse, IFetchErrorResponse } from '@/common/dtos/fetch.dto';
import { Invoice } from '@/common/models/invoice.model';
import { apiFetch, handleApiError } from '@/configs/api/fetch';
import { LibraryViewModel } from '@/templates/library/library.view-model';

export type IInvoiceResponseDto = PaginatedResponse<Invoice>

export type InvoicesResponse =
  | IFetchSuccessResponse<IInvoiceResponseDto>
  | IFetchErrorResponse

export default async function Library({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  const listInvoicesEndpoint = `/invoice`;

  const [invoices] = await Promise.all([
    apiFetch<InvoicesResponse>(listInvoicesEndpoint, {
      method: 'GET',
      next: {
        tags: ['list-dashboard-invoices'],
      },
      cache: 'no-cache',
    }, searchParams)
  ])

  const invoicesData = handleApiError<IInvoiceResponseDto>(invoices);

  return <LibraryViewModel invoicesData={invoicesData} />;
}

