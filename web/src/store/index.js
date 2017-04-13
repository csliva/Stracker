import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middleWare = [thunk];

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

const store = createStoreWithMiddleware(reducers);

store.subscribe(() => {
  console.log("store updated", store.getState());
})

export default store;
