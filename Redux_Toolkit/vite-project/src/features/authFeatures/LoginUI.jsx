import { Link } from "react-router-dom";
import { Button } from "../../Components/button";
import { Input } from "../../Components/Input";

export function LoginUI({formik}){
    return<>
         <div className="container justify-content-center align-item-center d-flex">
            <div className="row mt-5" style={{boxShadow:"10px 10px 10px grey", height:"auto",width:"300px", borderRadius:"10px",background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)"}}>
                <h3 className="text-center p-2 text-white bg-dark" style={{width:"100%",height:"50px"}}>Login</h3>
                <form onSubmit={formik.handleSubmit} >
                    <div className="form-group p-2">
                        <label className="form-label">Email</label>
                        <Input 
                        name="email" 
                        value={formik.values.email} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        className="form-control mb-2" 
                        type="email" 
                        placeholder="Enter your Email"
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger">{formik.errors.email}</div>
                        )}

                        <label className="form-label">Password</label>
                        <Input 
                        name="password" 
                        value={formik.values.password} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        className="form-control" 
                        type="password" 
                        placeholder="Enter your Password"
                        autoComplete="current-password"/>
                        {formik.touched.password && formik.errors.password && (
                          <div className="text-danger">{formik.errors.password}</div>
                        )} 
                          <Button type="submit" disabled={formik.isSubmitting} className="btn btn-success mt-4 w-100" >
                            {formik.isSubmitting ?
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                             <span className="visually-hidden">Loading...</span>
                            </div>
                          </div> : "Login"}
                          </Button>
                    </div>
                </form>
                        <Link to="/forgot-password" className="text-danger text-center fw-bold">
                            Forgot-Password
                        </Link>
                    <p className="mb-2 mt-2 text-dark text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary fw-bold">
                            Register
                        </Link>
                    </p>
            </div>
        </div> 
    </>
}