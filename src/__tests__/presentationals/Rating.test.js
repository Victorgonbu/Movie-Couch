import React from 'react';
import { render } from '../../components/utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Rating from '../../components/presentationals/movie_show/Rating';

/* eslint-disable react/display-name */
jest.mock('react-rating-stars-component', () => () => <div data-testid="rating-stars" />);

describe('Rating', () => {
  it('render rating stars component together with vote average and votes count', () => {
    const { getByText, getByTestId } = render(<Rating
      className="rating"
      average={8}
      count={100}
    />);

    expect(getByTestId('rating')).toHaveClass('rating');
    expect(getByTestId('rating-stars')).toBeInTheDocument();
    expect(getByText('8/10')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });
});
