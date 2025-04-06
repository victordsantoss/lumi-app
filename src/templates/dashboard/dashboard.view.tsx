import {
  Box,
} from '@mui/material';

import { IDashboardViewProps } from './dashboard.types';
import SummaryCard from './components/summary-card';
import { Charts } from './components/charts';
import { EmptyInvoices } from './components/empty-invoices';

export const DashboardView = ({
  invoices,
  totalInvoiceAmount,
  averageInvoiceAmount,
  totalCompensatedEnergy,
  totalElectricalEnergy,
  userConsumptions
}: IDashboardViewProps) => {

  if (!invoices?.length) {
    return <EmptyInvoices />
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SummaryCard
        totalInvoiceAmount={totalInvoiceAmount}
        averageInvoiceAmount={averageInvoiceAmount}
        totalCompensatedEnergy={totalCompensatedEnergy}
        totalElectricalEnergy={totalElectricalEnergy}
        totalInvoices={invoices?.length ?? 0} />
      <Charts
        data={invoices ?? []}
        userConsumptions={userConsumptions}
      />
    </Box>

  );
};