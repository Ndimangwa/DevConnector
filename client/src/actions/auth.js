import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL} from './types';
import {setAlert} from '../actions/alert';
import {alert_danger} from '../actions/styles';

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
       const res = await axios.post('/api/users', body, config);
       //if you are here then everything was complete
       dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
       }); 
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