import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthApi";
import { toast } from "react-toastify";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const VERIFY_EMAIL_REQUEST = "VERIFY_EMAIL_REQUEST";



//Login
export const login = createAsyncThunk(LOGIN_REQUEST,
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
 export const register = createAsyncThunk(REGISTER_REQUEST,
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
export const emailVerification = createAsyncThunk(VERIFY_EMAIL_REQUEST,
    async({emailVerificationTOken,id},{rejectWithValue})=>{
      try {
          const response = await authService.emailVerification({emailVerificationTOken,id});
          console.log("API response:",response.data.data);
          localStorage.removeItem('emailToken');
          toast.success('Verification successfully!');
          return response.data.data;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      
      }
    }
)


