import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../../Components/button";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/auth/authActions";



function ResetPassword(){
  const[password,setPassword] = useState();
  const[confirmPass,setConfirmPass] = useState();
  const[passError,setPassError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [processing,setProcessing] = useState(false);
  const {id,token} = useParams();
  const userId = id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    const value = e.target.value;
    if(e.target.name === 'password'){
      setPassword(value);
      if (confirmPass && value !== confirmPass) {
        setPassError("Password do not match.");
      } else {
        setPassError("");
      }
    }
    else if(e.target.name === 'confirmPass'){
      setConfirmPass(value);
      if (password && value !== password) {
        setPassError("Password do not match.");
      } else {
        setPassError("");
      }
    }
  }

  const handleSubmit = async(e)=>{
    console.log("Id and token",userId,token);
    
    e.preventDefault();
    if (password !== confirmPass) { 
      console.log(password,confirmPass);
      setPassError("Password do not match.");
      return;
    }

     setProcessing(true);
        const body = {
          userId:userId,
          token:token,
          password:password
        }

    dispatch(resetPassword(body)).then((response)=>{
           if(response.meta.requestStatus === "fulfilled"){
             
             setProcessing(false); 
                navigate(`/`)
            }
            else {
                 setProcessing(false); 
            }
            })
        }

  return<>
  <section style={{ background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)", height:"100vh" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6 col-xl-4">
              <div className="card rounded-3 p-4">
                <h3 className="mb-4 text-center">Reset Password</h3>
                <form>             
                  <div className="form-outline mb-4">
                    <label className="form-label">New Password</label>
                    <div className="input-group">
                    <input onChange={handleChange} label="password" name="password" value={password} type={showPassword ? "text" : "password"} className="form-control"   
                    />
                    <span className="input-group-text" onClick={()=>setShowPassword(!showPassword)} style={{cursor:"pointer"}}>
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </span>
                    </div>
                    
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">

                    <input onChange={handleChange} name="confirmPass" value={confirmPass} type={showConfirmPassword ? "text" : "password"} className="form-control"   
                    /> 
                    <span className="input-group-text" onClick={()=>setShowConfirmPassword(!showConfirmPassword)} style={{cursor:"pointer"}}>
                    {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                    </span>
                    </div>
                  </div>
                  {passError && <p className="text-danger">{passError}</p>}
                  <Button disabled={processing} onClick={handleSubmit} type="submit" className="btn btn-warning btn-lg w-100">{processing ? 
                        <div className="text-center">
                            <div class="spinner-border" role="status">
                             <span class="visually-hidden">Loading...</span>
                            </div>
                          </div> : "Change Password"}</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  </>
}
export default ResetPassword;