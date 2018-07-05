import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADING } from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        // lecture 68
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        // lecture 68
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        // lECTURE 71
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };
        // lecture #67 
        // we want to return state object,anything in the state (line 14), anything on the posts in particular we want the current post state.post and we also wanna add new post  which comes in from the payload
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        default:
            return state;
    }
}
