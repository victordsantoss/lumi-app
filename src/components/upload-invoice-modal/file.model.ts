import { useMutation } from '@tanstack/react-query';
import { useAlert } from '@/contexts/alert.context';
import { uploadInvoiceService } from '@/services/invoice/upload-invoice.service';

export const useFile = () => {
  const { showAlert } = useAlert();

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => uploadInvoiceService(file),
    onSuccess: () => {
      showAlert('Arquivo enviado com sucesso!', 'success');
    },
    onError: (error) => {
      showAlert('Erro ao enviar arquivo. Tente novamente.', 'error');
      console.error('Erro ao enviar arquivo:', error);
    },
  });

  const downloadPdf = async (buffer: ArrayBuffer, fileName: string = 'arquivo.pdf') => {
    try {
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      showAlert(`Erro ao baixar o PDF ${fileName}`, 'error');
      console.error('Erro ao baixar o PDF:', error);
    }
  };

  return {
    uploadFile,
    isUploading,
    downloadPdf
  };
};
