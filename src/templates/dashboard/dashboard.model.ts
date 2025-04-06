import { Invoice } from '@/common/models/invoice.model';
import { PaginatedResponse } from '@/common/dtos/base-pagination.dto';
import { useState } from 'react';

export interface IUserConsumption {
  customerNumber: string;
  totalConsumption: number;
  totalSpent: number;
}

export interface IDashboardModel {
  invoices: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;
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
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData.data);

  const totalInvoiceAmount = calculateTotalInvoiceAmount(invoices);
  const averageInvoiceAmount = calculateAverageInvoiceAmount(totalInvoiceAmount, invoices.length);
  const totalCompensatedEnergy = calculateTotalCompensatedEnergy(invoices);
  const totalElectricalEnergy = calculateTotalElectricalEnergy(invoices);
  const userConsumptions = calculateUserConsumptions(invoices);

  console.log(userConsumptions);

  return {
    invoices,
    setInvoices,
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