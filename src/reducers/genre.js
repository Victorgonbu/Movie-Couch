const genresReducer = (state = {}, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case 'SET_GENRES_LIST':
          return {...state, list: payload}
        default:
            return state;
    }
}

export default genresReducer;