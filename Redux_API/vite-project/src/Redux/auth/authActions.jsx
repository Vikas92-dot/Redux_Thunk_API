import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthApi";
import { toast } from "react-toastify";


export const LOGOUT = 'LOGOUT'; 

export const logout = () => ({
    type: LOGOUT
});

//Login
export const login = createAsyncThunk('auth/login',
    async(body,{rejectWithValue})=>{
      try {
          const response = await authService.login(body);
          console.log("API response:",response.data.data);
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('name', response.data.data.name);
          toast.success("Logged in!");      
          return response.data.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Login failed");
            return rejectWithValue(error.response.data.message || "Something went wrong");
        }
    }
)

//Register
 export const register = createAsyncThunk("auth/register",
    async(body,{rejectWithValue})=>{
      try {
          const response = await authService.register(body);
          console.log("API response:",response.data.data); 
          localStorage.setItem('emailToken', response.data.data.emailVerificationTOken);
          localStorage.setItem('userId', response.data.data.id);  
          toast.success('Registration successfully!');   
          return response.data.data;
      } catch (error) {
        console.log(error);
          toast.error(error.response.data.message || 'Registration Failed')
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

//Email Verification
export const emailVerification = createAsyncThunk('auth/emailVerify',
    async({emailVerificationTOken,id},{rejectWithValue})=>{
      try {
          const response = await authService.emailVerification({emailVerificationTOken,id});
          console.log("API response:",response.data.data);
          localStorage.removeItem('emailToken');
          toast.success('Verification successfully!');
          return response.data.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "Something went wrong");
        return rejectWithValue(error.response.data.message || "Something went wrong");
      
      }
    }
)

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
