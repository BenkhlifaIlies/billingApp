import React from 'react';
import renderer from 'react-test-renderer';
import {ItemsList,calculateTotalPrice} from '../ItemsList';

// test('renders correctly', () => {
//   const tree = renderer.create(<ItemsList />).toJSON();
//   expect(tree).toMatchSnapshot();
// });


test("calculate the total price for each product correctly", () => {
    expect(calculateTotalPrice(50, 2)).toBe(100);
  });