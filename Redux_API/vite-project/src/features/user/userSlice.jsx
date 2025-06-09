import { createSlice} from '@reduxjs/toolkit'

import { toast } from 'react-toastify';
import userThunk from './userThunk';


const userSlice = createSlice({
    name:'user',
    initialState:{
        userList:[],
        totalRecords:null,
        userDetails:null,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            //List
            .addCase(userThunk.list.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(userThunk.list.fulfilled, (state,action)=>{
                state.userList = action.payload.data;
                state.totalRecords = action.payload.totalRecords;
                state.loading = false;
                state.error = null;
            })
            .addCase(userThunk.list.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                toast.error(action.payload?.message || 'Something went wrong');
            })

            //Details
            .addCase(userThunk.show.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(userThunk.show.fulfilled, (state,action)=>{
                state.userDetails = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(userThunk.show.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                toast.error(action.payload?.message || 'Something went wrong');
            })

            //Delete User
            .addCase(userThunk.deleteUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(userThunk.deleteUser.fulfilled, (state,action)=>{
                state.loading = false;
                state.error = null;
                toast.success("User Deleted Successfully");
            })
            .addCase(userThunk.deleteUser.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                toast.error(action.payload?.message || 'Something went wrong');
            })

            //Update User
            .addCase(userThunk.update.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(userThunk.update.fulfilled, (state,action)=>{
                state.loading = false;
                state.error = null;
                toast.success("User Updated Successfully");
            })
            .addCase(userThunk.update.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
                toast.error(action.payload?.message || 'Something went wrong');
            })
    }
})

export default userSlice.reducer;