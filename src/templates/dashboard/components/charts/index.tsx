import { Invoice } from "@/common/models/invoice.model";
import { Box, Card, CardContent } from "@mui/material";
import { PieChartComponent } from "./pie-chart";
import { BarChartComponent } from "./bar-chart";

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
        backgroundColor: 'primary.main',
        flex: 1,
        width: '50%'
      }}>
        <CardContent>
          <BarChartComponent data={data} />
        </CardContent>
      </Card>
      <Card sx={{
        backgroundColor: 'primary.main',
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

