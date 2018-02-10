import { reset } from 'redux-form';
import api from '../api';


function getTaskEvents(taskId, dispatch) {
  return api.fetch(`/task/${taskId}/events`)
    .then((response) => {
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', response });
    });
}

// set the active task by accepting the task ID
// makes an api call to get all the post information
export function setActiveTask(id) {
  return (dispatch) => {
    dispatch({ type: 'SET_TASK' });
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
        updateTasks(dispatch);
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
  return (dispatch, getState) => {
    return api.patch(`/tasks/${getState().task.currentTask.id}`, task_params)
      .then(() => {
        updateTasks(dispatch, getState().session.currentUser.id);
        setActiveTask(getState().task.currentTask.id);
        dispatch({ type: 'EDIT_STACK'});
      })
  };
}

export function newTask(data) {
  return dispatch => api.post('/tasks', data)
    .then((response) => {
      dispatch(reset('newTask'));
      updateTasks(dispatch);
      updateActiveTask(response, dispatch);
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

function updateActiveTask(response, dispatch) {
    dispatch({ type: 'SET_STACK_REQUEST' });
    dispatch({ type: 'SET_ACTIVE_STACK', response });
}

function updateTasks(dispatch, boardId) {
    // if board is not set, use localStorage number
    var board = boardId || localStorage.board
    dispatch({ type: 'LOAD_IN_STACK' });
    return api.fetch(`/tasks/board/${board}`)
      .then((response) => {
        dispatch({type: 'RECIEVE_STACK', response})
      })
      .catch((err) => {
        console.log(err);
      });
}

// get all tasks
// event should fire on app load, and when a new task has been created
export function getAllTasks(currentUserId) {
  return (dispatch, getState) => {
    dispatch({ type: 'LOAD_IN_STACK' });
    return api.fetch(`/tasks/board/${localStorage.board}}`)
      .then((response) => {
        dispatch({type: 'RECIEVE_STACK', response})
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
