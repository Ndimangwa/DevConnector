import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from './types';
import { alert_danger, alert_success } from './styles';
import {setAlert} from './alert';

//GET CURRENTLY LOGGED-IN USER PROFILE
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err)   {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
//CREATE/EDIT [MY] PROFILE
//we use withRouter due to history object 
export const createProfile = (formData, navigate, edit=false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updates Successful' : 'Profile Created Successful', alert_success, 5000));
        //Now history object , due to this statement history.push, we are using withRouter
        if (! edit) {
            //Once profile created view my dashboard
            navigate('/dashboard');
        }
    } catch (err)   {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, alert_danger, 5000)));
        }
        //Now profile error
        dispatch({
            type: PROFILE_ERROR,
            payload : { msg: err.response.statusText, status: err.response.status }
        });
    }
} 
//ADD EXPERIENCE
export const addExperience = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Added Successful', alert_success, 5000));
        //Proceed to Dashboard
        navigate('/dashboard');
    } catch (err)   {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, alert_danger, 5000)));
        }
        //Now profile error
        dispatch({
            type: PROFILE_ERROR,
            payload : { msg: err.response.statusText, status: err.response.status }
        });
    }
}
//ADD EDUCATION
export const addEducation = (formData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Added Successful', alert_success, 5000));
        //Proceed to Dashboard
        navigate('/dashboard');
    } catch (err)   {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, alert_danger, 5000)));
        }
        //Now profile error
        dispatch({
            type: PROFILE_ERROR,
            payload : { msg: err.response.statusText, status: err.response.status }
        });
    }
}