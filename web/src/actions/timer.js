export const stopTimer = () => ({ type: 'STOP_TIMER' });
export const resetTimer = () => ({ type: 'RESET_TIMER' });
export const tickTimer = () => ({ type: 'TICK_TIMER' });

export function startTimer() {
  return (dispatch) => {
    let timer = setInterval(() => dispatch({ type: 'TICK_TIMER' }), 1000);
    dispatch({ type: 'START_TIMER', timer });
    dispatch({ type: 'TICK_TIMER' });
  };
}
