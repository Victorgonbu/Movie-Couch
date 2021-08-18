import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import MovieThumb from '../../presentationals/MovieThumb';

/* eslint-disable react/display-name */
jest.mock('../../presentationals/movie_show/Rating.js', () => () => <div data-testid="rating" />);

describe('MovieThumb', () => {
  const data = {
    id: 12345,
    title: 'Movie title',
    poster_path: '/posterpath.jpg',
    release_date: '2021-08-18',
    vote_average: 5,
  };
  it('Render movie  thumbnail with data passed in props', () => {
    const { getByText, getByAltText, getByTestId } = render(<MovieThumb value={data} />);

    expect(getByAltText('poster')).toBeInTheDocument();
    expect(getByText('Movie title')).toBeInTheDocument();
    expect(getByText('2021')).toBeInTheDocument();
    expect(getByText('More Details')).toBeInTheDocument();
    expect(getByText('More Details')).toHaveAttribute('href', '/movie/12345');
    expect(getByTestId('rating')).toBeInTheDocument();
  });
});
