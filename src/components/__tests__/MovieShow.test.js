import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen,
} from '../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import MovieShow from '../containers/MovieShow';

/* eslint-disable react/display-name */
jest.mock('react-router-dom/', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/movie/er5664e' }),
}));

jest.mock('../presentationals/movie_show/Backdrop', () => () => <div data-testid="backdrop" />);
jest.mock('../presentationals/movie_show/Details', () => () => <div data-testid="details" />);
jest.mock('../presentationals/movie_show/Producers', () => () => <div data-testid="producers" />);
jest.mock('react-responsive-carousel', () => ({
  Carousel: () => <div data-testid="carousel" />,
}));

const server = setupServer(
  rest.get('https://api.themoviedb.org/3/movie/er5664e', (req, res, ctx) => res(ctx.json({
    title: 'Interstellar',
    tagline: 'Space',
    backdrop_path: '/imagebackdrop.jpg',
    genres: [{}],
    videos: { results: [{}] },
    production_companies: [{}],
  }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MovieShow', () => {
  it("Fetch movie by id and render all it's relevant details", async () => {
    render(<MovieShow />);
    await waitFor(() => expect(screen.getByTestId('backdrop')).toBeInTheDocument());
    expect(screen.getByTestId('details')).toBeInTheDocument();
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getByTestId('producers')).toBeInTheDocument();
  });
});
