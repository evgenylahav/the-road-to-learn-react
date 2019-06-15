import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Table } from './table';
import { shallow } from 'enzyme';
import { testNameToKey } from 'jest-snapshot/build/utils';


describe('Table unit test', () => {
  const props = {
    list: [
      {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'a'},
      {title: '2', author: '4', num_comments: 5, points: 12, objectID: 'b'},
    ],
    sortKey: 'TITLE',
    isSortReverse: false,
  }
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('shows two items in list', () => {
    const element = shallow(
      <Table { ...props } />
    );
    expect(element.find(`[data-test='table-row']`).length).toBe(2);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table {...props} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
