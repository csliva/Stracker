import api from '../api';

export function setActiveStack(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_STACK_REQUEST' });
    return api.fetch(`/posts/${id}`)
      .then((response) => {
        setStack(dispatch, response);
      })
      .catch(() => {
        console.log("Uh oh")
      });
  };
}
function setStack(dispatch, response) {
  dispatch({ type: 'SET_ACTIVE_STACK', response });
}
