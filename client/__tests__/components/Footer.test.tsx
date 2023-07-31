import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Footer } from '@/components/Footer';

test('renders Footer component', () => {
  render(<Footer />);
  const footerElement = screen.getByRole('navigation');
  expect(footerElement).toBeInTheDocument();
});