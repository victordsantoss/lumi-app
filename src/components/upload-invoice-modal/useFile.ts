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

  function downloadPdf(buffer: Buffer, fileName: string = 'arquivo.pdf'): void {
    try {
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      if (link.download !== undefined) {
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      showAlert(`Error ao baixar o PDF ${fileName}`, 'error');
      console.error(e)
    }
  }

  return {
    uploadFile,
    isUploading,
    downloadPdf
  };
}; 