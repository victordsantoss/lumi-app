'use client';

import { Box } from "@mui/material";
import { TableViewModel } from "./components/table/table.view-model";
import { ILibraryViewProps } from "./libaray.types";
import { FilterViewModel } from "./components/filter/filter.view-model";

export const LibraryView = ({ invoices }: ILibraryViewProps) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <FilterViewModel />
      <TableViewModel tableData={invoices} />
    </Box>
  );
};