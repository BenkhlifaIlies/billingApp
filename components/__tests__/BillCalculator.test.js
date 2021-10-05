import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";

import {
  BillCalculator,
  calculateTotalPriceWithoutTax,
  calculateDiscount,
  calculateTax,
  calculatetotalPriceWithTax,
} from "../BillCalculator";

import { ItemsList } from "../ItemsList";
import ItemForm from "../ItemForm";

import { BillProvider } from "../../providers/BillContext";
import { ProductProvider } from "../../providers/ProductContext";

test("matches snapshot", () => {
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

// test("renders correctly", async() => {
//   const { getByText, getByPlaceholderText, findByText ,debug} = render(
//     <ProductProvider>
//       <BillProvider>
//         <ItemForm />
//         <ItemsList />
//         <BillCalculator />
//       </BillProvider>
//     </ProductProvider>,
//   );
//   expect(getByText(/Total price without tax/i)).not.toBeNull();
//   console.log(getByText(/Total price without tax/i));
//   await waitFor(() => {
//     fireEvent.changeText(getByPlaceholderText("Enter Product Label"),"product");
//   });
//   // debug();
//   // expect(findByText(/Total price without tax/i)).toHaveProperty("style.display","none");

//   // fireEvent.press(getByPlaceholderText("Enter Product Label"));
//   // await waitForElementToBeRemoved(() => findByText(/Total price without tax/i));

// });

describe("calculate correctly", () => {
  test("calculate total price without tax correctly", () => {
    expect(
      calculateTotalPriceWithoutTax([
        {
          productLabel: "test",
          productPrice: 100,
          quantity: 2,
        },
      ]),
    ).toBe(200);
  });
  test("calculate discount correctly", () => {
    expect(calculateDiscount(100, 0.05)).toBe(5);
  });
  test("calculate tax correctly", () => {
    expect(calculateTax(100, 0.05)).toBe(5);
  });
  test("calculate total price with taxes correctly", () => {
    expect(calculatetotalPriceWithTax(100, 0.1, 0.05)).toBe(105);
  });
});
