import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children})=>{
    
    //const {isLoggedIn} = useSelector((state)=> state.auth)
    const token = localStorage.getItem('token');
        
    if(token){
        return children;
    }
    else return <Navigate to={'/'}/>
     
}
export default PrivateRoute;