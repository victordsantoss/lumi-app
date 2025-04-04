import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { IDashboardViewProps } from '../dashboard.types';
import { useTheme } from '@mui/material/styles';

export default function SummaryCard({ totalCompensatedEnergy, totalElectricalEnergy, totalInvoiceAmount, averageInvoiceAmount }: IDashboardViewProps) {
  return (
    <Card sx={{ backgroundColor: 'black' }}>
      <CardContent
        sx={{
          display: { xs: 'block', md: 'flex', },
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <SummaryPaper title={'Valor Total das Faturas'} value={totalInvoiceAmount} isCurrency />
        <SummaryPaper title={'Energia Elétrica Total'} value={totalElectricalEnergy} isEnergy />
        <SummaryPaper title={'Valor Médio das Faturas'} value={averageInvoiceAmount} isCurrency />
        <SummaryPaper title={'Energia Compensada Total'} value={totalCompensatedEnergy} isEnergy />
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
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    }
    if (isEnergy) {
      return `${value.toLocaleString('pt-BR')} kWh`;
    }
    return value.toLocaleString('pt-BR');
  };

  return (
    <Paper sx={{ width: '100%', p: 2, backgroundColor: 'primary.main', border: `1px solid ${theme.palette.background.default}` }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h3" fontWeight={700}>{formatValue()}</Typography>
    </Paper>
  );
}
