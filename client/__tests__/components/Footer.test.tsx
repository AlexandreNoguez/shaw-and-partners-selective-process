import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

test('renders Footer component', () => {
  render(<Footer />);

  const footerElement = screen.getByRole('navigation');
  expect(footerElement).toBeInTheDocument();

  const githubLink = screen.getByRole('link', { name: /github/i });
  expect(githubLink).toHaveAttribute('href', 'https://github.com/AlexandreNoguez');

  const codepenLink = screen.getByRole('link', { name: /codepen/i });
  expect(codepenLink).toHaveAttribute('href', 'https://codepen.io/alexandrenoguez/full/OJzzLwz');

  const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
  expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/alexandre-noguez/');
});
