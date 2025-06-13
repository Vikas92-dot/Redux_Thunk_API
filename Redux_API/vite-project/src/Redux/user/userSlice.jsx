import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import userService from './UserApi';

//User List
export const list = createAsyncThunk('user/list',
    async(body,{rejectWithValue})=>{
      try {
          const response = await userService.list(body);
          console.log("API response:",response.data.data);      
          return response.data;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

//User Details
export const show = createAsyncThunk('user/show',
    async({id},{rejectWithValue})=>{
      try {
          const response = await userService.show({id});
          console.log("API response:",response.data.user);      
          return response.data.user;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

//Delete User
export const deleteUser = createAsyncThunk('user/deleteUser',
    async({id},{rejectWithValue})=>{
      try {
          const response = await userService.Delete({id});
          console.log("API response:",response.data.data);      
          return response.data.user;
      } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

//Edit User
export const update = createAsyncThunk('user/update',
    async({id,body},{rejectWithValue})=>{
      try {
          const response = await userService.update(id,body);
          console.log("API response:",response.data.data);      
          return response.data.data;
      } catch (error) {
        console.log(error);
        console.log("API nahi chali");
        
        return rejectWithValue(error.response.data.message || "Something went wrong");
      }
    }
)

const userSlice = createSlice({
    name:'user',
    initialState:{
        userList:[],
        totalRecords:null,
        userDetails:null,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            //List
            .addCase(list.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(list.fulfilled, (state,action)=>{
                state.userList = action.payload.data;
                state.totalRecords = action.payload.totalRecords;
                state.loading = false;
                state.error = null;
            })
            .addCase(list.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                toast.error(action.payload?.message || 'Something went wrong');
            })

            //Details
            .addCase(show.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(show.fulfilled, (state,action)=>{
                state.userDetails = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(show.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                toast.error(action.payload?.message || 'Something went wrong');
            })

            //Delete User
            .addCase(deleteUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state,action)=>{
                state.loading = false;
                state.error = null;
                toast.success("User Deleted Successfully");
            })
            .addCase(deleteUser.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                toast.error(action.payload?.message || 'Something went wrong');
            })

            //Update User
            .addCase(update.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(update.fulfilled, (state,action)=>{
                state.loading = false;
                state.error = null;
                toast.success("User Updated Successfully");
            })
            .addCase(update.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                toast.error(action.payload?.message || 'Something went wrong');
            })
    }
})

export default userSlice.reducer;