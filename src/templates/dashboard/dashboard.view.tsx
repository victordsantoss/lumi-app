// src/templates/dashboard/dashboard.view.tsx
import {
  Box,
  Typography,
  useTheme,
} from '@mui/material';

import { IDashboardViewProps } from './dashboard.types';

export const DashboardView = ({
  totalInvoiceAmount,
  averageInvoiceAmount,
  totalCompensatedEnergy,
  totalElectricalEnergy,
  invoices,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  isLoading
}: IDashboardViewProps) => {
  const theme = useTheme();

  console.log("invoices", invoices)


  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
    </Box>

  );
};