const genresReducer = (state, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case 'SET_GENRES':
          return payload
        default:
        break;
    }
}

export default genresReducer;