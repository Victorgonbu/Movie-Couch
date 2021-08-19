import React from 'react';
import { render, fireEvent, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Producers from '../../presentationals/movie_show/Producers';

describe('Producers', () => {
  it('map and render list of producers passed in props', () => {
    const data = [{
      name: 'Valid producer',
      logo_path: '/logopath.png',
    }, {
      name: 'Invalid producer',
      logo_path: null,
    }];
    const { queryByText, getByText, getByAltText } = render(<Producers
      list={data}
    />);

    expect(getByText('Valid producer')).toBeInTheDocument();
    expect(getByAltText('Producer Logo')).toBeInTheDocument();
    expect(queryByText('Invalid producer')).toBeFalsy();
  });
});
