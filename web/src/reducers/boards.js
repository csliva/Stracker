const initialState = {
  currentUserBoards: [],
  activeBoard: undefined,
  boardFormActive: false,
  boardUsers: Object,
  optionsActive: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USER_BOARDS_SUCCESS':
      return {
        ...state,
        currentUserBoards: action.response.data,
      };
    case 'CREATE_BOARD_SUCCESS':
      return {
        ...state,
        currentUserBoards: [
          ...state.currentUserBoards,
          action.response.data,
        ],
        activeBoard: []
      };
    case 'BOARD_JOINED':
      return {
        ...state,
        currentUserBoards: [
          ...state.currentUserBoards,
          action.response.data,
        ],
      };
    case 'FETCH_BOARD_USERS':
      return {
        ...state,
        boardUsers: action.response.data,
      };
      case 'SET_ACTIVE_BOARD':
        return {
          ...state,
          activeBoard: action.response
        };
      case 'TOGGLE_BOARD_FORM':
        return {
          ...state,
          boardFormActive: action.boardFormActive
        };
      case 'DELETE_BOARD_SUCCESS':
        return {
          ...state,
          currentUserBoards: action.response.data
        };
      case 'TOGGLE_OPTIONS':
        return {
          ...state,
          optionsActive: !action.payload
        }
    default:
      return state;
  }
}
