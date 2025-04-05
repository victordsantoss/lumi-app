'use client';
import { ILibraryViewModelProps } from "./libaray.types";
import { useLibraryModel } from "./library.model";
import { LibraryView } from "./library.view";

export const LibraryViewModel = ({ invoicesData }: ILibraryViewModelProps) => {
  const { initialInvoicesData } = useLibraryModel(invoicesData)
  return (
    <LibraryView
      invoices={initialInvoicesData}
    />
  );
};
