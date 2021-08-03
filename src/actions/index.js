import axios from "../axios";
import { genresURL } from "../API";

const SET_GENRES_LIST = 'SET_GENRES_LIST';

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

export {
    fetchGenresList,
}