import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '../utils/icons';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBox from '../containers/SearchBox';
import { setSearchActive } from '../../actions/index';

const mockStore = configureStore([thunk]);

const server = setupServer(
  rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => res(ctx.json({
    results: [
      {
        id: 1,
        title: 'f9',
        poster_path: '/posterimage.png',
      },
    ],
  }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SearchBox', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filter: {
        searchActive: false,
        current: null,
      },
    });
    render(<Provider store={store}><Router><SearchBox /></Router></Provider>);
  });

  describe('search button, input and close button', () => {
    it('dispatch action and render correctly if search icon is clicked', async () => {
      expect(screen.getByText('×')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type movie title')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      const searchIcon = screen.getByTestId('search-icon');
      const actions = store.getActions();
      expect(actions.length).toBe(0);
      fireEvent.click(searchIcon);
      expect(actions.length).toBe(1);
      expect(actions[0]).toEqual(setSearchActive());
    });
  });

  it('dispatch actions to fetch results for search query when search button is clicked', async () => {
    const searchInput = screen.getByPlaceholderText('Type movie title');
    const searchButton = screen.getByText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'f9' } });
    fireEvent.click(searchButton);
    const actions = store.getActions();
    await waitFor(() => expect(actions.length).toBe(3));
    expect(actions.length).toBe(3);
    expect(actions[0]).toEqual({ type: 'SET_CURRENT_FILTER', payload: null });
    expect(actions[1]).toEqual({ type: 'SET_CONTENT_URL', payload: '/search/movie?query=f9&' });
    expect(actions[2]).toEqual({
      type: 'SET_CURRENT_CONTENT',
      payload: [{
        id: 1,
        title: 'f9',
        poster_path: '/posterimage.png',
      }],
    });
  });

  it('dispatch action to make search box not visible when close button is clicked', () => {
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    const actions = store.getActions();
    expect(actions[0]).toEqual(setSearchActive());
  });
});
