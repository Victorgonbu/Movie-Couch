import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import MainDetail from '../../presentationals/movie_show/MainDetail';
import '../../utils/icons';
/* eslint-disable react/display-name */
jest.mock('@fortawesome/react-fontawesome', () => ({
  ...jest.requireActual('@fortawesome/react-fontawesome'),
  FontAwesomeIcon: () => <span data-testid="fontawesome-icon" />,
}));

describe('MainDetail', () => {
  it('render main detail with icon passed in props', () => {
    const { getByText, getByTestId } = render(<MainDetail
      iconClass="iconClass"
      icon="icon"
      text="Main detail"
      boldText="Bold text"
    />);
    expect(getByText('Main detail')).toBeInTheDocument();
    expect(getByText('Bold text')).toBeInTheDocument();
    expect(getByTestId('fontawesome-icon')).toBeInTheDocument();
  });
});
