import axiosInstance from "../../Helper/AxiosInstance";
import apiPath from "../../Service/apiPath";


//User List
const list =({page,size})=>{
    const users = axiosInstance.get(`${apiPath.user.USER_LIST}?pageNumber=${page}&pageSize=${size}`);
    return users;
}

//User Details
const show =({id})=>{
    const result = axiosInstance.get(`${apiPath.user.USER_DETAILS}/${id}`);
    return result;
}

//Delete User
const Delete =({id})=>{
    const result = axiosInstance.delete(`${apiPath.user.DELETE_USER}/${id}`)
    return result;
}
//Edit User
const update =(id,body)=>{
    const status = axiosInstance.put(`${apiPath.user.EDIT_USER}/${id}`,body)
    return status;
}

const userService ={
    list,
    show,
    update,
    Delete
} 
export default userService;