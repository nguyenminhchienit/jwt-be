import { useEffect, useState } from "react";
import { getUserWithPagination } from "../../service/userService";
import ReactPaginate from 'react-paginate';

function User() {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        fetchUser();
    }, [currentPage])
    
    const fetchUser = async () => {
        let res = await getUserWithPagination(currentPage, currentLimit);
        console.log("Check res: ", res);
        if (res && res.data && res.data.EC === 0) {
            setListUser(res.data.DT.users);
            setTotalPage(res.data.DT.totalPage);
        }
    }

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    } 

    return (
        <div className="manage-user-container">
            <div className="container">
                <div className="container-table-user mt-5">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser.length > 0 ? 
                                listUser.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>{item.Group ? item.Group.name : ''}</td>
                                            <td>
                                                <button className="btn btn-warning btn-edit me-2">Sửa</button>
                                                <button className="btn btn-danger btn-delete">Xóa</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <>
                                    <tr>
                                        <td colSpan={5} className="text-center">Not found user</td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="container-pagination-user">
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
     );
}

export default User;