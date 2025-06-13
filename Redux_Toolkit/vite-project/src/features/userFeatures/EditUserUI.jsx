import { Button } from "../../Components/button"
import { Input } from "../../Components/Input"

export const EditUserUI = ({navigate,formik}) => {
    return <>
        <div className="container justify-content-center align-item-center d-flex">
            <Button onClick={() => { navigate(-1) }} style={{ width: "6rem", height: "3rem", position: "absolute", left: "2%" }} className='btn btn-warning mt-4 '>Dashboard</Button>
            <div className="row mt-5" style={{ boxShadow: "10px 10px 10px grey", height: "auto", width: "300px", borderRadius: "10px", background: "linear-gradient(to bottom, #FFF8E1,rgba(252, 255, 79, 0.57))" }}>
                <h3 className="text-center p-2 text-white bg-secondary" style={{ width: "100%", height: "50px", borderRadius: "5px" }}>Edit User</h3>
                <form onSubmit={formik.handleSubmit} >
                    <div className="form-group p-2">
                        <label className="form-label">Name</label>
                        <Input
                            name="name"
                            value={formik.values?.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control"
                            type="text"
                            placeholder="Enter your name" />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-danger">{formik.errors.name}</div>
                        )}

                        <label className="form-label">Email</label>
                        <Input
                            name="email"
                            value={formik.values?.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control mb-2"
                            type="email"
                            placeholder="Enter your Email" />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-danger">{formik.errors.email}</div>
                        )}

                        <label className="form-label">Password</label>
                        <Input
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control mb-2"
                            type="password"
                            placeholder="Change Password" />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-danger">{formik.errors.password}</div>
                        )}

                        <Button disabled={formik.isSubmitting} type="submit" className="btn btn-success w-100 mt-2 mb-2 ">{formik.isSubmitting ?
                            <div className="text-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div> : "Save"}</Button>
                    </div>
                </form>
            </div>
        </div>
    </>
}