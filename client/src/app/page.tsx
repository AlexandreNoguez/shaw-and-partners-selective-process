'use client'

import { useState, ChangeEvent } from 'react';
import { api } from '@/lib/axios-config';
import { UploadCsv } from '@/components/UploadCsv';

export default function Home() {
  const [search, setSearch] = useState<string>('');


  return (
    <main className="flex flex-col p-4 bg-slate-700 text-white min-h-screen">
      <div className='flex w-full'>
        <div className='flex flex-col w-1/2 items-center justify-center'>
          <UploadCsv />
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
      <div>
        teste
      </div>
    </main>
  )
}
