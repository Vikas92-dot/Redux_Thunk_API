import { emailVerification, login, register } from "./authActions";

const authReducer = (
    state ={
        userId:null,
        emailToken:null,
        name: null,
        token: null,
        loading: false,
        error: null,
        isLoggedIn: false
    },action) =>{
    switch (action.type){
        //Login
        case login.pending:
            return{
                ...state,
                loading:true,
                error:null                
            }
        case login.fulfilled:
            return{
                ...state,
                loading :false,
                name : action.payload.name,
                token : action.payload.token,
                isLoggedIn : true,
            }
        case login.rejected:
            return{
                ...state,
                loading:false,
                error: action.payload || 'Login failed',
            }
        //Register
        case register.pending:
            return{
                 ...state, 
                 loading: true, 
                 error: null
            }
        case register.fulfilled:
            return{
                ...state,
                loading: false,
                emailToken: action.payload.emailVerificationTOken,
                userId: action.payload.id
            }
        case register.rejected:
            return{
                ...state,
                loading: false,
                error: action.payload || 'Registration failed',
            }

        //Email Verification
        case emailVerification.pending:
            return{
                ...state, 
                loading: true, 
                error: null
            }
        case emailVerification.fulfilled:
            return{
                ...state,
                loading: false,
                emailToken: null,
                userId: null
            }
        case emailVerification.rejected:
            return{
                ...state,
                loading: false,
                error: action.payload || 'Verification failed',
            }
        
        default:
            return state;
    }
}

export default authReducer;