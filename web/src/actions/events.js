import api from '../api';

export function fetchEvents(stackId) {
  return dispatch => api.fetch(`/stacks/${stackId}/events`)
    .then((response) => {
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', response });
    });
}

export function updateEvent(eventId) {
  return dispatch => api.fetch(`/events/${eventId}`)
    .then((response) => {
      dispatch({ type: 'UPDATE_EVENT_SUCCESS', response });
    });
}
