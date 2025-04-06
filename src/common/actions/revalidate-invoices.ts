'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateLibraryInvoices() {
  revalidateTag('list-library-invoices')
}

export async function revalidateDashboardInvoices() {
  revalidateTag('list-dashboard-invoices')
}