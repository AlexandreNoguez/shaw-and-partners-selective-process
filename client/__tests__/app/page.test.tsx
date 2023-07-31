import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '@/app/page'; // Replace with the correct path
import { api } from '@/lib/axios-config';

test('renders Home component with UploadCsv and ReadData components', async () => {
  jest.spyOn(api, 'post').mockResolvedValueOnce({ data: {} });

  render(<Home />);

  const uploadCsvComponent = screen.getByText('Select CSV file to Upload.');
  const readDataComponent = screen.getByText('Filter by selected category.');
  expect(uploadCsvComponent).toBeInTheDocument();
  expect(readDataComponent).toBeInTheDocument();

  const file = new File(['csv data'], 'test.csv', { type: 'text/csv' });
  const inputElement = screen.getByLabelText('Choose a file');
  fireEvent.change(inputElement, { target: { files: [file] } });

  await waitFor(() => {
    const successToast = screen.getByText('File added successfuly\n' + file.name);
    expect(successToast).toBeInTheDocument();
  });

  const searchInput = screen.getByRole('textbox');
  fireEvent.change(searchInput, { target: { value: 'John' } });

  await waitFor(() => {
    const johnDoeCard = screen.getByText((content, element) => content.includes('John Doe'));
    expect(johnDoeCard).toBeInTheDocument();
  });
});
