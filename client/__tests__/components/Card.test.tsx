// Card.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for custom matchers

import { Card } from '@/components/Card'; // Replace with the actual path to your Card component

test('renders Card component with data', () => {
  const mockData = {
    name: 'Product A',
    imgURL: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/r/f/-original-imaghkvuhzwge3za.jpeg?q=70',
    description: 'A description of Product A',
    price: '$19.99',
  };

  render(<Card data={mockData} />);

  const cardElement = screen.getByRole('div', { name: /product card/i });
  expect(cardElement).toBeInTheDocument();

  const imageElement = screen.getByRole('img', { name: /product image/i });
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', mockData.imgURL);

  const nameElement = screen.getByText(/name:/i);
  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveTextContent('Product A');

  const descriptionElement = screen.getByText(/description:/i);
  expect(descriptionElement).toBeInTheDocument();
  expect(descriptionElement).toHaveTextContent('A description of Product A');

  const priceElement = screen.getByText(/price:/i);
  expect(priceElement).toBeInTheDocument();
  expect(priceElement).toHaveTextContent('$19.99');
});

test('renders Card component without an image', () => {
  const mockData = {
    name: 'Product B',
    description: 'A description of Product B',
    price: '$29.99',
  };

  render(<Card data={mockData} />);

  const cardElement = screen.getByRole('div', { name: /product card/i });
  expect(cardElement).toBeInTheDocument();

  const imageElement = screen.queryByRole('img', { name: /product image/i });
  expect(imageElement).not.toBeInTheDocument();

  const nameElement = screen.getByText(/name:/i);
  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveTextContent('Product B');

  const descriptionElement = screen.getByText(/description:/i);
  expect(descriptionElement).toBeInTheDocument();
  expect(descriptionElement).toHaveTextContent('A description of Product B');

  const priceElement = screen.getByText(/price:/i);
  expect(priceElement).toBeInTheDocument();
  expect(priceElement).toHaveTextContent('$29.99');
});
