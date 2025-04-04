import {
  Box,
  Typography,
} from '@mui/material';

import { IDashboardViewProps } from './dashboard.types';
import SummaryCard from './components/summary-card';

export const DashboardView = ({
  invoices,
  totalInvoiceAmount,
  averageInvoiceAmount,
  totalCompensatedEnergy,
  totalElectricalEnergy,
}: IDashboardViewProps) => {

  console.log("invoices", invoices)


  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SummaryCard
        totalInvoiceAmount={totalInvoiceAmount}
        averageInvoiceAmount={averageInvoiceAmount}
        totalCompensatedEnergy={totalCompensatedEnergy}
        totalElectricalEnergy={totalElectricalEnergy}
        totalInvoices={invoices.data.length}
      />
      <Typography variant="h4">Dashboard</Typography>
    </Box>

  );
};