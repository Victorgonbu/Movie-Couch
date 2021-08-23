import axios from '../axios';
import {
  genresURL, movieURL, discoverURL, searchMovieURL,
} from '../API';

const SET_GENRES_LIST = 'SET_GENRES_LIST';
const SET_CURRENT_CONTENT = 'SET_CURRENT_CONTENT';
const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';
const SET_SEARCH_ACTIVE = 'SET_SEARCH_ACTIVE';
const SET_CONTENT_URL = 'SET_CONTENT_URL';
const ADD_TO_CONTENT = 'ADD_TO_CONTENT';
const SET_FILTER_REF = 'SET_FILTER_REF';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_DID_NAVIGATE = 'SET_DID_NAVIGATE';
const SET_ERROR_STATE = 'SET_ERROR_STATE';

const setGenresList = (list) => ({ type: SET_GENRES_LIST, payload: list });

const setContent = (list) => ({ type: SET_CURRENT_CONTENT, payload: list });

const addToContent = (list) => ({ type: ADD_TO_CONTENT, payload: list });

const setContentURL = (url) => ({ type: SET_CONTENT_URL, payload: url });

const filterResults = (results) => results.filter((result) => result.poster_path);

const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });

const setDidNavigate = (bool) => ({ type: SET_DID_NAVIGATE, payload: bool });

const setErrorState = (bool) => ({ type: SET_ERROR_STATE, payload: bool });

const parameterize = (string) => {
  const stringCopy = string.slice();
  return stringCopy.trim().toLowerCase().replace(/\s/g, '_');
};

const fetchGenresList = async (dispatch, getState) => {
  try {
    if (!getState().genres.list) {
      const request = await axios.get(genresURL);
      dispatch(setGenresList(request.data.genres));
    }
  } catch (error) {
    dispatch(setErrorState(true));
  }
};

const fetchContent = (filter) => async (dispatch) => {
  try {
    const currentFilter = parameterize(filter);
    const url = currentFilter === 'popular' || currentFilter === 'top_rated'
      ? `${movieURL + currentFilter}?` : `${discoverURL + currentFilter}&`;
    const request = await axios.get(url);
    const results = filterResults(request.data.results);
    dispatch(setContentURL(url));
    dispatch(setContent(results));
  } catch (error) {
    console.log('manolo');
    dispatch(setErrorState(true));
  }
};

const fetchMoreContent = (setHasMore) => async (dispatch, getState) => {
  try {
    const page = getState().filter.currentPage;
    const url = `${getState().filter.contentURL}page=${page}`;
    const request = await axios.get(url);
    const results = filterResults(request.data.results);
    if (page >= request.data.total_pages) setHasMore(false);
    dispatch(setCurrentPage(page + 1));
    dispatch(addToContent(results));
  } catch (error) {
    dispatch(setErrorState(true));
  }
};

const setCurrentFilter = (filter) => ({ type: SET_CURRENT_FILTER, payload: filter });

const setSearchActive = () => ({ type: SET_SEARCH_ACTIVE });

const fetchSearch = (query) => async (dispatch) => {
  try {
    const url = `${searchMovieURL + query}&`;
    const request = await axios.get(url);
    const results = filterResults(request.data.results);
    dispatch(setCurrentFilter(null));
    dispatch(setContentURL(url));
    dispatch(setContent(results));
  } catch (error) {
    dispatch(setErrorState(true));
  }
};

const setFilterRef = (ref) => ({ type: SET_FILTER_REF, payload: ref });

export {
  fetchGenresList,
  fetchContent,
  setCurrentFilter,
  setSearchActive,
  fetchSearch,
  fetchMoreContent,
  setFilterRef,
  setCurrentPage,
  setContent,
  setDidNavigate,
  setErrorState,
};
