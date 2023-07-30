'use client'

import { useState, ChangeEvent } from 'react';
import { api } from '@/lib/axios-config';
import { UploadCsv } from '@/components/UploadCsv';
import { ReadData } from '@/components/ReadData';

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  return (
    <main className="flex flex-col p-4 bg-slate-700 text-white min-h-screen">
      <div className='flex max-sm:flex-col w-full max-sm:justify-center max-sm:items-center max-sm:gap-4 '>
        <div className='flex flex-col w-1/2 items-center justify-center'>
          <UploadCsv loading={loading} setLoading={setLoading} />
        </div>
        <div className='flex flex-col w-1/2 justify-center items-center'>
          <h1>Filter by selected category.</h1>
          <input
            className='text-black'
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className='mt-8'>
        <ReadData loading={loading} search={search} />
      </div>
    </main>
  )
}
