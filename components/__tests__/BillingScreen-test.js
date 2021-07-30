import React from 'react';
import renderer from 'react-test-renderer';
import BillingScreen from '../../screens/BillingScreen';

test('renders correctly', () => {
  const tree = renderer.create(<BillingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});