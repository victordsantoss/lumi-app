'use client';

import { useDashboardModel } from './dashboard.model';
import { DashboardView } from './dashboard.view';
import { IDashboardViewModelProps } from './dashboard.types';

const DashboardViewModel = ({ invoicesData }: IDashboardViewModelProps) => {
  const methods = useDashboardModel(invoicesData)
  return (
    <DashboardView
      {...methods}
    />

  );
};

export default DashboardViewModel;