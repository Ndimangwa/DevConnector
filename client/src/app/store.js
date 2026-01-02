import {configureStore} from '@reduxjs/toolkit';

import alertReducer from '../features/alert/alertSlice';
//import authReducer from '../features/auth/authSlice';
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        //auth: authReducer,
        //counter: counterReducer
        alert: alertReducer
    }
});