import { reset } from 'redux-form';
import api from '../api';

//generate slug
function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

export function fetchBoards() {
  return dispatch => api.fetch('/boards')
    .then((response) => {
      dispatch({ type: 'FETCH_BOARDS_SUCCESS', response });
    });
}

export function setActiveBoard(response, dispatch, router) {
  return (dispatch) => {
    dispatch({ type: 'SET_ACTIVE_BOARD', response });
    router.transitionTo('/');
  };
}

export function fetchUserBoards(userId) {
  return dispatch => api.fetch(`/users/${userId}/boards`)
    .then((response) => {
      dispatch({ type: 'FETCH_USER_BOARDS_SUCCESS', response });
    });
}

export function createBoard(data, router) {
  data.slug = convertToSlug(data.name)
  return dispatch => api.post('/boards', data)
    .then((response) => {
      dispatch({ type: 'CREATE_BOARD_SUCCESS', response });
      dispatch(reset('newBoard'));
      //router.transitionTo(`/r/${response.data.id}`);
    });
}

export function joinBoard(boardId, router) {
  return dispatch => api.post(`/boards/${boardId}/join`)
    .then((response) => {
      dispatch({ type: 'BOARD_JOINED', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
}
