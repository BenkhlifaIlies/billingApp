import React from "react";
import renderer from "react-test-renderer";
// import { render, fireEvent, act } from "@testing-library/react-native";

import ItemForm from "../ItemForm";

import { BillProvider } from "../../providers/BillContext";
import { ProductProvider } from "../../providers/ProductContext";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <ProductProvider>
        <BillProvider>
          <ItemForm />
        </BillProvider>
      </ProductProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

