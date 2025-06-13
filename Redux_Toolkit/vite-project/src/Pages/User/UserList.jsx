import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/button";
import { useDispatch, useSelector } from "react-redux";
import userThunk from "../../Redux/user/userThunk";
import { logout } from "../../Redux/auth/authSlice";
import { Input } from "../../Components/Input";
import { UserListUI } from "../../features/userFeatures/UserListUI";

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.name);
  const { userList, totalRecords, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [order, setOrder] = useState("ascending");
  const [size,setSize] = useState(20);

  

  useEffect(() => {  
    dispatch(userThunk.list({ page,size }));
  }, [page, dispatch]);

  useEffect(() => {
    setUsers(userList);
    let totalPages = Math.ceil(totalRecords / 10);
    setTotalPages(totalPages);
  }, [userList, totalRecords]);

  const setNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const setPrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleLogOut = () => {
    if (window.confirm("Do you want to Logout?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    order === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (
    // <div className="container py-4">
    //   <div className="d-flex justify-content-between align-items-center mb-3">
    //     <h2 className="bg-info text-white fw-bold px-4 py-2 rounded">Users List</h2>
    //     <Button onClick={handleLogOut} className="btn btn-danger fw-bold">
    //       Log Out
    //     </Button>
    //   </div>

    //   <h5 className="text-white text-center bg-secondary py-2 rounded mb-3">Hello, {userName}</h5>

    //   <div className="d-flex justify-content-between flex-wrap mb-3">
    //     <Input
    //       className="form-control me-2"
    //       style={{ maxWidth: "300px" }}
    //       onChange={(e) => setSearchName(e.target.value)}
    //       value={searchName}
    //       type="search"
    //       placeholder="Search by name"
    //     />

    //     <select
    //       onChange={(e) => setOrder(e.target.value)}
    //       className="form-select"
    //       style={{ maxWidth: "200px" }}
    //     >
    //       <option value="">Sort by</option>
    //       <option value="ascending">Ascending</option>
    //       <option value="descending">Descending</option>
    //     </select>
    //   </div>

    //   {loading ? (
    //     <div className="text-center">
    //       <div className="spinner-border" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="table-responsive">
    //       <table className="table table-bordered table-hover text-center align-middle">
    //         <thead className="table-dark">
    //           <tr>
    //             <th>Sr No.</th>
    //             <th>Name</th>
    //             <th>Email</th>
    //             <th>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {sortedUsers.length > 0 ? (
    //             sortedUsers.map((user, index) => (
    //               <tr key={user.id}>
    //                 <td>{(page - 1) * 10 + (index + 1)}</td>
    //                 <td style={{ whiteSpace: "normal" }}>{user.name}</td>
    //                 <td style={{ whiteSpace: "normal" }}>{user.email}</td>
    //                 <td>
    //                   <Button
    //                     onClick={() => navigate(`/user-details/${user.id}`)}
    //                     className="btn btn-primary"
    //                   >
    //                     See Details
    //                   </Button>
    //                 </td>
    //               </tr>
    //             ))
    //           ) : (
    //             <tr>
    //               <td colSpan="4" className="text-center fw-bold">
    //                 No Users Found
    //               </td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   )}

    //   <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
    //     <Button
    //       onClick={setPrevious}
    //       disabled={page === 1}
    //       className="btn btn-primary"
    //     >
    //       Previous
    //     </Button>
    //     <span className="fw-bold">
    //       Page {page} of {totalPages}
    //     </span>
    //     <Button
    //       onClick={setNext}
    //       disabled={page === totalPages}
    //       className="btn btn-success"
    //     >
    //       Next
    //     </Button>
    //   </div>
    // </div>
    <UserListUI handleLogOut={handleLogOut} userName={userName} searchName={searchName} setSearchName={setSearchName} order={order} setOrder={setOrder} loading={loading} sortedUsers={sortedUsers} setNext={setNext} setPrevious={setPrevious} page={page} setPage={setPage} totalPages={totalPages} navigate={navigate}/>
  );
}

export default UserList;
