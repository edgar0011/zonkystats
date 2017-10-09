/**
 * Created by edgar on 11/01/2017.
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import loansReducer from '../reducers/loansReducer';

const rootReducer = combineReducers({ market: loansReducer });
let window;
const composeEnhancers =
  typeof window === 'object' &&
  /* eslint no-underscore-dangle: 0 */
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(rootReducer, {}, enhancer);

store.subscribe(() => {
  console.log('Store, subscribe');
  console.log(arguments);
  console.log('store changed', store.getState());
});

export default store;
