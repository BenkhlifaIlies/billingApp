import React from "react";
import renderer from "react-test-renderer";

import { ItemsList, calculateTotalPrice } from "../ItemsList";

import { BillProvider } from "../../providers/BillContext";
import { ProductProvider } from "../../providers/ProductContext";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <ProductProvider>
        <BillProvider>
          <ItemsList />
        </BillProvider>
      </ProductProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("calculate the total price for each product correctly", () => {
  expect(calculateTotalPrice(50, 2)).toBe(100);
});
