import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../Components/button";
import { useDispatch } from "react-redux";
import authThunk from "../../features/auth/authThunk";



function VerifyEmail(){
    const {email} = useParams();
    const emailVerificationTOken = localStorage.getItem("emailToken");
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [processing,setProcessing] = useState(false);
    const dispatch = useDispatch();

    
    const handleSubmit = async (e)=>{ 
        e.preventDefault();
        setProcessing(true);
         dispatch(authThunk.emailVerification({emailVerificationTOken,id}))
                .then((response)=>{
                    setProcessing(false);  
                if(response.meta.requestStatus === "fulfilled"){
                                
                    navigate('/');
                }
                else {
                    setProcessing(false);
                }
                })
    }
    return<>
        <div className="container  justify-content-center align-item-center d-flex">
            <div className="row mt-5" style={{boxShadow:"10px 10px 10px grey", height:"auto",width:"300px", borderRadius:"10px"}}>
                <h3 className="text-center p-2 text-white bg-info" style={{width:"100%",height:"50px"}}>Email-Verification</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group p-2">
                        <label className="form-label">Email</label>
                        <input readOnly name="email" value={email} className="form-control mb-2" type="email"/>
                        <Button disabled={processing === true} type="submit" className="btn btn-success text-white fw-bold mt-4">{processing === true ? <div className="text-center">
                            <div class="spinner-border" role="status">
                             <span class="visually-hidden">Loading...</span>
                            </div>
                          </div> : "Verify"}</Button>
                    </div>
                </form>
            </div>
        </div>
    </>
}
export default VerifyEmail;