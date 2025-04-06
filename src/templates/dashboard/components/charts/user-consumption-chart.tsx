import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '@/common/utils/format';
import { IUserConsumption } from '../../dashboard.model';

export interface IUserConsumptionChartProps {
  data: IUserConsumption[];
}

export const UserConsumptionChart = ({ data }: IUserConsumptionChartProps) => {
  const chartData = data.map((user) => ({
    name: `Cliente ${user.customerNumber}`,
    consumo: user.totalConsumption,
    gasto: user.totalSpent
  }));

  if (!chartData.length) {
    return <Typography variant="h6">Nenhum dado encontrado</Typography>
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'auto', gap: 2 }}>
      <Typography variant="h6">Consumo e Gasto por Cliente</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'gasto') {
                return formatCurrency(value);
              }
              return value.toFixed(2);
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="consumo" name="Consumo (kWh)" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="gasto" name="Gasto (R$)" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}; 