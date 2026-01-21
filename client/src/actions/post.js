import axios from 'axios';
import {DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES} from './types';
import {setAlert} from './alert';
import {alert_success} from './styles';

export const getPosts = () => async (dispatch) => {
    try {
        //You must be logged-in to access this route
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
//update_likes +
export const addLike = id => async (dispatch) => {
    //id is id of the post
    try {
        //You must be logged-in to access this route
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
//update_likes -
export const removeLike = id => async (dispatch) => {
    //id is id of the post
    try {
        //You must be logged-in to access this route
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
//Delete Post-
export const deletePost = id => async (dispatch) => {
    //id is id of the post
    try {
        //You must be logged-in to access this route
        await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        });
        //setAlert
        dispatch(setAlert('Post removed successful', alert_success, 5000));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}