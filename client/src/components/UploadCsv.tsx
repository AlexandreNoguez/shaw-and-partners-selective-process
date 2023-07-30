'use client'

import { api } from "@/lib/axios-config";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";

export const UploadCsv = ({ loading, setLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];

      toast.success("File added successfuly\n" + file.name)
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!selectedFile) {
      toast.warning('Please, select a CSV file.');
      setLoading(false)
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    // console.log(formData);
    // setUploadStatus('Sending file...');

    try {
      let csvFile = await api.post('/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // setUploadStatus('CSV sent successfuly!');
      console.log('response:', csvFile.data);
      toast.success("CSV sent successfuly")
    } catch (error) {
      // setUploadStatus('Failed to send CSV file.');
      toast.error("Failed to send CSV file")
      console.error('Failed to send CSV file:', error);

    } finally {
      setLoading(false)
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
          disabled={loading ? true : false}
          type="submit">
          {loading ? "Loading" : "Send"}
        </button>



      </form>
    </>
  )
}