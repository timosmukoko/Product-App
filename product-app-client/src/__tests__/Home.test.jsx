import { render, screen, waitFor } from '@testing-library/react';
import Home from '../components/Home.jsx';
import { fetchProducts } from '../api/products';
import '@testing-library/jest-dom';

jest.mock('../api/products');

describe('Home Component', () => {
  it('should render a list of products', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 10, available: true },
      { id: 2, name: 'Product 2', price: 20, available: false },
    ];

    fetchProducts.mockResolvedValueOnce({ data: mockProducts });

    render(<Home />);

    await waitFor(() => screen.getByText('Product 1'));

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
