const initialState = {
  formActive: false,
  currentStack: {
    id: Number,
    notes: String,
    post_title: String,
    time: Number,
    user_id: Number,
  }
}
export default function (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case 'FORM_ACTIVATE':
      return {
        ...state,
        formActive: true,
      };
      case 'FORM_DEACTIVATE':
        return {
          ...state,
          formActive: false,
        };
      case 'SET_ACTIVE_STACK':
        return {
          ...state,
          currentStack: action.response.data,
        };
        case 'SET_STACK_REQUEST':
          return {
            ...state,
          };
    default:
        return state;
  }
}
