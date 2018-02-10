export function start_timer(intervalId) {
  return (dispatch) => {
    dispatch({ type: 'START_TIMER', intervalId });
  };
}

export function tick_tock(){
  return (dispatch) => {
    var stamp = new Date().getTime()
    console.log(stamp)
    dispatch({ type: 'TICK_TOCK', stamp });
  };
}

export function end_timer(intervalId) {
  clearInterval(intervalId);
  return (dispatch) => {
    dispatch({ type: 'STOP_TIMER'});
  };
}
