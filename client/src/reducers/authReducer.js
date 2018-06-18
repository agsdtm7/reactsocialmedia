//import { TEST_DISPATCH } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    hellow: 'test'
}

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}