'use client';

import { Invoice } from "@/common/models/invoice.model";
import { formatCurrency, formatEnergy } from "@/common/utils/format";
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useEffect, useState } from "react";
import { PaginatedResponse } from "@/common/dtos/base-pagination.dto";
import { useRouter, useSearchParams, usePathname } from "next/navigation";


export interface ITableModelProps {
  tableData: PaginatedResponse<Invoice>
}
export interface ITableModel {
  columns: GridColDef<Invoice>[];
  currentLimit: number;
  setCurrentLimit: (limit: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortModel: GridSortModel;
  handleSortModel: (sortModel: GridSortModel) => void;
  handleAddNewInvoice: () => void;
}

export const useTableModel = ({ tableData }: ITableModelProps): ITableModel => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace, push } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(tableData.page ?? 1)
  const [currentLimit, setCurrentLimit] = useState<number>(tableData.limit ?? 10)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'movementDate', sort: 'desc' },
  ])
  const columns: GridColDef<Invoice>[] = [
    {
      field: 'customer.number',
      flex: 2,
      headerName: 'Número do cliente',
      renderCell: (params) => (
        <Typography>
          {params.row?.customer?.number ?? 'N/A'}
        </Typography>
      ),
      sortable: false,
    },
    {
      field: 'installationNumber',
      flex: 2,
      headerName: 'Número da instalação',
      renderCell: (params) => (
        <Typography>
          {params.row?.installationNumber ?? 'N/A'}
        </Typography>
      ),
    },
    {
      field: 'invoiceAmount',
      flex: 2,
      headerName: 'Valor da fatura',
      renderCell: (params) => (
        <Typography>
          {formatCurrency(params.row?.invoiceAmount ?? 0)}
        </Typography>
      ),
    },
    {
      field: 'eletricalEnergyQuantity',
      headerName: 'Qtd de Energia elétrica',
      flex: 2,
      renderCell: (params) => (
        <Typography>
          {formatEnergy(params.row?.electricalEnergyQuantity ?? 0)}
        </Typography>
      ),
    },
    {
      field: 'invoiceMonth',
      flex: 2,
      headerName: 'Mês da fatura',
      renderCell: (params) => {

        return (
          <Typography textTransform={'capitalize'}>
            {params.row?.invoiceMonth ? format(new Date(params.row.invoiceMonth), 'MMMM yyyy', { locale: ptBR }) : 'N/A'}
          </Typography>
        )
      },
      sortable: false,
    },
    {
      field: 'invoiceDueDate',
      flex: 2,
      headerName: 'Mês de vencimento fatura',
      renderCell: (params) => {

        return (
          <Typography textTransform={'capitalize'}>
            {params.row?.invoiceDueDate ? format(new Date(params.row.invoiceDueDate), 'MMMM yyyy', { locale: ptBR }) : 'N/A'}
          </Typography>
        )

      },
      sortable: false,
    },
    {
      flex: 1,
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <Box>
          <Tooltip title="Visualizar fatura" arrow>
            <IconButton
              color="primary"
              onClick={() => {
                if (params.row?.id) {
                  console.log(params.row)
                }
              }}
              disabled={!params.row?.id}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', currentPage?.toString())
    params.set('limit', currentLimit?.toString())

    const newUrl = `${pathname}?${params.toString()}`
    const currentUrl = `${pathname}?${searchParams.toString()}`
    if (newUrl !== currentUrl) {
      replace(newUrl)
    }
  }, [currentPage, currentLimit, searchParams, pathname, replace])

  const handleSortModel = (model: GridSortModel) => {
    const params = new URLSearchParams(searchParams.toString())
    if (model.length === 0) {
      params.delete('orderBy')
      params.delete('orderDirection')
    } else {
      params.set('orderBy', model[0].field)
      params.set('orderDirection', model[0].sort?.toUpperCase() ?? '')
    }

    setSortModel(model)
    const newUrl = `${pathname}?${params.toString()}`
    const currentUrl = `${pathname}?${searchParams.toString()}`

    if (newUrl !== currentUrl) {
      replace(newUrl, { scroll: false })
    }

  }

  const handleAddNewInvoice = () => {
    push('/library/new')
  }

  return {
    columns,
    currentLimit,
    setCurrentLimit,
    currentPage,
    setCurrentPage,
    sortModel,
    handleSortModel,
    handleAddNewInvoice
  };
};
