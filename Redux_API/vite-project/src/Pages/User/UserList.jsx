import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/button";
import { useDispatch, useSelector } from "react-redux";
import { list } from "../../Redux/user/userSlice";
import { logout } from "../../Redux/auth/authActions";



function UserList() {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const userName = localStorage.getItem('name');
    const { userList, totalRecords, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [order, setOrder] = useState('ascending');


    useEffect(() => {
        dispatch(list({ page }));
    }, [page, dispatch]);

    useEffect(() => {
        console.log("All Users", userList);
        setUsers(userList);
        let totalPages = Math.ceil(totalRecords / 10);
        setTotalPages(totalPages);
    }, [userList, totalRecords]);

    const setNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }
    const setPrevious = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    }
    const handleLogOut = () => {
        if (window.confirm("Do you want to LogOut?")) {
            dispatch(logout());
            navigate('/');
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('userId');
        }
    }
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) =>
        order === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    return <>
        <div className="container py-2">
            <div className="container py-2 d-flex justify-content-between align-items-center">
                <h2 className="text-center text-white rounded bg-primary p-2 py-2">User List</h2>
                <button onClick={() => handleLogOut()} className="btn btn-danger fw-bold">Logout</button>
            </div>
            <h5 className="bg-secondary text-center text-white py-2 p-2 rounded mb-3">Hello,{userName}</h5>

            <div className="d-flex justify-content-between flex-wrap mb-3">
                <input
                    type="search"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={{ maxWidth: "300px" }}
                    className="form-control"
                    placeholder="Search by name"
                />

                <select className="form-select" onChange={(e) => setOrder(e.target.value)} style={{ maxWidth: "200px" }}>
                    <option value="">Sort by</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive mb-3">
                    <table className="table table-bordered table-hover text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.length > 1 ? (sortedUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{(page - 1) * 10 + (index + 1)}</td>
                                    <td style={{ whiteSpace: "normal" }}>{user.name}</td>
                                    <td style={{ whiteSpace: "normal" }}>{user.email}</td>
                                    <td>
                                        <Button
                                            onClick={() => navigate(`/user-details/${user.id}`)}
                                            className="btn btn-primary"
                                        >
                                            See Details
                                        </Button>
                                    </td>
                                </tr>
                            ))) :
                                (
                                    <td className="text-center fw-bold" colSpan={4}>
                                        No User Found
                                    </td>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )}
            <div className="justify-content-center align-items-center d-flex gap-2">
                <button disabled={page === 1} onClick={() => setPrevious()} className="btn btn-warning">Previous</button>
                Page {page} of {totalPages}
                <button disabled={page === totalPages} onClick={() => setNext()} className="btn btn-success">Next</button>
            </div>
        </div>
    </>
}
export default UserList;
