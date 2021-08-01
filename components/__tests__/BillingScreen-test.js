import React from "react";
import renderer from "react-test-renderer";

import BillingScreen from "../../screens/BillingScreen";

import { BillProvider } from "../../providers/BillContext";
import { ProductProvider } from "../../providers/ProductContext";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <ProductProvider>
        <BillProvider>
          <BillingScreen />
        </BillProvider>
      </ProductProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
