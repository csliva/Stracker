const initialState = {
  currentUserBoards: [],
  activeBoard: []
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
    default:
      return state;
  }
}
