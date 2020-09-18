import React from 'react';
import renderer from 'react-test-renderer';

import Header from './index';

describe('<Header />', () => {
  it('has 3 children - Unit Testing', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('renders correctly - Snapshot Testing', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
