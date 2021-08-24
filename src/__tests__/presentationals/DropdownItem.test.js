import React from 'react';
import {
  render, fireEvent, screen,
} from '../../components/utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import DropdownItem from '../../components/presentationals/DropdownItem';

const handleButtonClick = jest.fn();

describe('DropdownItem', () => {
  describe('render button with attributes passed in props', () => {
    it('when text, value and handleClick click event are passed', () => {
      render(<DropdownItem
        text="Action"
        value={1}
        handleClick={handleButtonClick}
      />);
      const item = screen.getByText('Action');
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('value', '1');
      fireEvent.click(item);
      expect(handleButtonClick).toHaveBeenCalledTimes(1);
    });
  });

  it('when text, value, handleClick event and initialRef are passed', () => {
    const initialRef = { current: null };
    render(<DropdownItem
      text="Action"
      value={1}
      handleClick={handleButtonClick}
      initialRef={initialRef}
    />);
    const item = screen.getByText('Action');
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute('value', '1');
    expect(initialRef.current).toBeTruthy();
    fireEvent.click(item);
    expect(handleButtonClick).toHaveBeenCalledTimes(1);
  });
});
