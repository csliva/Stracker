const initialState = {
  currentUserBoards: [],
  activeBoard: [],
  boardFormActive: false
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
      };
    case 'BOARD_JOINED':
      return {
        ...state,
        currentUserBoards: [
          ...state.currentUserBoards,
          action.response.data,
        ],
      };
      case 'SET_ACTIVE_BOARD':
        return {
          ...state,
          activeBoard: action.boardData
        };
      case 'TOGGLE_BOARD_FORM':
        return {
          ...state,
          boardFormActive: action.boardFormActive
        };
    default:
      return state;
  }
}
