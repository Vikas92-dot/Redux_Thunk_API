import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./UserApi";


//User List
 const list = createAsyncThunk('user/list',
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
 const show = createAsyncThunk('user/show',
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
 const deleteUser = createAsyncThunk('user/deleteUser',
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
 const update = createAsyncThunk('user/update',
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

const userThunk = {
    list,
    show,
    update,
    deleteUser
}

export default userThunk;