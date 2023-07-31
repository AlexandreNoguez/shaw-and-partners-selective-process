import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

test('renders RootLayout component with Header, Footer, and ToastContainer', () => {
  const metadata = {
    title: 'Shaw and Partners Selective Process',
    description: 'Test for fullstack developer role',
  };

  render(
    <RootLayout>
      <div>Content</div>
    </RootLayout>
  );

  const headerComponent = screen.getByText('Shaw and Partners');
  const footerComponent = screen.getByRole('navigation');
  expect(headerComponent).toBeInTheDocument();
  expect(footerComponent).toBeInTheDocument();

  const titleElement = screen.getByText(metadata.title);
  const descriptionElement = screen.getByText(metadata.description);
  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();

  const toastContainerComponent = screen.getByRole('alert');
  expect(toastContainerComponent).toBeInTheDocument();
});
