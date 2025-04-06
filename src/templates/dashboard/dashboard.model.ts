import { Invoice } from '@/common/models/invoice.model';
import { PaginatedResponse } from '@/common/dtos/base-pagination.dto';

export interface IUserConsumption {
  customerNumber: string;
  totalConsumption: number;
  totalSpent: number;
}

export interface IDashboardModel {
  totalInvoiceAmount: number;
  averageInvoiceAmount: number;
  totalCompensatedEnergy: number;
  totalElectricalEnergy: number;
  userConsumptions: IUserConsumption[];
}

const calculateTotalInvoiceAmount = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => total + Number(invoice.invoiceAmount), 0);
};

const calculateAverageInvoiceAmount = (totalAmount: number, invoicesLength: number): number => {
  return totalAmount / invoicesLength;
};

const calculateTotalCompensatedEnergy = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => total + Number(invoice.compensatedEnergyQuantity), 0);
};

const calculateTotalElectricalEnergy = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => total + Number(invoice.electricalEnergyQuantity), 0);
};

const calculateUserConsumptions = (invoices: Invoice[]): IUserConsumption[] => {
  const userMap = new Map<string, { totalConsumption: number; totalSpent: number }>();

  invoices.forEach((invoice) => {
    const customerNumber = invoice.customer.number;
    const currentData = userMap.get(customerNumber) || { totalConsumption: 0, totalSpent: 0 };

    userMap.set(customerNumber, {
      totalConsumption: currentData.totalConsumption + Number(invoice.electricalEnergyQuantity),
      totalSpent: currentData.totalSpent + Number(invoice.invoiceAmount),
    });
  });

  return Array.from(userMap.entries()).map(([customerNumber, data]) => ({
    customerNumber,
    totalConsumption: data.totalConsumption,
    totalSpent: data.totalSpent,
  }));
};

export const useDashboardModel = (invoicesData: PaginatedResponse<Invoice>): IDashboardModel => {

  const totalInvoiceAmount = calculateTotalInvoiceAmount(invoicesData.data);
  const averageInvoiceAmount = calculateAverageInvoiceAmount(totalInvoiceAmount, invoicesData.data.length);
  const totalCompensatedEnergy = calculateTotalCompensatedEnergy(invoicesData.data);
  const totalElectricalEnergy = calculateTotalElectricalEnergy(invoicesData.data);
  const userConsumptions = calculateUserConsumptions(invoicesData.data);

  return {
    totalInvoiceAmount,
    averageInvoiceAmount,
    totalCompensatedEnergy,
    totalElectricalEnergy,
    userConsumptions,
  };
};

export const dashboardCalculations = {
  calculateTotalInvoiceAmount,
  calculateAverageInvoiceAmount,
  calculateTotalCompensatedEnergy,
  calculateTotalElectricalEnergy,
  calculateUserConsumptions,
};