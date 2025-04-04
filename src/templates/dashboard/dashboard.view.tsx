import {
  Box,
} from '@mui/material';

import { IDashboardViewProps } from './dashboard.types';
import SummaryCard from './components/summary-card';
import { Charts } from './components/charts';

export const DashboardView = ({
  invoices,
  totalInvoiceAmount,
  averageInvoiceAmount,
  totalCompensatedEnergy,
  totalElectricalEnergy,
}: IDashboardViewProps) => {

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SummaryCard
        totalInvoiceAmount={totalInvoiceAmount}
        averageInvoiceAmount={averageInvoiceAmount}
        totalCompensatedEnergy={totalCompensatedEnergy}
        totalElectricalEnergy={totalElectricalEnergy}
        totalInvoices={invoices?.data.length ?? 0} />
      <Charts data={invoices?.data ?? []} />
    </Box>

  );
};