import axios from 'axios';
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    PROFILE_CLEAR
} from './types';
import {setAlert} from '../actions/alert';
import {alert_danger} from '../actions/styles';
import setAuthToken from '../utils/setAuthToken';

//GET CURRENTLY LOGGED-IN USER
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err)   {
        dispatch({
            type: AUTH_ERROR
        });
    }
}
//LOG-IN EXISTING USER
export const login = ({email, password}) => async (dispatch) => {
    //config
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //body
    const body = JSON.stringify({email, password});
    //request
    try {
        //Better clear previous profiles
        dispatch({
            type: PROFILE_CLEAR
        });
       const res = await axios.post('/api/auth', body, config);
       //if you are here then everything was complete
       dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
       }); 
       //we need to loadUser
       dispatch(loadUser());
    } catch (err) {
        //error list
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, alert_danger, 5000)));
        }
        //login -failed
        dispatch({
            type: LOGIN_FAIL
        });
    }
}
//REGISTER NEW USER
export const register = ({name, email, password}) => async (dispatch) => {
    //config
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //body
    const body = JSON.stringify({name, email, password});
    //request
    try {
        //Better clear previous profiles
       dispatch({
            type: PROFILE_CLEAR
       });
       const res = await axios.post('/api/users', body, config);
       //if you are here then everything was complete
       dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
       }); 
       //we need to loadUser
       dispatch(loadUser());
    } catch (err) {
        //error list
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, alert_danger, 5000)));
        }
        //login -failed
        dispatch({
            type: REGISTER_FAIL
        });
    }
}
//LOGOUT
export const logout = (navigate) => (dispatch) => {
    dispatch({
        type: PROFILE_CLEAR
    });
    dispatch({ 
        type: LOGOUT
     });
     //go to home page
     navigate('/');
}