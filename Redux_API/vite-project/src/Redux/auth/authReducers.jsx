import { emailVerification, forgotPassword, login, register, resetPassword } from "./authActions";
import {LOGOUT} from './authActions'

const initialState={
    userId:null,
    emailToken:null,
    name: null,
    token: null,
    loading: false,
    error: null,
    isLoggedIn: false
}

const authReducer = (
    state ={initialState},action) =>{
    switch (action.type){
        //Login
        case `${login.pending}`:
            return{
                ...state,
                loading:true,
                error:null                
            }
        case `${login.fulfilled}`:
            console.log("Login fulfilled payload", action.payload);
            return{
                ...state,
                loading :false,
                name : action.payload.name,
                token : action.payload.token,
                isLoggedIn : true,
            }
        case `${login.rejected}`:
            return{
                ...state,
                loading:false,
                error: action.payload || 'Login failed',
            }
        case LOGOUT:
            return{
                ...initialState
            }
        //Register
        case `${register.pending}`:
            return{
                 ...state, 
                 loading: true, 
                 error: null
            }
        case `${register.fulfilled}`:
            return{
                ...state,
                loading: false,
                emailToken: action.payload.emailVerificationTOken,
                userId: action.payload.id
            }
        case `${register.rejected}`:
            return{
                ...state,
                loading: false,
                error: action.payload || 'Registration failed',
            }

        //Email Verification
        case `${emailVerification.pending}`:
            return{
                ...state, 
                loading: true, 
                error: null
            }
        case `${emailVerification.fulfilled}`:
            return{
                ...state,
                loading: false,
                emailToken: null,
                userId: null
            }
        case `${emailVerification.rejected}`:
            return{
                ...state,
                loading: false,
                error: action.payload || 'Verification failed',
            }
        
        //Forgot Password
            case `${forgotPassword.pending}`:
            return{
                ...state, 
                loading: true, 
                error: null
            }
        case `${forgotPassword.fulfilled}`:
            return{
                ...state,
                loading: false,
            }
        case `${forgotPassword.rejected}`:
            return{
                ...state,
                loading: false,
                error: action.payload || 'Link not sent',
            }

        //Reset Password
            case `${resetPassword.pending}`:
            return{
                ...state, 
                loading: true, 
                error: null
            }
        case `${resetPassword.fulfilled}`:
            return{
                ...state,
                loading: false,
            }
        case `${resetPassword.rejected}`:
            return{
                ...state,
                loading: false,
                error: action.payload || 'Something went wrong',
            }

        
        default:
            return state;
    }
}

export default authReducer;