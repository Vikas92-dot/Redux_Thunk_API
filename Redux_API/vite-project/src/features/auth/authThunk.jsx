import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthApi";

//Login
 const login = createAsyncThunk('auth/login',
    async(body,{rejectWithValue})=>{
      try {
          const response = await authService.login(body);
          console.log("API response:",response.data.data);      
          return response.data.data;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

//Register
 const register = createAsyncThunk('auth/register',
    async(body,{rejectWithValue})=>{
      try {
          const response = await authService.register(body);
          console.log("API response:",response.data.data);      
          return response.data.data;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

//Email Verification
 const emailVerification = createAsyncThunk('auth/emailVerification',
    async({emailVerificationTOken,id},{rejectWithValue})=>{
      try {
          const response = await authService.emailVerification({emailVerificationTOken,id});
          console.log("API response:",response.data.data);      
          return response.data.data;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      
      }
    }
)

//Forgot Password
 const forgotPassword = createAsyncThunk('auth/forgotPassword',
    async(body,{rejectWithValue})=>{
      try {
          const response = await authService.forgotPassword(body);
          console.log("API response:",response.data.data);      
          return response.data.data;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

//Reset Password
const resetPassword = createAsyncThunk('auth/resetPassword',
    async(body,{rejectWithValue})=>{
      try {
          const response = await authService.resetPassword(body);
          console.log("API response:",response.data.data);      
          return response.data.data;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      
      }
    }
)

const authThunk={
    login,
    register,
    emailVerification,
    forgotPassword,
    resetPassword
}
export default authThunk;