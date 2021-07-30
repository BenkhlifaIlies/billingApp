import React from "react";
import { useState, createContext, useContext } from "react";
const useBill = (initial: number) => useState<number>(initial);

const BillContext = createContext<ReturnType<typeof useBill> | null>(
  null,
);

export const useBillContext = () => useContext(BillContext)!;

export function BillProvider({ children }: { children: React.ReactNode }) {
  return (
    <BillContext.Provider value={useBill(0.05)}>
      {children}
    </BillContext.Provider>
  );
}
