const initialState = {
  formActive: true,
  editActive: false,
  currentStack: {
    id: Number,
    notes: String,
    post_title: String,
    time: Number,
    user_id: Number,
  },
  allStacks: Object,
  loadingStacks: Boolean,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'RECIEVE_ALL_STACKS':
      return {
        ...state,
        allStacks: action.response,
        loadingStacks: false,
      };
    case 'GET_STACKS_REQUEST':
      return {
        ...state,
        loadingStacks: true,
      };
    case 'FORM_ACTIVATE':
      return {
        ...state,
        formActive: true,
        editActive: false,
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
          editActive: false,
        };
        case 'SET_STACK_REQUEST':
          return {
            ...state,
            formActive: false,
          };
        case 'DELETE_STACK':
          return {
            ...state,
            formActive: true,
          };
        case 'EDIT_STACK':
          return {
            ...state,
            formActive: false,
            editActive: false,
          };
        case 'ACTIVATE_EDIT':
          return {
            ...state,
            formActive: true,
            editActive: true,
          };
    default:
        return state;
  }
}
