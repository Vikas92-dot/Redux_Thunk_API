import { Button } from "../../Components/button"
import { Input } from "../../Components/Input"

export const VerifyEmailUI = ({handleSubmit,email,processing}) => {
    return <>
        <div className="container  justify-content-center align-item-center d-flex">
            <div className="row mt-5" style={{ boxShadow: "10px 10px 10px grey", height: "auto", width: "300px", borderRadius: "10px" }}>
                <h3 className="text-center p-2 text-white bg-info" style={{ width: "100%", height: "50px" }}>Email-Verification</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group p-2">
                        <label className="form-label">Email</label>
                        <Input readOnly name="email" value={email} className="form-control mb-2" type="email" />
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