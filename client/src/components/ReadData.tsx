'use client'

import { api } from '@/lib/axios-config'
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Card } from './Card';

interface ReadDataProps {
  loading: boolean;
  search: string;
}

export const ReadData = ({ loading, search }: ReadDataProps) => {
  const [csvData, setCsvData] = useState<any[]>([]);

  // const data = {
  //   data: {
  //     name: 'John',
  //     age: 30,
  //     city: 'New York'
  //   }
  // };

  //?q=John&page=1&limit=10

  useEffect(() => {
    const getData = async () => {
      let response = await api.get(`/api/users?q=${search}&page=1&limit=15`)
      setCsvData(response.data)
      // console.log(response);

    }

    getData()
  }, [loading, search])

  return (
    <div className='flex flex-wrap gap-4 container mx-auto justify-center'>
      {csvData.length ? (
        csvData.map(obj => (
          <div key={obj._id}>
            <Card data={obj.data} />
          </div>
        ))
      ) : !csvData.length
        ? <p>Não há dados</p>
        : null}
    </div>
  )
}