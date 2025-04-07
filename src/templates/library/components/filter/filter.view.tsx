import { Box, IconButton, Grid, InputAdornment, Tooltip, TextField, Button, Collapse, Divider } from "@mui/material";
import { IInputValues } from "./filter.types";
import { Close, Upload } from '@mui/icons-material'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import { AdvancedFilter } from "./advanced-filter";
import { FilterChip } from "@/components/filter-chip";
import { UploadInvoiceModal } from "@/components/upload-invoice-modal";
import { revalidateLibraryInvoices } from "@/common/actions/revalidate-invoices";

interface IFilterViewProps {
  inputValues: IInputValues
  handleInputChange: (field: string, value?: string, paramName?: string) => void
  debouncedFiltereText: (query: string, paramName: string) => void
  filterIsOpen: boolean
  setFilterIsOpen: (isOpen: boolean) => void
  chips: Array<{ key: string; value: string }>
  clearAllFilters: () => void
  handleDeleteFilter: (field: string) => void
  uploadModalOpen: boolean
  setUploadModalOpen: (open: boolean) => void
}

export const FilterView = ({
  inputValues,
  handleInputChange,
  debouncedFiltereText,
  filterIsOpen,
  setFilterIsOpen,
  chips,
  clearAllFilters,
  handleDeleteFilter,
  uploadModalOpen,
  setUploadModalOpen,
}: IFilterViewProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={1}
      sx={{ py: 1 }}
      flex={1}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            label="Numero do cliente"
            fullWidth
            value={inputValues.customerNumber}
            onChange={(e) => {
              handleInputChange('customerNumber', e.target.value)
              debouncedFiltereText(e.target.value, 'customerNumber')
            }}
            placeholder="Ex: 1233DE331"
            sx={(theme) => ({
              '& .MuiOutlinedInput-root': {
                height: 56,
                '& fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            })}
            InputProps={{
              endAdornment: inputValues.customerNumber ? (
                <InputAdornment position="end">
                  <Tooltip arrow title="Limpar texto de busca" placement="top">
                    <IconButton
                      onClick={() => {
                        handleInputChange('customerNumber', '')
                        debouncedFiltereText('', 'customerNumber')
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ) : (
                <></>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            sx={{
              height: 56,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 500,
              gap: 1,
            }}
            onClick={() => setFilterIsOpen(!filterIsOpen)}
            startIcon={
              !filterIsOpen ? <TuneOutlinedIcon /> : <ExpandLessOutlinedIcon />
            }
          >
            Filtros Avançados
          </Button>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            sx={{
              height: 56,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 500,
              gap: 1,
            }}
            onClick={() => setUploadModalOpen(true)}
            startIcon={<Upload />}
          >
            Importar
          </Button>
        </Grid>
      </Grid>
      <Collapse in={filterIsOpen} timeout="auto">
        <AdvancedFilter
          inputValues={inputValues}
          handleInputChange={handleInputChange}
          debouncedFiltereText={debouncedFiltereText}
        />
      </Collapse>
      <Box display={'flex'} gap={1} flexWrap={'wrap'}>
        {chips.map((chip, index) => (
          <FilterChip
            key={`${chip.value}_${index}`}
            label={chip.value}
            field={chip.key}
            handleDelete={handleDeleteFilter}
          />
        ))}
        {chips.length ? (
          <>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button onClick={clearAllFilters}>Limpar filtros</Button>
          </>
        ) : null}
      </Box>
      <UploadInvoiceModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        revalidate={async () => await revalidateLibraryInvoices()}
      />
    </Box>
  );
};
