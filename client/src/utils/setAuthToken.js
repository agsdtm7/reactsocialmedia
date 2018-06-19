// this will take care of adding this authorization token to every request for if we're logged in
import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;