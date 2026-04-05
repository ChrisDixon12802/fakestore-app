/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
  const [customProducts, setCustomProducts] = useState(() => {
    // Load custom products from localStorage
    const saved = localStorage.getItem("customProducts");
    return saved ? JSON.parse(saved) : [];
  });

  // Save custom products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("customProducts", JSON.stringify(customProducts));
  }, [customProducts]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `custom-${Date.now()}`,
      isCustom: true,
      rating: { rate: 0, count: 0 },
    };
    setCustomProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (productId) => {
    setCustomProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateProduct = (productId, updatedData) => {
    setCustomProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedData } : p)),
    );
  };

  const value = {
    customProducts,
    addProduct,
    deleteProduct,
    updateProduct,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
