import { combineReducers, } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/AuthSlice';

const rooterReducer = combineReducers({
    // Add your reducers here
    auth: authReducer,
});

const store = configureStore({
    reducer: rooterReducer,
});

export default store;