import axios from 'axios';
import {ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES} from './types';
import {setAlert} from './alert';
import {alert_success} from './styles';

//get all posts
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
//get a specific post
export const getPost = id => async (dispatch) => {
    try {
        //You must be logged-in to access this route
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
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
//Add a Post-
export const addPost = formData => async (dispatch) => {
    //You are sending data to server
    //must set a config object
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        //You must be logged-in to access this route
        const res = await axios.post('/api/posts', formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        //setAlert
        dispatch(setAlert('Post Added Successful', alert_success, 5000));
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
//Add a Comment
export const addComment = (postId, formData) => async (dispatch) => {
    //You are sending data to server
    //must set a config object
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        //You must be logged-in to access this route
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        //setAlert
        dispatch(setAlert('Comment was Addeded Successful', alert_success, 5000));
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
//Delete Comment-
export const deleteComment = (postId, commentId) => async (dispatch) => {
    //id is id of the post
    try {
        //You must be logged-in to access this route
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        //setAlert
        dispatch(setAlert('Comment was removed successful', alert_success, 5000));
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
