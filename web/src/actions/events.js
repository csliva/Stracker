import api from '../api';

export function fetchEvents(stackId) {
  return dispatch => api.fetch(`/stacks/${stackId}/events`)
    .then((response) => {
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', response });
    });
}

export function addEvent(data) {
  return (dispatch, getState) => {
    return api.post(`/add_event/${getState().session.currentUser.id}/${data}`)
    .then((response) => {
      console.log(response)
    });
  };
}
