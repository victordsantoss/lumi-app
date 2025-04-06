import { Invoice } from "@/common/models/invoice.model";
import { IUserConsumption } from "./dashboard.model";

export interface IDashboardViewProps {
  totalInvoiceAmount: number;
  averageInvoiceAmount: number;
  totalCompensatedEnergy: number;
  totalElectricalEnergy: number;
  invoices?: Invoice[];
  isLoading?: boolean;
  userConsumptions: IUserConsumption[];
}