const initialState = {
  all: [],
  currentUserBoards: [],
  activeBoard: Number
};

export default function (state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case 'FETCH_BOARDS_SUCCESS':
      return {
        ...state,
        all: action.response.data,
      };
    case 'FETCH_USER_BOARDS_SUCCESS':
      return {
        ...state,
        currentUserBoards: action.response.data,
      };
    case 'CREATE_BOARD_SUCCESS':
      return {
        ...state,
        all: [
          action.response.data,
          ...state.all,
        ],
        currentUserBoards: [
          ...state.currentUserBoards,
          action.response.data,
        ],
        activeBoard: action.response.data.id
      };
    case 'BOARD_JOINED':
      return {
        ...state,
        currentUserBoards: [
          ...state.currentUserBoards,
          action.response.data,
        ],
        activeBoard: action.response.data.id
      };
    case 'SET_ACTIVE_BOARD':
      return {
        ...state,
        activeBoard: action.response
      };
    default:
      return state;
  }
}
