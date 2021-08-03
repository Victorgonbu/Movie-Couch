import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import genresReducer from './genre';
import filterReducer from './filter';

const rootReducer = combineReducers({
    genres: genresReducer,
    filter: filterReducer,
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;