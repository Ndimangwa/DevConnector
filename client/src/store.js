import {configureStore} from '@reduxjs/toolkit';
import alertReducer from './reducers/alert';
import authReducer from './reducers/auth';

export const store = configureStore({
    reducer : {
        alert: alertReducer,
        auth: authReducer
    }
});