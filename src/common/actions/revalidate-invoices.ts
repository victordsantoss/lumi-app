'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateInvoices() {
  revalidateTag('list-library-invoices')
}