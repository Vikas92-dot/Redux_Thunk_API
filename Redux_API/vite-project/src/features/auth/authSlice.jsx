import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import authService from '../../Service/AuthApi';

//Login
export const login = createAsyncThunk('auth/login',
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
export const register = createAsyncThunk('auth/register',
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
export const emailVerification = createAsyncThunk('auth/emailVerification',
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
export const forgotPassword = createAsyncThunk('auth/forgotPassword',
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
export const resetPassword = createAsyncThunk('auth/resetPassword',
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



const authSlice = createSlice({
  name:'auth', 
  initialState:{
    userId:null,
    emailToken:null,
    name: null,
    token: null,
    loading: false,
    error: null,
    isLoggedIn: false
  },
  reducers:{
    logout: (state) => {
      state.name = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers:(builder)=>{
    builder
      //Login
      .addCase(login.pending, (state)=>{
          state.loading = true;
          state.error = null;
      })
      .addCase(login.fulfilled, (state,action)=>{
        state.loading = false;
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', state.token);
        localStorage.setItem('name', state.name);
        toast.success('Logged in!');
      })  
      .addCase(login.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Login failed';
        toast.error(action.payload?.message || 'Login failed');
      })

      //register
      .addCase(register.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state,action)=>{
        state.loading = false;
        state.emailToken = action.payload.emailVerificationTOken;
        state.userId = action.payload.id;      
        localStorage.setItem('emailToken', state.emailToken);
        localStorage.setItem('userId', state.userId);
        toast.success('Registration successfully!');
      })
      .addCase(register.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        toast.error(action.payload?.message || 'Registration failed');
      })

      //Email Verification
      .addCase(emailVerification.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(emailVerification.fulfilled, (state)=>{
        state.loading = false;
        state.emailToken = null;
        state.userId = null;     
        localStorage.removeItem('emailToken');
        toast.success('Verification successfully!');
      })
      .addCase(emailVerification.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Verification failed';
        toast.error(action.payload?.message || 'Verification failed');
      })

      //Forgot Password
      .addCase(forgotPassword.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state)=>{
        state.loading = false;    
        toast.success('Password Reset Link Sent to your Email id');
      })
      .addCase(forgotPassword.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Link not sent';
        toast.error(action.payload?.message || 'Link not sent');
      })

      .addCase(resetPassword.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state)=>{
        state.loading = false;    
        toast.success('Password Reset Successfully');
      })
      .addCase(resetPassword.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        toast.error(action.payload?.message || 'Something went wrong');
      })



  }
})
export const {logout} = authSlice.actions;
export default authSlice.reducer;