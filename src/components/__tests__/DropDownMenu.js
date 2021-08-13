import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen,
} from '../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import DropdownMenu from '../containers/DropdownMenu';

describe('DropdownMenu', () => {
  it('Display dropdown menu when hamburger button is clicked', () => {
    render(<DropdownMenu />);
  });
});
