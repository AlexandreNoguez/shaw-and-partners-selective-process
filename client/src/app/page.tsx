'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);

    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Por favor, selecione um arquivo CSV.');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    console.log(formData);

    setUploadStatus('Enviando arquivo...');
    await axios.post('http://localhost:8081/api/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        setUploadStatus('Arquivo enviado com sucesso!');
        console.log('Resposta do servidor:', response.data);

      })
      .catch(error => {
        console.log(error);
        setUploadStatus('Falha ao enviar o arquivo.');
        console.error('Erro na requisição:', error);

      })

  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Upload de arquivo CSV</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept=".csv" />
          <button type="submit">Enviar</button>
        </form>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </main>
  )
}
