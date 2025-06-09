import { createSlice} from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import authThunk from './authThunk';


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
      localStorage.removeItem('token');
      localStorage.removeItem('name');
    },
  },
  extraReducers:(builder)=>{
    builder
      //Login
      .addCase(authThunk.login.pending, (state)=>{
          state.loading = true;
          state.error = null;
      })
      .addCase(authThunk.login.fulfilled, (state,action)=>{
        state.loading = false;
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', state.token);
        localStorage.setItem('name', state.name);
        toast.success('Logged in!');
      })  
      .addCase(authThunk.login.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Login failed';
        toast.error(action.payload?.message || 'Login failed');
      })

      //register
      .addCase(authThunk.register.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunk.register.fulfilled, (state,action)=>{
        state.loading = false;
        state.emailToken = action.payload.emailVerificationTOken;
        state.userId = action.payload.id;      
        localStorage.setItem('emailToken', state.emailToken);
        localStorage.setItem('userId', state.userId);
        toast.success('Registration successfully!');
      })
      .addCase(authThunk.register.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        toast.error(state.error || 'Registration failed');
      })

      //Email Verification
      .addCase(authThunk.emailVerification.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunk.emailVerification.fulfilled, (state)=>{
        state.loading = false;
        state.emailToken = null;
        state.userId = null;     
        localStorage.removeItem('emailToken');
        toast.success('Verification successfully!');
      })
      .addCase(authThunk.emailVerification.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Verification failed';
        toast.error(state.error || 'Verification failed');
      })

      //Forgot Password
      .addCase(authThunk.forgotPassword.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunk.forgotPassword.fulfilled, (state)=>{
        state.loading = false;    
        toast.success('Password Reset Link Sent to your Email id');
      })
      .addCase(authThunk.forgotPassword.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Link not sent';
        toast.error(state.error || 'Link not sent');
      })

      //Reset Password
      .addCase(authThunk.resetPassword.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunk.resetPassword.fulfilled, (state)=>{
        state.loading = false;    
        toast.success('Password Reset Successfully');
      })
      .addCase(authThunk.resetPassword.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        toast.error(state.error || 'Something went wrong');
      })

  }
})
export const {logout} = authSlice.actions;
export default authSlice.reducer;