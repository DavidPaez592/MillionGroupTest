import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Pagination Component', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    (usePathname as jest.Mock).mockReturnValue('/properties');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  test('does not render if there is only one page', () => {
    render(<Pagination total={10} page={1} pageSize={20} />);
    expect(screen.queryByText(/resultados/i)).not.toBeInTheDocument();
  });

  test('renders total results and navigation buttons', () => {
    render(<Pagination total={100} page={1} pageSize={10} />);

    expect(screen.getByText(/100 resultados/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /←/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /→/i })).toBeEnabled();
  });

  test('updates URL when navigating to another page', () => {
    render(<Pagination total={100} page={1} pageSize={10} />);

    const nextButton = screen.getByRole('button', { name: /→/i });
    fireEvent.click(nextButton);

    expect(mockReplace).toHaveBeenCalledWith('/properties?page=2');
  });

  test('disables next button on the last page', () => {
    render(<Pagination total={100} page={10} pageSize={10} />);

    expect(screen.getByRole('button', { name: /→/i })).toBeDisabled();
  });

  test('renders correct range of pages', () => {
    render(<Pagination total={100} page={5} pageSize={10} />);

    const pageButtons = screen.getAllByRole('button', { name: /^[0-9]+$/ });
    const pageNumbers = pageButtons.map((btn) => btn.textContent);

    expect(pageNumbers).toEqual(['3', '4', '5', '6', '7']);
  });
});