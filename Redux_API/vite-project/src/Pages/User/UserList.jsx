import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../Service/UserApi";
import { Button } from "../../Components/button";
import { useDispatch, useSelector } from "react-redux";
import { list } from "../../features/user/userSlice";
import { logout } from "../../features/auth/authSlice";


function UserList(){
    
    const [users, setUsers] = useState([]);
    const[page,setPage] = useState(1);
    const[totalPages,setTotalPages] = useState(0);
    const navigate = useNavigate();
    const userName = useSelector((state)=> state.auth.name)
    const {userList,totalRecords,loading} = useSelector((state)=> state.user);
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        dispatch(list({page}));
    },[page,dispatch]);

    useEffect(() => {
        console.log("All Users", userList);
        setUsers(userList);
        let totalPages = Math.ceil(totalRecords / 10);
        setTotalPages(totalPages);
    }, [userList, totalRecords]);

    const setNext =()=>{
        if(page < totalPages ){
            setPage((prev)=> prev+1);
        }
    } 
    const setPrevious =()=>{
        if(page > 1){
            setPage((prev)=> prev-1);
        }
    }
    const handleLogOut =()=>{
        if(window.confirm("Do you want to LogOut?")){
            // localStorage.removeItem('token');
            dispatch(logout());
            navigate('/');
        }
        
    }

    return<>
         <div className="row">
             <h2 className="text-center p-2 bg-info fw-bold text-bold" style={{borderRadius:"5px",border:"1px solid black"}}>Users List</h2>
                 <h4 className='mt-2 text-white text-center fw-bold p-2 bg-secondary' style={{position:"relative",left:"11%", border:"1px solid black",width:"15rem",borderRadius:"10px"}}>Hello, {userName} </h4>
             
             <Button onClick={()=> handleLogOut()} className="btn btn-danger fw-bold" style={{width:"6rem",position:"absolute",top:"2%",left:"92%"}}>Log Out</Button>

             {loading 
                ?   <div className="text-center">
                            <div class="spinner-border" role="status">
                             <span class="visually-hidden">Loading...</span>
                            </div>
                    </div>
                : (<table className="table table-danger table-bordered border-dark table-hover text-center" style={{position:"absolute",top:"20%",left:"10%",width:"80%",height:"500px"}}>
                <thead>
                    <tr>
                        <th>Sr no.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>(
                        <tr key={index}>
                            <td>{(page-1)*10+(index+1)}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button onClick={()=> navigate(`/user-details/${user.id}`)} className="btn btn-primary">See Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>) }
         </div>
          <div style={{position:"absolute",top:"46rem",left:"40%"}}>
                <Button onClick={()=> setPrevious()} disabled={page === 1} className="btn btn-primary">Previous</Button>
                <span className="fw-bold">Page {page} of {totalPages}</span>
                <Button onClick={()=> setNext()} disabled={page === totalPages} className="btn btn-success ms-2">Next</Button>
             </div>
        </>
}
export default UserList;
