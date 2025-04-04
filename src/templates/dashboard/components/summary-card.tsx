import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { IDashboardViewProps } from '../dashboard.types';
import { useTheme } from '@mui/material/styles';
import { formatCurrency, formatEnergy } from '@/common/utils/format';


export interface ISummaryCardProps extends IDashboardViewProps {
  totalInvoices: number;
}

export default function SummaryCard({ totalCompensatedEnergy, totalElectricalEnergy, totalInvoiceAmount, averageInvoiceAmount, totalInvoices }: ISummaryCardProps) {
  return (
    <Card sx={{ backgroundColor: 'black' }}>
      <CardContent
        sx={{
          display: { xs: 'block', md: 'flex', },
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <SummaryPaper title={'Quantidade de Faturas'} value={totalInvoices} />
        <SummaryPaper title={'Valor Total das Faturas'} value={totalInvoiceAmount} isCurrency />
        <SummaryPaper title={'Energia Elétrica Total'} value={totalElectricalEnergy} isEnergy />
        <SummaryPaper title={'Valor Médio das Faturas'} value={averageInvoiceAmount} isCurrency />
        <SummaryPaper title={'Energia Comp. Total'} value={totalCompensatedEnergy} isEnergy />
      </CardContent>
    </Card>
  );
}

export interface ISummaryPaper {
  title: string;
  value: number;
  isCurrency?: boolean;
  isEnergy?: boolean;
}

export const SummaryPaper = ({ title, value, isCurrency, isEnergy }: ISummaryPaper) => {
  const theme = useTheme();
  const formatValue = () => {
    if (isCurrency) {
      return formatCurrency(value);
    }
    if (isEnergy) {
      return formatEnergy(value);
    }
    return value;
  };

  return (
    <Paper sx={{
      width: '100%',
      flex: 1,
      p: 2,
      backgroundColor: 'primary.main',
      border: `1px solid ${theme.palette.background.default}`
    }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h3" fontWeight={700}>{formatValue()}</Typography>
    </Paper>
  );
}
