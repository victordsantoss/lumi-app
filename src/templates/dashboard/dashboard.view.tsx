import {
  Box,
  Typography,
} from '@mui/material';

import { IDashboardViewProps } from './dashboard.types';

export const DashboardView = ({
  invoices,
}: IDashboardViewProps) => {

  console.log("invoices", invoices)


  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
    </Box>

  );
};