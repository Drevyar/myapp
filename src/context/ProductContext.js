import React, { createContext, useState, useContext } from 'react';
import initialProducts from '../data/products';

console.log('DEBUG initialProducts:', initialProducts);
console.log('DEBUG is array?', Array.isArray(initialProducts));

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  console.log('DEBUG products state on render:', products);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    console.log('DEBUG addProduct called, current products:', products);
    setProducts((prev) => {
      console.log('DEBUG prev in setProducts:', prev);
      return [...prev, newProduct];
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}