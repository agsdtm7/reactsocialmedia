import { combineReducer, combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer    // !IMPORTANT! this means we assign the word 'auth' as the short for authReducer
    // So say we use anythink from from authReducer in our components, we'll use  'this.props.auth'
});