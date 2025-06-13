import { Button } from "../../Components/button"
import { Input } from "../../Components/Input"

export const UserListUI = ({ handleLogOut, userName, searchName, setSearchName, order, setOrder, loading, sortedUsers, setNext, setPrevious, page, setPage, totalPages, navigate }) => {

    return <>
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="bg-info text-white fw-bold px-4 py-2 rounded">Users List</h2>
                <Button onClick={handleLogOut} className="btn btn-danger fw-bold">
                    Log Out
                </Button>
            </div>

            <h5 className="text-white text-center bg-secondary py-2 rounded mb-3">Hello, {userName}</h5>

            <div className="d-flex justify-content-between flex-wrap mb-3">
                <Input
                    className="form-control me-2"
                    style={{ maxWidth: "300px" }}
                    onChange={(e) => setSearchName(e.target.value)}
                    value={searchName}
                    type="search"
                    placeholder="Search by name"
                />

                <select
                    onChange={(e) => setOrder(e.target.value)}
                    className="form-select"
                    style={{ maxWidth: "200px" }}
                >
                    <option value="ascending">Sort by (Ascending)</option>
                    <option value="descending">Sort by (Descending)</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.length > 0 ? (
                                sortedUsers.map((user, index) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center fw-bold">
                                        No Users Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                <Button
                    onClick={setPrevious}
                    disabled={page === 1}
                    className="btn btn-primary"
                >
                    Previous
                </Button>
                <span className="fw-bold">
                    Page {page} of {totalPages}
                </span>
                <Button
                    onClick={setNext}
                    disabled={page === totalPages}
                    className="btn btn-success"
                >
                    Next
                </Button>
            </div>
        </div>
    </>
}