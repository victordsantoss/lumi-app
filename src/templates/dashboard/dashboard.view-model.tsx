'use client';

import { useDashboardModel } from './dashboard.model';
import { DashboardView } from './dashboard.view';
import { IDashboardViewModelProps } from './dashboard.types';

const DashboardViewModel = ({ invoicesData }: IDashboardViewModelProps) => {
  const { invoices, totalInvoiceAmount, averageInvoiceAmount, totalCompensatedEnergy, totalElectricalEnergy } = useDashboardModel(invoicesData)

  return (
    <DashboardView
      invoices={invoices}
      page={1}
      rowsPerPage={10}
      onPageChange={() => { }}
      onRowsPerPageChange={() => { }}
      totalInvoiceAmount={totalInvoiceAmount}
      averageInvoiceAmount={averageInvoiceAmount}
      totalCompensatedEnergy={totalCompensatedEnergy}
      totalElectricalEnergy={totalElectricalEnergy}
    >
    </DashboardView>
  );
};

export default DashboardViewModel;