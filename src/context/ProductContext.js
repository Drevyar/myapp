import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import * as productService from '../services/productService';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Fetch all products from Supabase. */
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await productService.getProducts();
    if (err) {
      setError(err);
      setProducts([]);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }, []);

  /** Create a new product. Returns { success, error }. */
  const create = useCallback(async (productData) => {
    const { data, error: err } = await productService.createProduct(productData);
    if (err) {
      return { success: false, error: err };
    }
    // Prepend the new product (newest first)
    setProducts((prev) => [data, ...prev]);
    return { success: true, error: null };
  }, []);

  /** Update an existing product. Returns { success, error }. */
  const update = useCallback(async (id, updates) => {
    const { data, error: err } = await productService.updateProduct(id, updates);
    if (err) {
      return { success: false, error: err };
    }
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? data : p))
    );
    return { success: true, error: null };
  }, []);

  /** Delete a product. Returns { success, error }. */
  const remove = useCallback(async (id) => {
    const { error: err } = await productService.deleteProduct(id);
    if (err) {
      return { success: false, error: err };
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    return { success: true, error: null };
  }, []);

  /** Search products by name. Updates the products list with results. */
  const search = useCallback(async (query) => {
    if (!query || query.trim() === '') {
      return refresh();
    }
    setLoading(true);
    setError(null);
    const { data, error: err } = await productService.searchProducts(query);
    if (err) {
      setError(err);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }, [refresh]);

  // Initial fetch on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, refresh, create, update, remove, search }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}