// import React from "react";
// import renderer from "react-test-renderer";
import {
//   BillCalculator,
  TotalPriceWithTax,
  calculateTax,
  calculateDiscount,
} from "../BillCalculator";

// test('renders correctly', () => {
//   const tree = renderer.create(<BillCalculator />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("calculate discount correctly", () => {
  expect(calculateDiscount(100, 0.05)).toBe(5);
});
test("calculate tax correctly", () => {
  expect(calculateTax(100, 0.05)).toBe(5);
});
test("calculate total price with taxes correctly", () => {
  expect(TotalPriceWithTax(100, 0.10, 0.05)).toBe(105);
});
