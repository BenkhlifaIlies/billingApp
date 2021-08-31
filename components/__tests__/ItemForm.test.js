import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import ItemForm from "../ItemForm";
import { MAXQUANTITY } from "../../constants/Calculattions";
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

test("shows required error messages", async () => {
  const { getByText, queryByText, findAllByText } = render(
    <ProductProvider>
      <BillProvider>
        <ItemForm />
      </BillProvider>
    </ProductProvider>,
  );
  expect(queryByText(/required field/i)).toBeNull();
  fireEvent.press(getByText("Add to list"));
  expect((await findAllByText(/required field/i)).length).toBe(3);
});

test("shows validation error messages", async () => {
  const { getByText, getByPlaceholderText, findByText } = render(
    <ProductProvider>
      <BillProvider>
        <ItemForm />
      </BillProvider>
    </ProductProvider>,
  );
  await waitFor(async () => {
    await fireEvent.changeText(
      getByPlaceholderText(/Enter Product Label/i),
      "X",
    );
    await fireEvent.changeText(getByPlaceholderText(/Enter Price/i), "-1");
    await fireEvent.changeText(getByPlaceholderText(/Enter Quantity/i), "-89");
  });
  fireEvent.press(getByText("Add to list"));
  expect(
    await findByText(
      /Product's name is required to be at least 4 characters long/i,
    ),
  ).not.toBeNull();
  expect(
    await findByText(/The Price must be a positive number/i),
  ).not.toBeNull();
  expect(
    await findByText(
      `Quantity must be greater than or equal to  1 and inferieur to ${MAXQUANTITY}`,
    ),
  ).not.toBeNull();
});

test("handles valid input submission", async () => {
  const { getByText, getByPlaceholderText, queryByText } = render(
    <ProductProvider>
      <BillProvider>
        <ItemForm />
      </BillProvider>
    </ProductProvider>,
  );

  await waitFor(async () => {
    await fireEvent.changeText(
      getByPlaceholderText(/Enter Product Label/i),
      "product 1",
    );
    await fireEvent.changeText(getByPlaceholderText(/Enter Price/i), "50");
    await fireEvent.changeText(getByPlaceholderText(/Enter Quantity/i), "2");
  });
  fireEvent.press(getByText("Add to list"));
  expect(
    await queryByText(
      /Product's name is required to be at least 4 characters long/i,
    ),
  ).toBeNull();
  expect(
    await queryByText(/The Price must be a positive number/i),
  ).toBeNull();
  expect(
    await queryByText(
      `Quantity must be greater than or equal to  1 and inferieur to ${MAXQUANTITY}`,
    ),
  ).toBeNull();
});
