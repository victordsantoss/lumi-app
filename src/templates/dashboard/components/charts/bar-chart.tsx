import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatEnergy } from '@/common/utils/format';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Invoice } from '@/common/models/invoice.model';

export interface IBarChartProps {
  data: Invoice[];
}

export const BarChartComponent = ({ data }: IBarChartProps) => {
  const monthsInOrder = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const monthlyData = data.reduce((acc: { [key: string]: number }, invoice) => {
    const month = format(new Date(invoice.invoiceMonth), 'MMMM', { locale: ptBR }).toLowerCase();
    const energy = Number(invoice.electricalEnergyQuantity);

    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += energy;

    return acc;
  }, {});

  const chartData = Object.entries(monthlyData)
    .map(([month, energy]) => ({
      month: month.charAt(0).toUpperCase() + month.slice(1),
      consumo: energy
    }))
    .sort((a, b) => {
      const indexA = monthsInOrder.indexOf(a.month.toLowerCase());
      const indexB = monthsInOrder.indexOf(b.month.toLowerCase());
      return indexA - indexB;
    });

  if (!chartData.length) {
    return <Typography variant="h6">Nenhum dado encontrado</Typography>
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'auto', gap: 2 }}>
      <Typography variant="h6">Energia Elétrica por Mês</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => formatEnergy(value)} />
          <Legend />
          <Bar dataKey="consumo" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

