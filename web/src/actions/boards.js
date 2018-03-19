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

export function fetchBoardUsers(board_id) {
  return dispatch => api.fetch(`/board/${board_id}/users`)
    .then((response) => {
      dispatch({ type: 'FETCH_BOARD_USERS', response })
    });
}

export function fetchCurrentBoard(boardId){
  return dispatch => api.fetch(`/board/${boardId}`)
    .then((response) => {
      dispatch({ type: 'SET_ACTIVE_BOARD', response });
    });
}

function getBoardStack(dispatch, boardId) {
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

export function setActiveBoard(idNum, boardData, router) {
  localStorage.setItem('board', JSON.stringify(idNum));
  return dispatch => {
    getBoardStack(dispatch, idNum)
    dispatch({ type: 'SET_ACTIVE_BOARD', boardData });
    dispatch({ type: 'FORM_ACTIVATE' });
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
      router.transitionTo(`/boards`);
    });
}

export function joinBoard(boardId, router) {
  return dispatch => api.post(`/boards/${boardId}/join`)
    .then((response) => {
      dispatch({ type: 'BOARD_JOINED', response });
      router.transitionTo(`/`);
    });
}

export function toggleBoardForm(boardFormActive){
 return (dispatch) => {
   dispatch({ type: 'TOGGLE_BOARD_FORM', boardFormActive });
 };
}

export function deleteBoard(user_id, board_id) {
  return (dispatch, getState) => api.post(`/userboard/${user_id}/${board_id}`)
    .then((response) => {
      dispatch({ type: 'DELETE_BOARD_SUCCESS', response });
      //UPDATE RUNNING EVENT
      return api.fetch(`/board/${getState().session.currentUser.id}/runningEvent`)
        .then((response) => {
          dispatch({ type: 'SET_RUNNING_EVENT', response });
        });
    });
}
