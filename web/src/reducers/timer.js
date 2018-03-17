const initialState = {
  isTiming: false,
  datetimeNow: new Date().getTime(),
  intervalId: Number, //Not sure what interval ID type is
  runningTimer: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TICK_TOCK':
      return {
        ...state,
        datetimeNow: action.stamp
      };
    case 'START_TIMER':
      return {
        ...state,
        isTiming: true,
        intervalId: action.intervalId
      };
      case 'STOP_TIMER':
        return {
          ...state,
          isTiming: false,
          runningTimer: [null]
        };
      case 'SET_TIMING_TASK':
        return {
          ...state,
          isTiming: true,
          runningTimer: [action.taskId]
        }
    default:
      return state;
  }
}
