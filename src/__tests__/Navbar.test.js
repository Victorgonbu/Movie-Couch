import React from 'react';
import {
  render, screen,
} from '../components/utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../components/containers/Navbar';

/* eslint-disable react/display-name */
jest.mock('../components/containers/DropdownMenu', () => () => <div data-testid="dropdown" />);
jest.mock('../components/containers/SearchBox', () => () => <div data-testid="search-box" />);
jest.mock('../components/presentationals/Error', () => () => <div data-testid="error" />);
jest.mock('react-router-dom/', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet" />,
}));

describe('Navbar', () => {
  it('render Dropdown, brand name, SearchBox and children components', () => {
    render(<Navbar />, { filter: { error: false } });
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    expect(screen.getByText('Movie Couch')).toBeInTheDocument();
    expect(screen.getByTestId('search-box')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('render Error component if unable to fetch data from api', () => {
    render(<Navbar />, { filter: { error: true } });
    expect(screen.queryByTestId('outlet')).toBeFalsy();
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });
});
