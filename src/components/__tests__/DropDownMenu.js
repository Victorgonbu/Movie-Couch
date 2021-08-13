import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, screen,
} from '../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import DropdownMenu from '../containers/DropdownMenu';
import { active } from '../../styles/DropdownMenu.module.css';
import '../utils/icons';

/* eslint-disable react/display-name */
jest.mock('../DropdownItem', () => () => (
  <button
    type="button"
    data-testid="dropdown-item"
  >
    filter
  </button>
));

const server = setupServer(
  rest.get('https://api.themoviedb.org/3/genre/movie/list', (req, res, ctx) => res(ctx.json({
    genres: [
      {
        id: 1,
        name: 'action',
      },
    ],
  }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('DropdownMenu', () => {
  it('Display dropdown menu with fetched genres when hamburger button is clicked', async () => {
    render(<DropdownMenu />);
    await waitFor(() => expect(screen.getAllByTestId('dropdown-item').length).toBe(3));
    const dropdownButton = await screen.getByTestId('dropdown-button');
    const dropdownMenu = await screen.getByTestId('dropdown-menu');
    fireEvent.click(dropdownButton);
    expect(dropdownMenu).toHaveClass(active);
  });
});
