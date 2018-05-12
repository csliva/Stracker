const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {},
  winWidth: 0,
  mobile: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_REQUEST':
      return {
        ...state,
        willAuthenticate: true,
      };
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: true,
        currentUser: action.response.data,
      };
    case 'AUTHENTICATION_FAILURE':
      return {
        ...state,
        willAuthenticate: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: false,
        currentUser: {},
      };
    case 'IS_MOBILE':
      return {
        ...state,
        mobile: action.data,
      };
    default:
      return state;
  }
}
