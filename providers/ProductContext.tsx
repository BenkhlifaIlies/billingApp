import React from "react";
import { useState, createContext, useContext } from "react";
import { Product } from "../constants/Product";

const useProducts = (initial: Product[]) => useState<Product[]>(initial);

const ProductContext = createContext<ReturnType<typeof useProducts> | null>(
  null,
);

export const useProductContext = () => useContext(ProductContext)!;

export function ProductProvider({ children }: { children: React.ReactNode }) {
  return (
    <ProductContext.Provider value={useProducts([])}>
      {children}
    </ProductContext.Provider>
  );
}
