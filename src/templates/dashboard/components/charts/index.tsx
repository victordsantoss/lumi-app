import { Invoice } from "@/common/models/invoice.model";
import { Box, Card, CardContent } from "@mui/material";
import { TotalValuesChart } from "./total-values-chart";
import { ConsumptionChart } from "./consumption-chart";
import { UserConsumptionChart } from './user-consumption-chart';
import { IUserConsumption } from "../../dashboard.model";

export interface IChartsProps {
  data: Invoice[];
  userConsumptions: IUserConsumption[];
}

export const Charts = ({ data, userConsumptions }: IChartsProps) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 2,
      flex: 1,
      width: '100%'
    }}>
      <Card
        elevation={10}
        sx={{
          backgroundColor: 'primary.main',
          flex: 1,
          width: { xs: '100%', md: '50%' }
        }}>
        <CardContent>
          <ConsumptionChart data={data} />
        </CardContent>
      </Card>
      <Card
        elevation={10}
        sx={{
          backgroundColor: 'primary.main',
          flex: 1,
          width: { xs: '100%', md: '50%' }
        }}>
        <CardContent>
          <TotalValuesChart data={data} />
        </CardContent>
      </Card>
      <Card
        elevation={10}
        sx={{
          backgroundColor: 'primary.main',
          flex: 1,
          width: { xs: '100%', md: '50%' }
        }}>
        <CardContent>
          <UserConsumptionChart data={userConsumptions} />
        </CardContent>
      </Card>
    </Box>
  );
};


