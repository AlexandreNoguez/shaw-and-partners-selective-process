import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UploadCsv } from '@/components/UploadCsv';

test('renders the component correctly', () => {
  render(<UploadCsv loading={false} setLoading={jest.fn()} />);
  const headerElement = screen.getByRole('heading', { name: /select csv file to upload/i });
  expect(headerElement).toBeInTheDocument();
});

test('updates selectedFile state when a file is selected', () => {
  render(<UploadCsv loading={false} setLoading={jest.fn()} />);
  const file = new File(['csv content'], 'test.csv', { type: 'text/csv' });
  const inputFile = screen.getByLabelText(/choose a file/i);
  fireEvent.change(inputFile, { target: { files: [file] } });
  expect(screen.getByText(/file added successfuly/i)).toBeInTheDocument();
});

test('submits the form with the selected file', async () => {
  const mockPost = jest.fn(() => Promise.resolve({ data: 'response data' }));
  const setLoading = jest.fn();
  render(<UploadCsv loading={false} setLoading={setLoading} />);

  const file = new File(['csv content'], 'test.csv', { type: 'text/csv' });
  const inputFile = screen.getByLabelText(/choose a file/i);
  fireEvent.change(inputFile, { target: { files: [file] } });

  const submitButton = screen.getByText(/send/i);
  fireEvent.click(submitButton);

  expect(setLoading).toHaveBeenCalledWith(true);
  expect(mockPost).toHaveBeenCalledWith('/api/file', expect.any(FormData), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Simulate a successful response
  const successResponse = { data: 'response data' };
  mockPost.mockResolvedValueOnce(successResponse);

  // Wait for the component to handle the API response and update the state
  await screen.findByText(/csv sent successfuly/i);

  // Expect that the loading state has been reset after handling the response
  expect(setLoading).toHaveBeenCalledWith(false);

  // Expect that the success message is shown to the user
  expect(screen.getByText(/csv sent successfuly/i)).toBeInTheDocument();

  // You can also test the state or component behavior after a successful response

  // Simulate a failure response
  const errorResponse = new Error('Failed to send CSV file');
  mockPost.mockRejectedValueOnce(errorResponse);

  // Wait for the component to handle the API response and update the state
  await screen.findByText(/failed to send csv file/i);

  // Expect that the loading state has been reset after handling the response
  expect(setLoading).toHaveBeenCalledWith(false);

  // Expect that the error message is shown to the user
  expect(screen.getByText(/failed to send csv file/i)).toBeInTheDocument();


});
