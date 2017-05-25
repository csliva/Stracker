const initialState = {
  time: 0,
  timer: () => null,
  timerActive: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        timer: action.timer,
        timerActive: true,
      };
    case 'TICK_TIMER':
      return {
        ...state,
        time: state.time+1,
      };
    case 'RESET_TIMER':
      return {
        ...state,
        time: 0,
        timer: clearInterval(state.timer),
        timerActive: false,
      };
    case 'STOP_TIMER':
      return {
        ...state,
        timer: clearInterval(state.timer),
        timerActive: false,
      };
      case 'SET_TIMER':
      console.log(state);
        return {
          ...state
        };
    default:
      return state;
  }
}
