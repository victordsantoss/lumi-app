export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatEnergy = (value: number): string => {
  return `${new Intl.NumberFormat('pt-BR').format(value)} kWh`;
}; 