'use client';

import { PaginatedResponse } from "@/common/dtos/base-pagination.dto";
import { Invoice } from "@/common/models/invoice.model";
import { useTableModel } from "./table.model";
import { TableView } from "./table.view";

interface ITableViewModelProps {
  tableData: PaginatedResponse<Invoice>;
}

export const TableViewModel = ({ tableData }: ITableViewModelProps) => {
  const methods = useTableModel(tableData);

  return (
    <div>
      <TableView
        {...methods}
      />
    </div>
  );
};
