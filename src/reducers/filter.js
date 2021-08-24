const filterReducer = (state = {
  current: 'Popular',
  searchActive: false,
  ref: null,
  currentPage: 2,
  didNavigate: false,
  error: false,
}, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CURRENT_FILTER':
      return { ...state, current: payload };
    case 'SET_FILTER_REF':
      return { ...state, ref: payload };
    case 'SET_CURRENT_CONTENT':
      return { ...state, content: payload };
    case 'ADD_TO_CONTENT':
      return { ...state, content: state.content.concat(payload) };
    case 'SET_CONTENT_URL':
      return { ...state, contentURL: payload };
    case 'SET_SEARCH_ACTIVE':
      return { ...state, searchActive: !state.searchActive };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: payload };
    case 'SET_DID_NAVIGATE':
      return { ...state, didNavigate: payload };
    case 'SET_ERROR_STATE':
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default filterReducer;
