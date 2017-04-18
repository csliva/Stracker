import { reset } from 'redux-form';
import api from '../api';

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
  dispatch({ type: 'GET_STACKS_REQUEST' });
  api.fetch(`/posts/user/${response.data.id}`)
      .then((response) => {
        dispatch({type: 'RECIEVE_ALL_STACKS', response})
      })
      .catch((err) => {
        console.log(err);
      });
  };

export function login(data, router) {
  return dispatch => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      router.transitionTo('/');
    });
}

export function signup(data, router) {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      router.transitionTo('/');
    });
}

export function logout(router) {
  return dispatch => api.delete('/sessions')
    .then(() => {
      dispatch({ type: 'RESET_TIMER' })
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      router.transitionTo('/login');
    });
}


export function authenticate() {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATION_REQUEST' });
    return api.post('/sessions/refresh')
      .then((response) => {
        setCurrentUser(dispatch, response);
      })
      .catch(() => {
        localStorage.removeItem('token');
        window.location = '/login';
      });
  };
}

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });
