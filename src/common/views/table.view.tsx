import { PaginatedResponse } from "../dtos/base-pagination.dto";
import { Invoice } from "../models/invoice.model";


export interface ITableViewProps {
  tableData: PaginatedResponse<Invoice>;
}


export const TableView = ({ tableData }: ITableViewProps) => {
  console.log("tableData", tableData)
  return <div>TableView</div>;
};
