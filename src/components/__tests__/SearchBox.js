import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen,
} from '../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import SearchBox from '../containers/SearchBox';
import { activeBox } from '../../styles/Navbar.module.css';

describe('SearchBox', () => {
  describe('search button, input and close button', () => {
    it('render correctly if searchActive prop is passed', async () => {
      render(<SearchBox searchActive />);
      expect(screen.getByText('×')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type movie title')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
      expect(screen.getByTestId('search')).toHaveClass(activeBox);
    });
    it('render nothing if searchActive prop is not passed', () => {

    });
  });
});
