import { Invoice } from "@/common/models/invoice.model";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface IChartsProps {
  data: Invoice[];
}

export const Charts = ({ data }: IChartsProps) => {

  return (
    <Card sx={{ backgroundColor: 'black' }}>
      <CardContent
        sx={{
          display: { xs: 'block', md: 'flex', },
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <BarChartComponent data={data} />
      </CardContent>
    </Card>
  );
};

export interface IBarChartProps {
  data: Invoice[];
}

const BarChartComponent = ({ data }: IBarChartProps) => {
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

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'auto', gap: 2 }}>
      <Typography variant="h6">Energia Elétrica por Mês</Typography>
      <ResponsiveContainer>
        <BarChart
          title="Energia Elétrica por Mês"
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consumo" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};