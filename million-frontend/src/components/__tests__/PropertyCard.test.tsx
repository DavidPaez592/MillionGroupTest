import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyCard from '../PropertyCard';
import type { PropertyListItem } from '@/lib/api';

describe('PropertyCard Component', () => {
  test('renders property details correctly', () => {
    const mockProperty: PropertyListItem = {
      id: '1',
      idOwner: 'owner123',
      name: 'Beautiful Apartment',
      price: 1200000,
      address: 'New York, NY',
      images: ['/path/to/image.jpg'],
    };

    render(<PropertyCard p={mockProperty} />);

    const titleElement = screen.getByText(/beautiful apartment/i);
    const priceElement = screen.getByText(/\$1,200,000/i);
    const locationElement = screen.getByText(/new york, ny/i);
    const imageElement = screen.getByRole('img', { name: /beautiful apartment/i });

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', expect.stringContaining('/path/to/image.jpg'));
  });
});