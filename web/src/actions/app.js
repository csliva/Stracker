import { reset } from 'redux-form';
import api from '../api';



function getTaskEvents(taskId, dispatch) {
  dispatch({ type: 'LOAD_IN_EVENTS' });
  return api.fetch(`/task/${taskId}/events`)
    .then((response) => {
      console.log(response)
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', response });
    });
}

// set the active task by accepting the task ID
// makes an api call to get all the post information
export function setActiveTask(id) {
  console.log("_*_*_*_*_SET ACTIVE TASK*_*_*_*__")
  console.log(id)
  return (dispatch) => {
    return api.fetch(`/tasks/${id}`)
      .then((response) => {
        getTaskEvents(id, dispatch)
        dispatch({ type: 'SET_ACTIVE_TASK', response });
      })
      .catch((err) => {
        console.log(err)
      });
  };
}

export function deleteTask(id) {
  return (dispatch, getState) => {
    return api.delete(`/tasks/${id}`)
      .then(() => {
        dispatch({ type: 'DELETE_TASK'});
        // UPDATE STACK
        return api.fetch(`/tasks/board/${localStorage.board}`)
          .then((response) => {
            dispatch({type: 'RECIEVE_STACK', response})
          })
          .catch((err) => {
            console.log(err);
          });
      })
  };
}

export function activateEdit(id) {
  return (dispatch) => {
    dispatch({ type: 'VIEW_EDIT'});
  };
}

export function editTask(data) {
  const task_params = {"task_params": data}
  console.log(task_params)
  return (dispatch, getState) => {
    return api.patch(`/tasks/${getState().task.currentTask.id}`, task_params)
      .then(() => {
        setActiveTask(getState().task.currentTask.id);
        dispatch({ type: 'EDIT_TASK'});
        // UPDATE STACK
        return api.fetch(`/tasks/board/${localStorage.board}`)
          .then((response) => {
            dispatch({type: 'RECIEVE_STACK', response})
          })
          .catch((err) => {
            console.log(err);
          });
      })
  };
}

export function newTask(data) {
  return (dispatch, getState) => api.post('/tasks', data)
    .then((response) => {
      //reset form content
      dispatch(reset('newTask'));
      //NEW_TASK has been sent
      dispatch({ type: 'NEW_TASK', response });
      // UPDATE STACK
      return api.fetch(`/tasks/board/${localStorage.board}`)
        .then((response) => {
          dispatch({type: 'RECIEVE_STACK', response})
        })
        .catch((err) => {
          console.log(err);
        });
    });
}

//deactivate the form view
//shows task data instead
export function formDeactivate(){
  return (dispatch) => {
    dispatch({type: 'FORM_DEACTIVATE'});
  }
}
//activates form view to create a new task
export function formActivate(){
  return (dispatch) => {
    dispatch({type: 'FORM_ACTIVATE'});
  }
}

// get all tasks
// event should fire on app load, and when a new task has been created
export function getAllTasks() {
  return (dispatch) => {
    dispatch({ type: 'LOAD_IN_STACK' });
    return api.fetch(`/tasks/board/${localStorage.board}`)
      .then((response) => {
        dispatch({type: 'RECIEVE_STACK', response})
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
