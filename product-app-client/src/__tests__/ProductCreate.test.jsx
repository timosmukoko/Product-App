import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCreate from '../components/ProductCreate.jsx';
import { createProduct } from '../api/products';
import '@testing-library/jest-dom';

// Mock the API call
jest.mock('../api/products');

describe('ProductCreate Component', () => {
  it('should render the form and allow the user to input product details', async () => {
    render(<ProductCreate />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/Product Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/)).toBeInTheDocument();

    // Simulate typing into the input fields
    fireEvent.change(screen.getByLabelText(/Product Name/), { target: { value: 'Product A' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'Description of Product A' } });
    fireEvent.change(screen.getByLabelText(/Price/), { target: { value: '25.00' } });

    // Assert that the values are updated
    expect(screen.getByLabelText(/Product Name/).value).toBe('Product A');
    expect(screen.getByLabelText(/Description/).value).toBe('Description of Product A');
    expect(screen.getByLabelText(/Price/).value).toBe('25.00');
  });

  it('should call createProduct on form submission', async () => {
    const mockCreateProduct = jest.fn().mockResolvedValue({ status: 201 });
    createProduct.mockImplementation(mockCreateProduct);

    render(<ProductCreate />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Product Name/), { target: { value: 'Product A' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'Description of Product A' } });
    fireEvent.change(screen.getByLabelText(/Price/), { target: { value: '25.00' } });

    // Submit the form
    fireEvent.click(screen.getByText('Create Product'));

    // Wait for the API call to be made
    await waitFor(() => expect(mockCreateProduct).toHaveBeenCalledTimes(1));
  });
});
