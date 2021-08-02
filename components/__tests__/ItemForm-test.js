import React from "react";
import renderer from "react-test-renderer";
import { configure, shallow } from "enzyme";

import ItemForm from "../ItemForm";

import { BillProvider } from "../../providers/BillContext";
import { ProductProvider } from "../../providers/ProductContext";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

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
