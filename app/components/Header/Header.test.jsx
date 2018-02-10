import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

test('renders a Header component', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('nav').exists()).toBe(true);
});
