import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Home from '../comp/Home';
import ListItems from '../comp/ListItems';
Enzyme.configure({ adapter: new EnzymeAdapter() });

it('renders without crashing', () => {
  const wrapper = shallow(<Home />);
  const homeComp = wrapper.find(".home-container");
  expect(homeComp.length).toBe(1);
});
it('includes ListItems', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.containsMatchingElement(<ListItems />)).toEqual(true);
});