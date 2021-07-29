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


// export const ProductContext= createContext({
//   productList: [],
//   setProductList: () => {},
// });
// export interface ProductContextData {
//   productList: Product[];
//   setProductList: () => {},
// }

// export const ProductContextDefaultValue: ProductContextData = {
//   productList: [],
//   setProductList: () => {},
// };
// createContext<[{  productList: Product[]; },React.Dispatch<React.SetStateAction<{
//   productList: Product[];
// }>>]>({} as any);

// export const ProductContext = createContext<
//   [
//     { productList: Array<Product>},
//     React.Dispatch<
//       React.SetStateAction<{
//         productList: Product[];
//       }>
//     >,
//   ]
// >({} as any);
