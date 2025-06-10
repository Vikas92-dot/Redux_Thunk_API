import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import { Button } from "../../Components/button";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/auth/authActions";




const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Invalid Email").required("Email is required."),
    password: Yup.string().min(6).required("Password is required.")
})

function Register(){
    const[data,setData] = useState({name:'',email:'',password:''});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: data,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values,{setSubmitting}) =>{
            const {email} = values;
            const body = {
                name: values.name,
                email: values.email,
                password: values.password
            }
             dispatch(register(body)).then((response)=>{
                 setSubmitting(false);  
                if(response.meta.requestStatus === "fulfilled"){
                                
                    navigate(`/email-verification/${email}`)
                }
                else {
                    setSubmitting(false);
                }
                })
        
        }
    })
    
    return<>
        <div className="container justify-content-center align-item-center d-flex">
            <div className="row mt-5" style={{boxShadow:"10px 10px 10px grey", height:"auto",width:"300px", borderRadius:"10px",background: "linear-gradient(to bottom, #FFF8E1,rgb(255, 217, 79))"}}>
                <h4 className="text-center p-2 text-white bg-primary" style={{width:"100%",height:"50px",borderRadius:"5px"}}>Registration Form</h4>
                <form onSubmit={formik.handleSubmit} >
                    <div className="form-group p-2">
                        <label className="form-label">Name</label>
                        <input 
                        name="name" 
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        className="form-control mb-2" 
                        type="text" 
                        placeholder="Enter your Name"/>
                        {formik.touched.name && formik.errors.name && (
                          <div className="text-danger">{formik.errors.name}</div>
                        ) }

                        <label className="form-label">Email</label>
                        <input name="email"
                        value={formik.values.email} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control mb-2" 
                        type="email" 
                        placeholder="Enter your Email"/>
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger">{formik.errors.email}</div>
                        ) }

                        <label className="form-label">Password</label>
                        <input 
                        name="password" 
                        value={formik.values.password} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" 
                        type="password" 
                        placeholder="Enter your Password"
                        autoComplete="new-password"/>
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger">{formik.errors.password}</div>
                        ) }

                        <Button disabled={formik.isSubmitting} type="submit" className="btn btn-success mt-4 w-100">{formik.isSubmitting ? 
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                             <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : "Register"}</Button>
                        
                    </div>
                </form>
                    <p className="mb-2 mt-2 text-dark text-center">
                        Already have an account?{" "}
                        <Link to="/" className="text-danger fw-bold">
                            Login
                        </Link>
                    </p>
            </div>
        </div>
    </>
}
export default Register;