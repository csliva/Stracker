import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const loggingEnabled = true;

const middleWare = [thunk];
loggingEnabled === true ? middleWare.push(logger) : console.log("Logger middleware is disabled");

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
