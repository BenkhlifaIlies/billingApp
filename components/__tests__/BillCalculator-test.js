import React from "react";
import renderer from "react-test-renderer";

import {
  BillCalculator,
  calculateTotalPriceWithoutTax,
  calculateDiscount,
  calculateTax,
  calculatetotalPriceWithTax,
} from "../BillCalculator";

import { BillProvider } from "../../providers/BillContext";
import { ProductProvider } from "../../providers/ProductContext";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <ProductProvider>
        <BillProvider>
          <BillCalculator />
        </BillProvider>
      </ProductProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("calculate total price without tax correctly", () => {
  expect(calculateTotalPriceWithoutTax([{
    productLabel: "test",
    productPrice: 100,
    quantity: 2,
  }])).toBe(200);
});
test("calculate discount correctly", () => {
  expect(calculateDiscount(100, 0.05)).toBe(5);
});
test("calculate tax correctly", () => {
  expect(calculateTax(100, 0.05)).toBe(5);
});
test("calculate total price with taxes correctly", () => {
  expect(calculatetotalPriceWithTax(100, 0.10, 0.05)).toBe(105);
});
