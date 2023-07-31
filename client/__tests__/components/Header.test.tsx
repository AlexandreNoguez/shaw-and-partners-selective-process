import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Optional but useful for additional matchers
import { Header } from '@/components/Header';

test('renders header with correct content', () => {
  const { getByText } = render(<Header />);

  const companyNameElement = getByText('Shaw and Partners');
  const testTitleElement = getByText('Take Home Test');

  expect(companyNameElement).toBeInTheDocument();
  expect(testTitleElement).toBeInTheDocument();
});
