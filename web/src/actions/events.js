import api from '../api';

export function fetchEvents(taskId) {
  console.log(taskId)
  return dispatch => api.fetch(`/task/${taskId}/events`)
    .then((response) => {
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', response });
    });
}

export function addEvent(taskId, runningTimer) {
  if (runningTimer.length === 0 || runningTimer[0] === taskId){
    //no previous timer exists or previous timer is same as taskId so add event as normal
    return (dispatch, getState) => {
      dispatch({ type: 'LOAD_IN_EVENTS'});
      dispatch({ type: 'SET_TIMING_TASK', taskId})
      return api.post(`/add_event/${getState().session.currentUser.id}/${taskId}`)
      .then((response) => {
        dispatch({ type: 'GET_EVENTS', response})
      });
    };
  } else {
    //previous timer is running. Automatically stop it and then create new event elsewhere
    return (dispatch, getState) => {
      dispatch({ type: 'LOAD_IN_EVENTS'});
      api.post(`/add_event/${getState().session.currentUser.id}/${runningTimer[0]}`)
      return api.post(`/add_event/${getState().session.currentUser.id}/${taskId}`)
        .then((response) => {
          dispatch({ type: 'SET_TIMING_TASK', taskId})
          dispatch({ type: 'GET_EVENTS', response})
        });
    };
  }
}
