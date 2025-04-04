import { Invoice } from "@/common/models/invoice.model";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatEnergy } from '@/common/utils/format';

export interface IChartsProps {
  data: Invoice[];
}

export const Charts = ({ data }: IChartsProps) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 2,
      flex: 1,
      width: '100%'
    }}>
      <Card sx={{
        backgroundColor: 'black',
        flex: 1,
        width: '50%'
      }}>
        <CardContent>
          <BarChartComponent data={data} />
        </CardContent>
      </Card>
      <Card sx={{
        backgroundColor: 'black',
        flex: 1,
        width: '50%'
      }}>
        <CardContent>
          <PieChartComponent data={data} />
        </CardContent>
      </Card>
    </Box>
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

const PieChartComponent = ({ data }: IBarChartProps) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const totalData = data.reduce((acc, invoice) => {
    return {
      energiaEletrica: acc.energiaEletrica + Number(invoice.electricalEnergyQuantity),
      energiaCompensada: acc.energiaCompensada + Number(invoice.compensatedEnergyQuantity),
      valorTotal: acc.valorTotal + Number(invoice.invoiceAmount),
      iluminacaoPublica: acc.iluminacaoPublica + Number(invoice.publicLightingPrice),
      scee: acc.scee + Number(invoice.sceeEnergyQuantity)
    };
  }, {
    energiaEletrica: 0,
    energiaCompensada: 0,
    valorTotal: 0,
    iluminacaoPublica: 0,
    scee: 0
  });

  const pieData = [
    { name: 'Energia Elétrica', value: totalData.energiaEletrica },
    { name: 'Energia Compensada', value: totalData.energiaCompensada },
    { name: 'Valor Total', value: totalData.valorTotal },
    { name: 'Iluminação Pública', value: totalData.iluminacaoPublica },
    { name: 'SCEE', value: totalData.scee }
  ];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'auto', gap: 2 }}>
      <Typography variant="h6">Distribuição dos Valores Totais</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};