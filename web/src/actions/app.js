import api from '../api';

export function setActiveStack(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_STACK_REQUEST' });
    return api.fetch(`/posts/${id}`)
      .then((response) => {
        dispatch({ type: 'SET_ACTIVE_STACK', response });
      })
      .catch(() => {
        console.log("Uh oh")
      });
  };
}

export function getAllStacks(currentUserId) {
  console.log("Getting all stacks for " + currentUserId);
  return (dispatch) => {
    dispatch({ type: 'GET_STACKS_REQUEST' });
    return api.fetch(`/posts/user/${currentUserId}`)
      .then((response) => {
        console.log(response);
        dispatch({type: 'RECIEVE_ALL_STACKS', response})
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
