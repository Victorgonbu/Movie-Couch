import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, screen, reduxStore,
} from '../components/utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import DropdownMenu from '../components/containers/DropdownMenu';
import { active } from '../../styles/DropdownMenu.module.css';
import '../components/utils/icons';

/* eslint-disable react/display-name */
jest.mock('../components/presentationals/DropdownItem', () => () => (
  <button
    type="button"
    data-testid="dropdown-item"
  >
    filter
  </button>
));

const genresList = [
  {
    id: 1,
    name: 'action',
  },
];

const server = setupServer(
  rest.get('https://api.themoviedb.org/3/genre/movie/list', (req, res, ctx) => res(ctx.json({
    genres: genresList,
  }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('DropdownMenu', () => {
  it('dispatch action to redux store to retrieve and store genres from API', async () => {
    render(<DropdownMenu />, {
      genres: {
        list: null,
      },
      filter: {
        current: 'Popular',
      },
    });
    const actions = reduxStore.getActions();
    await waitFor(() => expect(actions.length).toBe(1));
    expect(actions[0]).toEqual({ type: 'SET_GENRES_LIST', payload: genresList });
  });
  it('display dropdown menu with fetched genres when hamburger button is clicked', async () => {
    render(<DropdownMenu />, {
      genres: {
        list: genresList,
      },
      filter: {
        current: 'Popular',
      },
    });

    const dropdownItems = screen.getAllByTestId('dropdown-item');
    expect(dropdownItems.length).toBe(3);
    const dropdownButton = screen.getByTestId('dropdown-button');
    const dropdownMenu = screen.getByTestId('dropdown-menu');
    expect(dropdownMenu).not.toHaveClass(active);
    fireEvent.click(dropdownButton);
    expect(dropdownMenu).toHaveClass(active);
  });
});
