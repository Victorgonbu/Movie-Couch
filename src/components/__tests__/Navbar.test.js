import React from 'react';
import {
  render, screen,
} from '../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../containers/Navbar';

/* eslint-disable react/display-name */
jest.mock('../containers/DropdownMenu', () => () => <div data-testid="dropdown" />);
jest.mock('../containers/SearchBox', () => () => <div data-testid="search-box" />);
jest.mock('react-router-dom/', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet" />,
}));

describe('Navbar', () => {
  it('render Dropdown, brand name, SearchBox and children components', () => {
    render(<Navbar />);
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    expect(screen.getByText('Movie Couch')).toBeInTheDocument();
    expect(screen.getByTestId('search-box')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
