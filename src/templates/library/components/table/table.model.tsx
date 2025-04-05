'use client';

import { PaginatedResponse } from "@/common/dtos/base-pagination.dto";
import { Invoice } from "@/common/models/invoice.model";
import { formatCurrency, formatEnergy } from "@/common/utils/format";
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridColDef } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export interface ITableModel {
  tableData: PaginatedResponse<Invoice>;
  columns: GridColDef<Invoice>[];
}

export const useTableModel = (initialTableData: PaginatedResponse<Invoice>): ITableModel => {
  const [tableData] = useState<PaginatedResponse<Invoice>>(initialTableData);

  const columns: GridColDef<Invoice>[] = [
    {
      field: 'customer.number',
      flex: 2,
      headerName: 'Número do cliente',
      renderCell: (params) => (
        params.row.customer.number
      ),
      sortable: true,
    },
    {
      field: 'installationNumber',
      flex: 2,
      headerName: 'Número da instalação',
      renderCell: (params) => (
        params.row.installationNumber
      ),
      sortable: true,
    },
    {
      field: 'invoiceAmount',
      flex: 2,
      headerName: 'Valor da fatura',
      renderCell: (params) => (
        formatCurrency(params.row.invoiceAmount)
      ),
      sortable: true,
    },
    {
      field: 'invoiceMonth',
      flex: 2,
      headerName: 'Mês da fatura',
      renderCell: (params) => (
        format(parseISO(params.row.invoiceMonth), 'MMMM yyyy', { locale: ptBR }).toUpperCase()
      ),
      sortable: true,
    },
    {
      field: 'eletricalEnergyQuantity',
      headerName: 'Energia elétrica',
      flex: 2,
      renderCell: (params) => (
        formatEnergy(params.row.electricalEnergyQuantity)
      ),
      sortable: true,
    },
    {
      flex: 2,
      field: 'invoiceAmount',
      headerName: 'Valor da fatura',
      renderCell: (params) => (
        formatCurrency(params.row.invoiceAmount)
      ),
      sortable: true,
    },
    {
      flex: 2,
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <Box>
          <Tooltip title="Visualizar fatura" arrow>
            <IconButton color="primary">
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return {
    tableData,
    columns,
  };
};
