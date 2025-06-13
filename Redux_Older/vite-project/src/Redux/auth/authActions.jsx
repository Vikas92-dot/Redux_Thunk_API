import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthApi";
import { toast } from "react-toastify";

export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const VERIFY_EMAIL_PENDING = 'VERIFY_EMAIL_PENDING';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE';




export const LOGOUT = 'LOGOUT'; 

export const logout = () => ({
    type: LOGOUT
});

//Login
export const login = (body) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_PENDING });

    try {
      const response = await authService.login(body);
      console.log("API response:", response.data.data);
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('name', response.data.data.name);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data.data
      });
      toast.success("Logged in!");
      return response.data.data;
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.message
      });
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      return (error.response.data.message || "Something went wrong");
    }
  };
};


//Register
export const register = (body) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER_PENDING });

    try {
      const response = await authService.register(body);
      console.log("API response:", response.data.data);
      localStorage.setItem('emailToken', response.data.data.emailVerificationTOken);
      localStorage.setItem('userId', response.data.data.id);  
      toast.success('Registration successfully!');
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.data.data
      });
      
      return response.data.data;
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: error.message
      });
      console.log(error);
      toast.error(error.response.data.message || "Registration failed");
      return (error.response.data.message || "Something went wrong");
    }
  };
};

//Email Verification
export const emailVerification = ({emailVerificationTOken,id}) => {
  return async (dispatch) => {
    dispatch({ type: VERIFY_EMAIL_PENDING });

    try {
      const response = await authService.emailVerification({emailVerificationTOken,id});
      console.log("API response:", response.data.data);
      localStorage.setItem('emailToken', response.data.data.emailVerificationTOken);
      localStorage.setItem('userId', response.data.data.id);  
      toast.success('Registration successfully!');
      dispatch({
        type: VERIFY_EMAIL_SUCCESS,
        payload: response.data.data
      });
      localStorage.removeItem('emailToken');
      toast.success('Verification successfully!');
      return response.data.data;
    } catch (error) {
      dispatch({
        type: VERIFY_EMAIL_FAILURE,
        payload: error.message
      });
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
      return (error.response.data.message || "Something went wrong");
    }
  };
};

//Forgot Password
 export const forgotPassword = createAsyncThunk('auth/forgotPassword',
    async(body,{rejectWithValue})=>{
      try {
          const response = await authService.forgotPassword(body);
          console.log("API response:",response.data.data); 
          toast.success('Password Reset Link Sent to your Email id');     
          return response.data.data;
      } catch (error) {
        console.log(error);
        toast.error(state.error || 'Link not sent');
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

//Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword',
    async(body,{rejectWithValue})=>{
      try {
          const response = await authService.resetPassword(body);
          console.log("API response:",response.data.data); 
          toast.success('Password Reset Successfully');     
          return response.data.data;
      } catch (error) {
        console.log(error);
        toast.error(state.error || 'Something went wrong');
        return rejectWithValue(error.response.data.message || "Something went wrong");
      
      }
    }
)
