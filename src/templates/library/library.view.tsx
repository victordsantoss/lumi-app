'use client';

import { Box } from "@mui/material";
import { TableViewModel } from "./components/table/table.view-model";
import { ILibraryViewProps } from "./libaray.types";

export const LibraryView = ({ invoices }: ILibraryViewProps) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TableViewModel tableData={invoices} />
    </Box>
  );
};