import axios from "../axios";
import { genresURL, movieURL, discoverURL } from "../API";

const SET_GENRES_LIST = 'SET_GENRES_LIST';
const SET_CURRENT_CONTENT = 'SET_CURRENT_CONTENT';
const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';

const setGenresList = (list) => {
    return {type: SET_GENRES_LIST, payload: list}
}

const fetchGenresList = async(dispatch, getState) => {
    try {
        if(!getState().genres.list) {
            const request = await axios.get(genresURL);
            dispatch(setGenresList(request.data.genres));
        }
    }catch(error) {
        console.log(error)
    }
};

const setContent = (list) => {
    return{type: SET_CURRENT_CONTENT, payload: list}
};

const parameterize = (string) => {
    const stringCopy = string.slice();
    return stringCopy.trim().toLowerCase().replace(/\s/g, "_");
};

const fetchContent = (filter) => {
    
    return async (dispatch) => {
        try {
            console.log(filter)
            const currentFilter = parameterize(filter);
            console.log(currentFilter);
            let url = currentFilter === 'popular' || currentFilter === 'top_rated' ? movieURL : discoverURL;
            url += currentFilter;
            console.log(url)
            const request = await axios.get(url);
            console.log(request.data.results)
            dispatch(setContent(request.data.results));
        }catch(error) {
            console.log(error);
        }
    }
};

const setCurrentFilter = (filter) => {
    return { type: SET_CURRENT_FILTER, payload: filter }
};

export {
    fetchGenresList,
    fetchContent,
    setCurrentFilter,
}