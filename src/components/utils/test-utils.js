import React from 'react';
import {
  render as rtlRender, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-mutable-exports
let reduxStore;

function render(
  ui,
  {
    preloadedState,
    store = configureStore([thunk]),
    ...renderOptions
  } = {},
) {
  reduxStore = store(renderOptions);
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={reduxStore}><Router>{children}</Router></Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export {
  render, reduxStore, waitFor, screen, fireEvent,
};
