import axiosInstance from "../../Helper/AxiosInstance";
import apiPath from "../../Service/apiPath";


//Register 
const register = (body)=>{
    
    let response = axiosInstance.post(apiPath.auth.REGISTER,body);
    return response;
}   
//Email Verification
const emailVerification = ({emailVerificationTOken,id})=>{

    const result = axiosInstance.get(`${apiPath.auth.EMAIL_VERIFICATION}?token=${emailVerificationTOken}&userId=${id}`)
    return result;
}
//Login
const login = (body)=>{
    
    let result =  axiosInstance.post(apiPath.auth.LOGIN,body);
    return result;                          
    
}
//Forgot Password
const forgotPassword = (body)=>{
    
    const response = axiosInstance.post(apiPath.auth.FORGOT_PASSWORD,body);
    return response;
}
//Reset Password
const resetPassword = (body)=>{
    
    const response = axiosInstance.post(apiPath.auth.RESET_PASSWORD,body);
    return response;
}
const authService={
    register,
    login,
    emailVerification,
    forgotPassword,
    resetPassword
}
export default authService;