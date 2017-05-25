import { reset } from 'redux-form';
import api from '../api';

// set the active stack by accepting the stack ID
// makes an api call to get all the post information
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

export function deleteStack(id) {
  return (dispatch, getState) => {
    return api.delete(`/posts/${id}`)
      .then(() => {
        dispatch({ type: 'DELETE_STACK'});
        updateStacks(getState().session.currentUser.id, dispatch);
      })
  };
}

export function activateEdit(id) {
  return (dispatch) => {
    dispatch({ type: 'ACTIVATE_EDIT'});
  };
}

export function editStack(data) {
  const post_params = {"post_params": data}
  return (dispatch, getState) => {
    return api.patch(`/posts/${getState().stack.currentStack.id}`, post_params)
      .then(() => {
        updateStacks(getState().session.currentUser.id, dispatch);
        setActiveStack(getState().stack.currentStack.id);
        dispatch({ type: 'EDIT_STACK'});
      })
  };
}

export function newStack(data) {
  return dispatch => api.post('/posts', data)
    .then((response) => {
      dispatch({ type: 'RESET_TIMER' });
      dispatch(reset('newStack'));
      updateStacks(response.data.user_id, dispatch);
      updateActiveStack(response, dispatch);
    });
}

//deactivate the form view
//shows stack data instead
export function formDeactivate(){
  return (dispatch) => {
    dispatch({type: 'FORM_DEACTIVATE'});
  }
}
//activates form view to create a new stack
export function formActivate(){
  return (dispatch) => {
    dispatch({type: 'FORM_ACTIVATE'});
  }
}

function updateActiveStack(response, dispatch) {
    dispatch({ type: 'SET_STACK_REQUEST' });
    dispatch({ type: 'SET_ACTIVE_STACK', response });
}

function updateStacks(currentUserId, dispatch) {
  console.log("Getting all stacks for " + currentUserId);
    dispatch({ type: 'GET_STACKS_REQUEST' });
    return api.fetch(`/posts/user/${currentUserId}`)
      .then((response) => {
        dispatch({type: 'RECIEVE_ALL_STACKS', response})
      })
      .catch((err) => {
        console.log(err);
      });
}

// get all stacks
// event should fire on app load, and when a new stack has been created
export function getAllStacks(currentUserId) {
  console.log("Getting all stacks for " + currentUserId);
  return (dispatch) => {
    dispatch({ type: 'GET_STACKS_REQUEST' });
    return api.fetch(`/posts/user/${currentUserId}`)
      .then((response) => {
        dispatch({type: 'RECIEVE_ALL_STACKS', response})
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function count(){
  return (dispatch) => {
    dispatch({ type: "COUNT_UP"});
  }
}
