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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box sx={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <Typography variant="body2">{`${data.name}: ${data.name.includes('Valor') ? formatCurrency(data.value) : formatEnergy(data.value)}`}</Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'auto', gap: 2 }}>
      <Typography variant="h6">Distribuição dos Valores Totais</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              innerRadius={60}
              paddingAngle={2}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                paddingLeft: '20px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}; 