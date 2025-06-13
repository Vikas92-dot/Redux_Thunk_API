import { Button } from "../../Components/button"
import { Input } from "../../Components/Input"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const ResetPasswordUI = ({ handleSubmit, handleChange, password, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, confirmPass, passError, processing }) => {
    return <>
        <section style={{ background: "linear-gradient(to bottom, #FFF8E1, #FFD54F)", height: "100vh" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-6 col-xl-4">
                        <div className="card rounded-3 p-4">
                            <h3 className="mb-4 text-center">Reset Password</h3>
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label">New Password</label>
                                    <div className="input-group">
                                        <Input onChange={handleChange} label="password" name="password" value={password} type={showPassword ? "text" : "password"} className="form-control"
                                        />
                                        <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>

                                    <label className="form-label">Confirm Password</label>
                                    <div className="input-group">

                                        <Input onChange={handleChange} name="confirmPass" value={confirmPass} type={showConfirmPassword ? "text" : "password"} className="form-control"
                                        />
                                        <span className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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