// ReadData.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axiosMock from 'axios-mock-adapter';

import { ReadData } from '@/components/ReadData';
import axios from 'axios';

const mockData = [
  { _id: '1', data: { name: 'John Doe', age: 30 } },
  { _id: '2', data: { name: 'Jane Smith', age: 25 } },
];

const mockAxios = new axiosMock(axios);
mockAxios.onGet('/api/users').reply(200, mockData);

test('renders ReadData component with data', async () => {
  render(<ReadData loading={false} search="John" />);

  await waitFor(() => {
    const johnDoeCard = screen.getByText(/John Doe/i);
    const janeSmithCard = screen.getByText(/Jane Smith/i);
    expect(johnDoeCard).toBeInTheDocument();
    expect(janeSmithCard).toBeInTheDocument();
  });
});

test('renders "Não há dados" when no data is available', async () => {
  render(<ReadData loading={false} search="NonExistentName" />);

  await waitFor(() => {
    const noDataMessage = screen.getByText(/Não há dados/i);
    expect(noDataMessage).toBeInTheDocument();
  });
});
