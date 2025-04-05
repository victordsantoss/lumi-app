'use client';

import { Invoice } from '@/common/models/invoice.model';
import { useDashboardModel } from './dashboard.model';
import { DashboardView } from './dashboard.view';
import { PaginatedResponse } from '@/common/dtos/base-pagination.dto';

export interface IDashboardViewModelProps {
  invoicesData: PaginatedResponse<Invoice>;
}

const DashboardViewModel = ({ invoicesData }: IDashboardViewModelProps) => {
  const methods = useDashboardModel(invoicesData)
  return (
    <DashboardView
      {...methods}
    />

  );
};

export default DashboardViewModel;