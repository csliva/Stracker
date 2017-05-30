const initialState = {
  list: [],
  keycount: 1
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TAG':
      return {
        ...state,
        list: state.list.concat({ id: state.keycount + 1, text: action.payload}),
        keycount: state.keycount + 1,
      };
      case 'DELETE_TAG':
        return {
          ...state,
          list: state.list.slice(0, action.payload).concat(state.list.slice(action.payload + 1))
        };
    default:
        return state;
  }
}
