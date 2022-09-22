import { authTypes } from '../types';

const initState = { 
    setAuth : false,
    userData: {},
    errorMessage: '',
    isAdmin: false,
};

export const authReducers = (state = initState, action) => {
    switch (action.type) {
        case authTypes.AUTH_LOG:
        return {...state, setAuth : action.payload.log};
        case authTypes.AUTH_USERDATA:
        return {...state, userData : action.payload.data};
        case authTypes.AUTH_ERRORMESSAGE:
        return {...state, errorMessage : action.payload.message};
        case authTypes.AUTH_ADMIN:
        return {...state, isAdmin : action.payload.data};
        default:
        return state;
    };
};
