import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const loggingEnabled = true;

const middleWare = [thunk];

// Prevents certain logging events from logging
const reduxlogger = createLogger({
  predicate: (getState, action) => action.type !== 'TICK_TOCK'
});

loggingEnabled ? middleWare.push(reduxlogger) : console.log("Logger middleware is disabled");

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
