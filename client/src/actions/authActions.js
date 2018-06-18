import axios from 'axios';
// import { TEST_DISPATCH } from './types'; // THIS WAS COMMENTED AT #41
import { GET_ERRORS } from './types';
// Register User
export const registerUser = (userData) => dispatch => {
    // dispatch above was added at lecture #41
    axios
        .post('api/users/register', userData)
        .then(res => console.log(res.data))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

};