const filterReducer = (state = {current: 'Popular'}, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'SET_CURRENT_FILTER':
          return {...state, current: payload};
        case 'SET_CURRENT_CONTENT':
          return {...state, content: payload};
        default: 
          return state;       
    }
};

export default filterReducer;