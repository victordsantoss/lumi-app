'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PaginatedResponse } from "@/common/dtos/base-pagination.dto";
import { Invoice } from "@/common/models/invoice.model";
import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales'

interface ITableViewProps {
  tableData: PaginatedResponse<Invoice>;
  columns: GridColDef<Invoice>[];
}

export const TableView = ({ tableData, columns }: ITableViewProps) => {

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={tableData.data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowHeight={() => {
          return 'auto'
        }}
        pageSizeOptions={[5, 10, 25]}
        disableColumnMenu
        disableRowSelectionOnClick
        disableColumnResize
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        sx={(theme) => ({
          '--DataGrid-containerBackground': theme.palette.primary.main,
          width: '100%',
          maxWidth: '100%',
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            paddingY: 1,
            color: theme.palette.primary.main,
            display: 'flex',
            fontSize: '16px',
            alignItems: 'center',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
          },
          '& .MuiDataGrid-columnHeader': {
            '&[aria-sort="ascending"]': {
              color: theme.palette.primary.contrastText,
            },
            '&[aria-sort="descending"]': {
              color: theme.palette.primary.contrastText,
            },
          },
          '& .MuiDataGrid-sortIcon': {
            color: theme.palette.primary.contrastText,
          },
          '& .MuiTablePagination-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiTablePagination-select': {
            color: theme.palette.primary.main,
          },
          '& .MuiTablePagination-selectIcon': {
            color: theme.palette.primary.main,
          },
        })}
      />
    </Box>
  );
};