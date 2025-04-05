import { useTableModel } from "@/templates/library/components/table/table.model";
import { PaginatedResponse } from "../dtos/base-pagination.dto";
import { Invoice } from "../models/invoice.model";
import { TableView } from "@/templates/library/components/table/table.view";

export interface ITableViewModelProps {
  tableData: PaginatedResponse<Invoice>;
}

export const TableViewModel = ({ tableData }: ITableViewModelProps) => {
  const methods = useTableModel(tableData);

  return (
    <TableView
      { ...methods }
    />
  )



}