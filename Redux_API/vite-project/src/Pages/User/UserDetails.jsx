import image from '../../assets/user-profile.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import userService from '../../Service/UserApi';
import { Button } from '../../Components/button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, show } from '../../features/user/userSlice';



function UserDetails(){

    const{id} = useParams();
    const[userData, setUserData] = useState({name:'',email:''});
    const navigate = useNavigate();
    const {userDetails,loading} = useSelector((state)=> state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(show({id}));
    },[dispatch]);

    useEffect(()=>{
        setUserData(userDetails);
    },[userDetails]);

    const handleDelete = async () =>{
        if(window.confirm("Do you want to delete it?")){

        dispatch(deleteUser({id})).then((response)=>{
        if(response.meta.requestStatus === "fulfilled"){        
            navigate(-1)
        }
        })
    }
    }
    return<>
        <Button onClick={()=>{ navigate(-1)}} className='btn btn-warning mt-4 ms-4'>Dashboard</Button>
        <div className="card p-2 " style={{width:"450px",position:"absolute",top:"2rem",left:"30rem",background: "linear-gradient(to bottom, #FFF8E1,rgb(243, 255, 79))"}}>
            <h2 className='text-center mt-2' >User Details</h2>
        
            <img className="card-img-top" src={image} alt="User Image" style={{width:"100%",height:"300px"}} />
            <div className='p-2'>
                <span className='fw-bold' style={{fontSize:"30px"}}>Name:</span>
                {loading ? <div className="text-center">
                            <div class="spinner-border" role="status">
                             <span class="visually-hidden">Loading...</span>
                            </div>
                          </div> 
                    : <span className='ms-2' style={{fontSize:"30px"}}>{userData?.name || "Unknown"}</span> }
            </div>
            <div className='p-2'>
                <span className='fw-bold' style={{fontSize:"30px"}}>Email:</span>
                {loading ? <div className="text-center">
                            <div class="spinner-border" role="status">
                             <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                     : <span className='ms-2' style={{fontSize:"30px"}}>{userData?.email || "Unknown"}</span>}
                
            </div> 
            <div className='text-center p-2'>

            <Button onClick={()=> navigate(`/edit-user/${id}`)} className='btn btn-success  w-100'>Edit</Button>
            <Button disabled={loading} onClick={()=> handleDelete()} className='btn btn-danger mt-2 w-100'>{loading ? <div className="text-center">
                            <div class="spinner-border" role="status">
                             <span class="visually-hidden">Loading...</span>
                            </div>
                          </div> : "Delete"}</Button>
            </div>
        </div>
    </>
}
export default UserDetails;