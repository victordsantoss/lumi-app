import { api } from "@/configs/api"

export const uploadInvoiceService = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/invoice/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao importar fatura:', error);
    throw error;
  }
};
