import React from 'react';
import {
  render, screen,
} from '../../components/utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Error from '../../components/presentationals/Error';

describe('Error', () => {
  it('display text pass in props', () => {
    render(<Error text="error text" handleErrorState={() => {}} />);
    expect(screen.getByText('error text')).toBeInTheDocument();
  });
});
