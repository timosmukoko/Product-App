
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './productService';

// Mock the fetch API
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe('Product Service', () => {
  test('fetchProducts returns product list', async () => {
    const mockProducts = [{ id: 1, name: "Test Product" }];
    fetch.mockResolvedValueOnce({
      json: async () => mockProducts,
    });

    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/products");
  });

  test('createProduct sends POST request', async () => {
    const newProduct = { name: "New Product", price: 100 };
    fetch.mockResolvedValueOnce({
      json: async () => ({ id: 1, ...newProduct }),
    });

    const created = await createProduct(newProduct);
    expect(created.name).toBe("New Product");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/products", expect.objectContaining({
      method: "POST",
    }));
  });

  test('updateProduct sends PATCH request', async () => {
    const updatedData = { name: "Updated Product", price: 150 };
    fetch.mockResolvedValueOnce({
      json: async () => ({ id: 1, ...updatedData }),
    });

    const updated = await updateProduct(1, updatedData);
    expect(updated.name).toBe("Updated Product");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/products/1", expect.objectContaining({
      method: "PATCH",
    }));
  });

  test('deleteProduct sends DELETE request', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    const result = await deleteProduct(1);
    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/products/1", expect.objectContaining({
      method: "DELETE",
    }));
  });
});
