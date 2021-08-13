import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../../reducers/reduxStore';

function render(
  ui,
  {
    preloadedState,
    store = configureStore(),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router>{children}</Router></Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
