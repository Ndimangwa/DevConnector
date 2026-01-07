import {configureStore} from '@reduxjs/toolkit';
import alertReducer from './reducers/alert';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';

export const store = configureStore({
    reducer : {
        alert: alertReducer,
        auth: authReducer,
        profile: profileReducer
    }
});