import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { UploadInvoiceModal } from '@/components/upload-invoice-modal';
import { useState } from 'react';
import { revalidateDashboardInvoices } from '@/common/actions/revalidate-invoices';


export const EmptyInvoices = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)
  const onAddFirstInvoice = () => {
    setUploadModalOpen(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        p: 4,
        borderRadius: 2,
        minHeight: 400,
        color: 'primary.main'
      }}
    >
      <InfoIcon sx={{ fontSize: 100 }} />
      <Typography variant="h5" textAlign="center">
        Nenhuma fatura encontrada
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ maxWidth: 400 }}>
        Parece que você ainda não tem nenhuma fatura cadastrada. Clique no botão abaixo para adicionar sua primeira fatura e começar a acompanhar seus gastos com energia.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onAddFirstInvoice}
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1.1rem'
        }}
      >
        Adicionar Primeira Fatura
      </Button>
      <UploadInvoiceModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        revalidate={revalidateDashboardInvoices}
      />
    </Box>
  );
}; 