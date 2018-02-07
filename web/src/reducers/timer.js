const initialState = {
  isTiming: false,
  datetimeNow: Number,
  intervalId: Number //Not sure what interval ID type is
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
          isTiming: false
        };
    default:
      return state;
  }
}
