import isEmpty from '../validation/is-empty';
//import { TEST_DISPATCH } from '../actions/types';
import { SET_CURRENT_USER } from '../actions/types';


const initialState = {
    isAuthenticated: false,
    user: {},
    hellow: 'test'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}