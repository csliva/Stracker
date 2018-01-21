export function clearNotification(dispatch){
  return (dispatch) => {
    dispatch({ type: 'CLEAR_NOTIFICATION'});
  };
}
export function notify(message, style){
  return (dispatch) => {
    dispatch({ type: 'NOTIFY', message: message, style: style  });
  };
}
