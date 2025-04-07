'use client';

import { Invoice } from "@/common/models/invoice.model";
import { formatCurrency, formatEnergy } from "@/common/utils/format";
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useEffect, useState } from "react";
import { PaginatedResponse } from "@/common/dtos/base-pagination.dto";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useFile } from "@/components/upload-invoice-modal/file.model";
import { defaultMessages } from "@/common/utils/messages.utils";

export interface ITableModelProps {
  tableData: PaginatedResponse<Invoice>
}

export const useTableModel = ({ tableData }: ITableModelProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const { downloadPdf } = useFile()
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
          {params.row?.customer?.number ?? defaultMessages.notFound}
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
          {params.row?.installationNumber ?? defaultMessages.notFound}
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
      field: 'electricalEnergyQuantity',
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
      headerName: 'Data da fatura',
      renderCell: (params) => {
        return (
          <Typography textTransform={'capitalize'}>
            {params.row?.invoiceMonth ?? defaultMessages.notFound}
          </Typography>
        )
      },
      sortable: false,
    },
    {
      field: 'invoiceDueDate',
      flex: 2,
      headerName: 'Data de vencimento fatura',
      renderCell: (params) => {

        return (
          <Typography textTransform={'capitalize'}>
            {params.row?.invoiceDueDate ?? defaultMessages.notFound}
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
                if (params.row?.file?.buffer) {
                  downloadPdf(params.row.file.buffer, params.row.file.name)
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
  return {
    columns,
    currentLimit,
    setCurrentLimit,
    currentPage,
    setCurrentPage,
    sortModel,
    handleSortModel,
  };
};
