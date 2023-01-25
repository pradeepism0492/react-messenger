import { createStore, compose, combineReducers, applyMiddleware } from "redux";

import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({});

const middleware = [thunkMiddleware];

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default store;
