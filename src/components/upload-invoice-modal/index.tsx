'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFile } from './useFile';
import { revalidateInvoices } from '@/common/actions/revalidate-invoices';

interface IUploadInvoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export const UploadInvoiceModal: React.FC<IUploadInvoiceModalProps> = ({
  open,
  onClose,
}) => {
  const { isUploading, uploadFile } = useFile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      uploadFile(selectedFile);
      setSelectedFile(null);
      revalidateInvoices()
      onClose();
    }
  };

  const onCloseModal = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h4" fontWeight={600} sx={(theme) => ({ color: theme.palette.primary.dark })}>
          Importar Fatura
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color="primary.main" mb={2}>
          Selecione o arquivo PDF da fatura para importar.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'primary.dark',
            },
          }}
        >
          <input
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            id="upload-file"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-file">
            <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
              Selecionar Arquivo PDF
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body2" color="text.secondary">
              Arquivo selecionado: {selectedFile.name}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1,
        }}
      >
        <Button variant="outlined" onClick={onCloseModal} sx={{ width: { xs: '100%', md: 'auto' } }}>
          Cancelar
        </Button>
        <Tooltip title={!selectedFile ? 'Insira 1 arquivo para prosseguir' : ''} arrow>
          <span style={{ display: 'inline-block' }}>
            <Button
              variant="contained"
              color="primary"
              disabled={isUploading || !selectedFile}
              endIcon={isUploading && <CircularProgress size={24} />}
              sx={{ width: { xs: '100%', md: 'auto' } }}
              onClick={handleSubmit}
            >
              Confirmar
            </Button>
          </span>
        </Tooltip>

      </DialogActions>
    </Dialog>
  );
};

