import React from 'react';
import renderer from 'react-test-renderer';
import ItemForm from '../ItemForm';
import { Picker } from "@react-native-picker/picker";

test('renders correctly', () => {
  const tree = renderer.create(<ItemForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

// jest.mock('Picker', () => {
//     const Picker = class extends Component {
//       static Item = props => React.createElement('Item', props, props.children);
//       static propTypes = { children: React.PropTypes.any };
  
//       render() {
//         return React.createElement('Picker', this.props, this.props.children);
//       }
//     }
//     return Picker;
//   })