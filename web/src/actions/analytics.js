import api from '../api';

//UNUSED FOR NOW
export function getCsv(board_id) {
  return dispatch => api.download(`/csv/${board_id}`)
  .then(() => {
    dispatch({ type: 'FETCH_DATA_SUCCESS'});
  });
}
