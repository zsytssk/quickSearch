import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer } from './contentReducer';

export const initStore = () => {
	const middleware_list = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middleware_list);

	const composedEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(reducer, composedEnhancers(middlewareEnhancer));
	return store;
};
