import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen, reduxStore,
} from '../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { movieURL } from '../../API';
import Home from '../containers/Home';

/* eslint-disable react/display-name */
jest.mock('../MovieThumb', () => () => <div data-testid="movie" />);

const content = [
  {
    id: 1,
    title: 'Interstellar',
    poster_path: '/posterimage.png',
  },
];

const server = setupServer(
  rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => res(ctx.json({
    results: content,
  }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  describe('Fetch popular movies from API on first render', () => {
    it('dispatch actions to redux store to retrieve and store data', async () => {
      render(<Home />, {
        filter: {
          content: null,
          current: 'Popular',
          contentURL: null,
        },
      });
      const actions = reduxStore.getActions();
      await waitFor(() => expect(actions.length).toBe(2));
      expect(actions[0]).toEqual({ type: 'SET_CONTENT_URL', payload: `${movieURL}popular?` });
      expect(actions[1]).toEqual({ type: 'SET_CURRENT_CONTENT', payload: content });
    });

    it('render retrieved content passed as props using MovieThumb component', () => {
      render(<Home />, {
        filter: {
          content,
          current: null,
        },
      });
      expect(screen.getByTestId('movie')).toBeInTheDocument();
    });

    it('Does not render content if no data is retrieved or valid', () => {
      render(<Home />, {
        filter: {
          content: [],
          current: null,
        },
      });
      expect(screen.queryByTestId('movie')).not.toBeInTheDocument();
      expect(screen.getByText('No matches found')).toBeInTheDocument();
    });
  });
});
