import React from 'react';
import { render, fireEvent, screen } from '../../components/utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Backdrop from '../../components/presentationals/movie_show/Backdrop';
import '../../components/utils/icons';

const mockNavigate = jest.fn();

jest.mock('react-router-dom/', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Backdrop', () => {
  beforeEach(() => {
    render(<Backdrop
      backdropPath="/backdrop.png"
      title="Movie title"
      tagline="Movie tagline"
      genres={[{ id: 1, name: 'IT' }]}
    />);
  });
  it('render movie backdrop image, title, tagline and genres', () => {
    const { getByText, getByTestId, getByAltText } = screen;
    expect(getByAltText('backdrop')).toBeInTheDocument();
    expect(getByTestId('back-arrow')).toBeInTheDocument();
    expect(getByText('Movie title')).toBeInTheDocument();
    expect(getByText('Movie tagline')).toBeInTheDocument();
    expect(getByText('IT')).toBeInTheDocument();
  });

  it('render back arrow icon to go back Home component when clicked', () => {
    const { getByTestId } = screen;
    fireEvent.click(getByTestId('back-arrow'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
