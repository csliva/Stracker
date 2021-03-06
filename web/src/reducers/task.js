const initialState = {
  formActive: true,
  editActive: false,
  currentTask: {
    id: Number,
    description: String,
    task_title: String,
    user_id: Number,
  },
  stack: Object,
  loadingStack: Boolean,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'RECIEVE_STACK':
      return {
        ...state,
        stack: action.response,
        loadingStack: false,
      };
    case 'SET_ACTIVE_TASK':
      return {
        ...state,
        currentTask: action.response.data
      };
    case 'LOAD_IN_STACK':
      return {
        ...state,
        loadingStack: true,
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
        case 'CLOSE_FORM':
          return {
            ...state,
            formActive: false,
          };
        case 'NEW_TASK':
          return {
            ...state,
            currentTask: action.response.data,
            editActive: false,
            loadingStack: true
          }
        case 'DELETE_TASK':
          return {
            ...state,
            formActive: true,
            loadingStack: true
          };
        case 'EDIT_TASK':
          return {
            ...state,
            formActive: false,
            editActive: false,
            loadingStack: true
          };
        case 'VIEW_EDIT':
          return {
            ...state,
            formActive: true,
            editActive: true,
          };
    default:
        return state;
  }
}
