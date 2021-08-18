import React from 'react';
import { render, fireEvent, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Details from '../../presentationals/movie_show/Details';

/* eslint-disable react/display-name */
jest.mock('../../presentationals/movie_show/Rating.js', () => () => <div data-testid="rating" />);
jest.mock('../../presentationals/movie_show/MainDetail.js', () => () => <div data-testid="main-detail" />);

describe('Details', () => {
  it('render movie main details rating, synopsis and homepage', () => {
    const data = {
      title: 'Movie title',
      runtime: 144,
      release_date: '2021',
      budget: '100000',
      revenue: '2000000',
      vote_average: 8,
      vote_count: 10,
      overview: 'overview',
      homepage: '/homepage',
    };
    const { getAllByTestId, getByTestId, getByText } = render(<Details
      movie={data}
    />);

    expect(getAllByTestId('main-detail').length).toBe(4);
    expect(getByTestId('rating')).toBeInTheDocument();
    expect(getByText('overview')).toBeInTheDocument();
    expect(getByText('Watch')).toHaveAttribute('href', '/homepage');
  });
});
