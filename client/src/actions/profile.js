import axios from 'axios';
import {
    GET_PROFILE, 
    PROFILE_ERROR, 
    UPDATE_PROFILE, 
    PROFILE_CLEAR,
    ACCOUNT_DELETED
} from './types';
import { alert_danger, alert_success, alert_dark } from './styles';
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
//DELETE Experience
export const deleteExperience = ({id}) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        //Alert
        dispatch(setAlert('Experience Removed', alert_success, 5000));
    } catch (err)   {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, alert_danger, 5000)));
        }
        //PROFILE_ERROR
        dispatch({
            type: PROFILE_ERROR,
            payload : { msg: err.response.statusText, status: err.response.status }
        });       
    }
}
//DELETE Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        //Alert
        dispatch(setAlert('Education Removed', alert_success, 5000));
    } catch (err)   {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, alert_danger, 5000)));
        }
        //PROFILE_ERROR
        dispatch({
            type: PROFILE_ERROR,
            payload : { msg: err.response.statusText, status: err.response.status }
        });       
    }
}
//DELETE Account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!!!!')) {
        try {
            await axios.delete('/api/profile');
            //redux
            dispatch({ type: PROFILE_CLEAR });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert('Your Account has been permanetly removed!!!', alert_dark, 10000));           
        } catch (err)   {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, alert_danger, 5000)));
            }
            //PROFILE_ERROR
            dispatch({
                type: PROFILE_ERROR,
                payload : { msg: err.response.statusText, status: err.response.status }
            });   
        }
    }
}