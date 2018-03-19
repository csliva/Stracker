const initialState = {
  taskEvents: undefined,
  loadingEvents: true,
  runningEvent: undefined
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        loadingEvents: false,
        taskEvents: action.response.data
      };
    case 'LOAD_IN_EVENTS':
      return {
        ...state,
        loadingEvents: true,
        taskEvents: {}
      };
    case 'FETCH_EVENTS_SUCCESS':
     return {
       ...state,
       loadingEvents: false,
       taskEvents: action.response.data
     };
    case 'SET_RUNNING_EVENT':
      return {
        ...state,
        runningEvent: action.response.data
      };
    default:
      return state;
  }
}
