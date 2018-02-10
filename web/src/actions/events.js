import api from '../api';
import moment from 'moment';

export function fetchEvents(taskId) {
  console.log(taskId)
  return dispatch => api.fetch(`/task/${taskId}/events`)
    .then((response) => {
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', response });
    });
}

export function addEvent(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'LOAD_IN_EVENTS'});
    return api.post(`/add_event/${getState().session.currentUser.id}/${data}`)
    .then((response) => {
      dispatch({ type: 'GET_EVENTS', response})

    });
  };
}
