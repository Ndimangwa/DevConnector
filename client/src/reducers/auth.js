import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const my_token = 'token';

const initialState = {
    token: localStorage.getItem(my_token),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function authReducer(state=initialState, action)   {
    const {type, payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem(my_token, payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
            localStorage.removeItem(my_token);
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}