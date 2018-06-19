import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// import { TEST_DISPATCH } from './types'; // THIS WAS COMMENTED AT #41
import { GET_ERRORS, SET_CURRENT_USER } from './types';
// Register User
export const registerUser = (userData, history) => dispatch => {
    // dispatch above was added at lecture #41
    axios
        .post('api/users/register', userData)
        //        .then(res => console.log(res.data))
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

};

// Login - Get User Token (lecture #42)
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header. REMEMBER, this token contains user information (i.e: id, name, avatar, and others (see your  schema details) )
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set Current user
            dispatch(setCurrentUser(decoded));
        })
        // taking care of the error
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}