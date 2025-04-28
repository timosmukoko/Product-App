import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../components/ProductList.jsx';
import { fetchProducts } from '../api/products';
import '@testing-library/jest-dom';

// Mock the API call
jest.mock('../api/products');

describe('ProductList Component', () => {
  it('should render products fetched from API', async () => {
    // Arrange: Mock the response from API
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 20, available: true },
      { id: 2, name: 'Product 2', price: 40, available: false },
    ];
    fetchProducts.mockResolvedValueOnce({ data: mockProducts });

    // Act: Render the component
    render(<ProductList />);

    // Wait for products to appear
    await waitFor(() => screen.getByText('Product 1'));

    // Assert: Check if the products are rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should display "Out of Stock" for unavailable products', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 20, available: false },
    ];
    fetchProducts.mockResolvedValueOnce({ data: mockProducts });

    render(<ProductList />);

    await waitFor(() => screen.getByText('Product 1'));

    expect(screen.getByText('Out of Stock')).toHaveStyle('color: red');
  });
});
