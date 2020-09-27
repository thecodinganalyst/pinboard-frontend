import React from 'react';
import { render } from '@testing-library/react';
import Pinboard from './Pinboard';

test('renders learn react link', () => {
  const { getByText } = render(<Pinboard />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
