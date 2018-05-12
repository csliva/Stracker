import api from '../api';

/*export function fetchEvents(taskId) {
  return dispatch => api.fetch(`/task/${taskId}/events`)
    .then((response) => {
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', response });
    });
}*/

export function deleteEvent(eventId) {
  //we need to pass in task ID as well.
  return (dispatch, getState) => {
    return api.delete(`/events/${eventId}`)
      .then(() => {
        dispatch({ type: 'DELETE_EVENT'});
        //update events here
        return api.fetch(`/task/${getState().task.currentTask.id}/events`).then((response) => {
          dispatch({ type: 'GET_EVENTS', response})
          //UPDATE RUNNING EVENT
          return api.fetch(`/board/${getState().session.currentUser.id}/runningEvent`)
            .then((response) => {
              dispatch({ type: 'SET_RUNNING_EVENT', response });
            });
        })
      })
  };
}

/*export function addEvent(taskId, runningTimer) {
  if (runningTimer.length === 0 || runningTimer[0] === taskId){
    //no previous timer exists or previous timer is same as taskId so add event as normal
    return (dispatch, getState) => {
      dispatch({ type: 'LOAD_IN_EVENTS'});
      dispatch({ type: 'SET_TIMING_TASK', taskId})
      return api.post(`/add_event/${getState().session.currentUser.id}/${taskId}`)
      .then((response) => {
        dispatch({ type: 'GET_EVENTS', response})
        // UPDATE STACK
        return api.fetch(`/tasks/board/${localStorage.board}`)
          .then((response) => {
            dispatch({type: 'RECIEVE_STACK', response})
          })
          .catch((err) => {
            console.log(err);
          });
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
          // UPDATE STACK
          return api.fetch(`/tasks/board/${localStorage.board}`)
            .then((response) => {
              dispatch({type: 'RECIEVE_STACK', response})
            })
            .catch((err) => {
              console.log(err);
            });
        });
    };
  }
}*/

export function addEvent(taskId, runningTimer) {
    //no previous timer exists or previous timer is same as taskId so add event as normal
    return (dispatch, getState) => {
      dispatch({ type: 'LOAD_IN_EVENTS'});
      dispatch({ type: 'SET_TIMING_TASK', taskId})
      return api.post(`/add_event/${getState().session.currentUser.id}/${taskId}`)
      .then((response) => {
        dispatch({ type: 'GET_EVENTS', response})
        // UPDATE STACK
        return api.fetch(`/tasks/board/${localStorage.board}`)
          .then((response) => {
            dispatch({type: 'RECIEVE_STACK', response})
            //UPDATE RUNNING EVENT
            return api.fetch(`/board/${getState().session.currentUser.id}/runningEvent`)
              .then((response) => {
                dispatch({ type: 'SET_RUNNING_EVENT', response });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
  }

//FUNC:
// GET: running tasks -- tasks with null end time
// GET: my running task
export function getRunningEvent(userId) {
  return dispatch => api.fetch(`/board/${userId}/runningEvent`)
    .then((response) => {
      dispatch({ type: 'SET_RUNNING_EVENT', response });
    });
}
