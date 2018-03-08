import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { connectRoutes } from 'redux-first-router';

import routes from './router';
import routerOptions from './router/options';
import * as middlewareModules from './middleware';
import * as reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const customMiddleware = Object.values(middlewareModules);

// Setup redux-first-router
const history = createHistory();
const {
    reducer: routerReducer,
    middleware: routerMiddleware,
    enhancer: routerEnhancer,
} = connectRoutes(history, routes, routerOptions);

// Generate store from reducers and enhancers
const combinedReducers = combineReducers({
  location: routerReducer,
  ...reducers,
});

const middleware = applyMiddleware(routerMiddleware, ...customMiddleware);
const enhancers = composeEnhancers(routerEnhancer, middleware);
const store = createStore(combinedReducers, enhancers);

export default store;
