import axios from 'axios';
// import { TEST_DISPATCH } from './types'; // THIS WAS COMMENTED AT #41
import { GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
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
            // Set token to Auth header
            setAuthToken(token);
        })
        // taking care of the error
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};