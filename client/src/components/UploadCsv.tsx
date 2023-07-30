'use client'

import { api } from "@/lib/axios-config";
import { useState, ChangeEvent } from "react";

export const UploadCsv = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>('');


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];

      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please, select a CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    // console.log(formData);
    setUploadStatus('Sending file...');

    try {
      let csvFile = await api.post('/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setUploadStatus('CSV sent successfuly!');
      console.log('response:', csvFile.data);

    } catch (error) {
      setUploadStatus('Failed to send CSV file.');
      console.error('Failed to send CSV file:', error);

    }

  };
  return (
    <>
      <h1>Select CSV file to Upload.</h1>
      <form className='flex flex-col gap-2 justify-center items-center' onSubmit={handleSubmit}>

        <label
          className='border border-black rounded-lg px-1 bg-slate-400 text-white w-[150px] text-center hover:bg-slate-500'
          htmlFor="input-file"
        >
          Choose a file
        </label>

        <input type="file" onChange={handleFileChange} accept=".csv" id='input-file' hidden />

        <button
          className='border border-black rounded-lg px-1 bg-slate-400 text-white w-[100px] hover:bg-slate-500'
          type="submit">
          Send
        </button>


        {selectedFile && <span className="">{selectedFile.name}</span>}

      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </>
  )
}