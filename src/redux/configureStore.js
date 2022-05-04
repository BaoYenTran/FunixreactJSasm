//B5 TAO STORE, nho install redux yarn add redux@3.7.2
//yarn add react-redux@5.0.7 va nho provider vao app va connect main component
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Staffs } from './staffs';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Departments } from './departments';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,

        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}