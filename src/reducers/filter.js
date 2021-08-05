const filterReducer = (state = {current: 'Popular', searchActive: false}, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'SET_CURRENT_FILTER':
          return {...state, current: payload};
        case 'SET_CURRENT_CONTENT':
          return {...state, content: payload};
        case 'SET_SEARCH_ACTIVE': 
          return {...state, searchActive: true};
        default: 
          return state;       
    }
};

export default filterReducer;