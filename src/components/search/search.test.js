import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Search } from './search';
import { shallow } from 'enzyme';
import { testNameToKey } from 'jest-snapshot/build/utils';

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('creates a search form', () => {
    const element = shallow(
      <Search>Search</Search>
    );
    expect(element.find(`[data-test='search-form']`).length).toBe(1);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search>Search</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
