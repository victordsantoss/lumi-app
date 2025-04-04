'use client'


import { useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error('Erro ao enviar arquivo');
        return;
      }

      const data = await res.json();
      // Imprime os dados extraídos no console do navegador
      console.log('Conteúdo do PDF:', data.text);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      <h1>Upload de PDF</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
