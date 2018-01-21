import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import stack from './stack';
import boards from './boards';
import notification from './notification';

const appReducer = combineReducers({
  form,
  session,
  stack,
  boards,
  notification
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
