import { Button } from "../../Components/button"

export const UserDetailsUI = ({navigate, image, loading, userData, id, handleDelete}) => {
    return <>

    <div className="container justify-content-center py-4 d-flex align-items-center ">

        <Button style={{position:"absolute", top:"1%", left:"1%"}} onClick={() => { navigate(-1) }} className='btn btn-warning mt-4 ms-4'>Dashboard</Button>
        <div className="card p-2 " style={{ width: "450px", background: "linear-gradient(to bottom, #FFF8E1,rgb(243, 255, 79))" }}>
            <h2 className='text-center mt-2' >User Details</h2>

            <img className="card-img-top" src={image} alt="User Image" style={{ width: "100%", height: "300px" }} />
            <div className='p-2'>
                <span className='fw-bold' style={{ fontSize: "30px" }}>Name:</span>
                {loading ? <div className="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                    : <span className='ms-2' style={{ fontSize: "30px" }}>{userData?.name || "Unknown"}</span>}
            </div>
            <div className='p-2'>
                <span className='fw-bold' style={{ fontSize: "30px" }}>Email:</span>
                {loading ? <div className="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                    : <span className='ms-2' style={{ fontSize: "30px" }}>{userData?.email || "Unknown"}</span>}

            </div>
            <div className='text-center p-2'>

                <Button onClick={() => navigate(`/edit-user/${id}`)} className='btn btn-success  w-100'>Edit</Button>
                <Button disabled={loading} onClick={() => handleDelete()} className='btn btn-danger mt-2 w-100'>{loading ? <div className="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div> : "Delete"}</Button>
            </div>
        </div>
    </div>
    </>
}