import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortSelect from '../SortSelect';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

jest.mock('next/navigation');

describe('SortSelect Component', () => {
  test('renders without crashing', () => {
    (useRouter as unknown as jest.Mock).mockReturnValue({
      replace: jest.fn(),
    });
    (useSearchParams as unknown as jest.Mock).mockReturnValue(new URLSearchParams('sort=priceDesc'));
    (usePathname as unknown as jest.Mock).mockReturnValue('/');
    render(<SortSelect />);

    const selectElement = screen.getByRole('combobox', { name: /ordenar/i });
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('priceDesc');
  });

  test('updates the URL when an option is selected', () => {
    const replaceMock = jest.fn();
    (useRouter as unknown as jest.Mock).mockReturnValue({ replace: replaceMock });
    (useSearchParams as unknown as jest.Mock).mockReturnValue(new URLSearchParams('sort=priceDesc'));
    (usePathname as unknown as jest.Mock).mockReturnValue('/');

    render(<SortSelect />);

    const selectElement = screen.getByRole('combobox', { name: /ordenar/i });
    fireEvent.change(selectElement, { target: { value: 'priceAsc' } });

    expect(replaceMock).toHaveBeenCalledWith('/?sort=priceAsc&page=1');
  });
});