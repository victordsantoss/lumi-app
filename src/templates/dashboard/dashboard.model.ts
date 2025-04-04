import { Invoice } from '@/common/models/invoice.model';
import { PaginatedResponse } from '@/common/dtos/base-pagination.dto';
import { useState } from 'react';

export interface IDashboardModel {
  invoices: PaginatedResponse<Invoice>;
  setInvoices: (invoices: PaginatedResponse<Invoice>) => void;
  totalInvoiceAmount: number;
  averageInvoiceAmount: number;
  totalCompensatedEnergy: number;
  totalElectricalEnergy: number;
}

const calculateTotalInvoiceAmount = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => total + invoice.invoiceAmount, 0);
};

const calculateAverageInvoiceAmount = (totalAmount: number, invoicesLength: number): number => {
  return totalAmount / invoicesLength;
};

const calculateTotalCompensatedEnergy = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => total + invoice.compensatedEnergyQuantity, 0);
};

const calculateTotalElectricalEnergy = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => total + invoice.electricalEnergyQuantity, 0);
};

export const useDashboardModel = (invoicesData: PaginatedResponse<Invoice>): IDashboardModel => {
  const [invoices, setInvoices] = useState<PaginatedResponse<Invoice>>(invoicesData);


  const totalInvoiceAmount = calculateTotalInvoiceAmount(invoices.data);
  const averageInvoiceAmount = calculateAverageInvoiceAmount(totalInvoiceAmount, invoices.data.length);
  const totalCompensatedEnergy = calculateTotalCompensatedEnergy(invoices.data);
  const totalElectricalEnergy = calculateTotalElectricalEnergy(invoices.data);

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