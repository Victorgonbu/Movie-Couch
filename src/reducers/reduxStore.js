import {createStore, combineReducers, applyMiddleware } from 'redux';
import genresReducer from './genre';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    genres: genresReducer,
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;