import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { todo } from './todo/reducer';

const reducer = combineReducers({ counter: todo });

export type GlobalStates = ReturnType<typeof reducer>;
export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
