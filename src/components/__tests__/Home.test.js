import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen,
} from '../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Home from '../containers/Home';

/* eslint-disable react/display-name */
jest.mock('../MovieThumb', () => () => <div data-testid="movie" />);

const server = setupServer(
  rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => res(ctx.json({
    results: [
      {
        id: 1,
        title: 'Interstellar',
        poster_path: '/posterimage.png',
      },
    ],
  }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  describe('Fetch movies from API if filter given', () => {
    it('Display if movie poster_path field retrieved', async () => {
      render(<Home currentFilter="Popular" />);
      await waitFor(() => expect(screen.getByTestId('movie')).toBeInTheDocument());
      expect(await screen.getByTestId('movie')).toBeInTheDocument();
    });

    it('Does not display if movie poster_path field not retrieved', async () => {
      server.use(
        rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => res(ctx.json({
          results: [
            {
              id: 1,
              title: 'Interstellar',
              poster_path: null,
            },
          ],
        }))),
      );

      render(<Home currentFilter="Popular" />);
      await waitFor(() => expect(screen.getByText('No matches found')).toBeInTheDocument());
      expect(await screen.queryByTestId('movie')).not.toBeInTheDocument();
      expect(await screen.getByText('No matches found')).toBeInTheDocument();
    });
  });
});
