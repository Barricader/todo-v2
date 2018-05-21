/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';
import StateLoader from './state.loader.js';

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  // Persistent state helper
  const stateLoader = new StateLoader(initialState);
  const stateLoaderState = stateLoader.loadState();

  // const store = createStore(rootReducer, initialState, compose(...enhancers));
  // const store = createStore(rootReducer, stateLoaderState || initialState, compose(...enhancers));
  const store = createStore(rootReducer, stateLoaderState, compose(...enhancers));

  store.subscribe(() => {
    stateLoader.saveState(store.getState());
  });

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
