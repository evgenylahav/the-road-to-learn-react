import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Button } from './button';
import { shallow } from 'enzyme';
import { testNameToKey } from 'jest-snapshot/build/utils';


describe('Button tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Click me</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('shows button children', () => {
    const element = shallow(
      <Button className={'test-button'}>Click me</Button>
    );
    expect(element.find('.test-button').length).toBe(1);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button>Click me</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
