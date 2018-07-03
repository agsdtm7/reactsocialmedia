import axios from 'axios';

import {
    ADD_POST,
    DELETE_POST,
    GET_ERRORS,
    GET_POSTS,
    POST_LOADING
} from './types';

// add post
export const addPost = postData => dispatch => {
    //dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}


// Get Post
export const getPosts = () => dispatch => {
    dispatch(setPostLoading);
    axios
        .get('/api/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
}


// delete post
export const deletePost = id => dispatch => {
    //dispatch(clearErrors());
    axios
        .delete(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}