import { Invoice } from '@/common/models/invoice.model';
import { PaginatedResponse } from '@/common/dtos/base-pagination.dto';
import { useState } from 'react';

export interface IDashboardModel {
  invoices: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;
  totalInvoiceAmount: number;
  averageInvoiceAmount: number;
  totalCompensatedEnergy: number;
  totalElectricalEnergy: number;
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

export const useDashboardModel = (invoicesData: PaginatedResponse<Invoice>): IDashboardModel => {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData.data);


  const totalInvoiceAmount = calculateTotalInvoiceAmount(invoices);
  const averageInvoiceAmount = calculateAverageInvoiceAmount(totalInvoiceAmount, invoices.length);
  const totalCompensatedEnergy = calculateTotalCompensatedEnergy(invoices);
  const totalElectricalEnergy = calculateTotalElectricalEnergy(invoices);

  return {
    invoices,
    setInvoices,
    totalInvoiceAmount,
    averageInvoiceAmount,
    totalCompensatedEnergy,
    totalElectricalEnergy,
  };
};

export const dashboardCalculations = {
  calculateTotalInvoiceAmount,
  calculateAverageInvoiceAmount,
  calculateTotalCompensatedEnergy,
  calculateTotalElectricalEnergy,
};