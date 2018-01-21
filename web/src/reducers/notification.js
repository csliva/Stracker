const initialState = {
  isNotified: false,
  message: String,
  style: String
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'NOTIFY':
      return {
        ...state,
        isNotified: true,
        message: action.message,
        style: action.style
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        isNotified:false,
        message: '',
        style: action.style
      };
    default:
      return state;
  }
}
