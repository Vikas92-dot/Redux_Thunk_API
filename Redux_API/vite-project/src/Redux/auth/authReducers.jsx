import { emailVerification, forgotPassword, LOGIN_USER_FAILURE, LOGIN_USER_PENDING, LOGIN_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_PENDING, REGISTER_USER_SUCCESS, resetPassword, VERIFY_EMAIL_FAILURE, VERIFY_EMAIL_PENDING, VERIFY_EMAIL_SUCCESS } from "./authActions";
import { LOGOUT } from './authActions'

const initialState = {
    userId: null,
    emailToken: null,
    name: null,
    token: null,
    loading: false,
    error: null,
    isLoggedIn: false
}

const authReducer = (
    state = { initialState }, action) => {
    switch (action.type) {
        //Login
        case LOGIN_USER_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOGIN_USER_SUCCESS:
            console.log("Login fulfilled payload", action.payload);
            return {
                ...state,
                loading: false,
                name: action.payload.name,
                token: action.payload.token,
                isLoggedIn: true,
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload || 'Login failed',
            }
        case LOGOUT:
            return {
                ...initialState
            }
        //Register
        case REGISTER_USER_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                emailToken: action.payload.emailVerificationTOken,
                userId: action.payload.id
            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload || 'Registration failed',
            }

        //Email Verification
        case VERIFY_EMAIL_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                emailToken: null,
                userId: null
            }
        case VERIFY_EMAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload || 'Verification failed',
            }

        //Forgot Password
        case `${forgotPassword.pending}`:
            return {
                ...state,
                loading: true,
                error: null
            }
        case `${forgotPassword.fulfilled}`:
            return {
                ...state,
                loading: false,
            }
        case `${forgotPassword.rejected}`:
            return {
                ...state,
                loading: false,
                error: action.payload || 'Link not sent',
            }

        //Reset Password
        case `${resetPassword.pending}`:
            return {
                ...state,
                loading: true,
                error: null
            }
        case `${resetPassword.fulfilled}`:
            return {
                ...state,
                loading: false,
            }
        case `${resetPassword.rejected}`:
            return {
                ...state,
                loading: false,
                error: action.payload || 'Something went wrong',
            }


        default:
            return state;
    }
}

export default authReducer;