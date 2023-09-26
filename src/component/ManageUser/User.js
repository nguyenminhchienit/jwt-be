import { useEffect, useState } from "react";
import { getUserWithPagination,deleteUser } from "../../service/userService";
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModelConfirmDelete from "./ModelCofirmDelete";
import ModalUser from "./ModalUser";

function User() {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModal, setDataModal] = useState({})
    const [actionModalUser, setActionModalUser] = useState("");


    useEffect(() => {
        fetchUser();
    }, [currentPage])
    
    const fetchUser = async () => {
        let res = await getUserWithPagination(currentPage, currentLimit);
        if (res && res.EC === 0) {
            setListUser(res.DT.users);
            setTotalPage(res.DT.totalPage);
        }
    }

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    } 

    const handleDeleteUser= async (user) => {
        setIsShowModal(true);
        setDataModal(user);
    }

    const handleConfirmDelete = async () => {
        let res = await deleteUser(dataModal);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setIsShowModal(false);
            await fetchUser();
        } else {
            toast.error(res.EM);
            setDataModal({});
        }
    }

    const handleShowModalUser = () => {
        setActionModalUser("CREATE");
        setIsShowModalUser(true);
    }

    const handleCloseModalUser = async () => {
        setIsShowModalUser(false);
        await fetchUser();
    }

    const handleClose = () => {
        setIsShowModal(false)
    }

    const handleUpdateUser = (user) => {
        setActionModalUser("EDIT")
        setDataModal(user);
        setIsShowModalUser(true);
    }

    const handleRefresh = async () => {
        await fetchUser();
    }

    return (
        <>
            <div className="manage-user-container">
                <div className="container">
                    <div className="my-3">
                        <button className="btn btn-primary me-2" onClick={() => handleShowModalUser()}>Thêm</button>
                        <button className="btn btn-success" onClick={() => handleRefresh()}>Refresh</button>
                    </div>
                    <div className="container-table-user">
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
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning btn-edit me-2"
                                                        onClick={() => handleUpdateUser(item)}
                                                    >Sửa</button>
                                                    <button
                                                        className="btn btn-danger btn-delete"
                                                        onClick={() => handleDeleteUser(item)}
                                                    >Xóa</button>
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
            <ModelConfirmDelete
                show={isShowModal}
                handleClose={handleClose}
                handleConfirmDelete={handleConfirmDelete}  
                user={dataModal}
            />

            <ModalUser
                show={isShowModalUser}
                handleClose={handleCloseModalUser}
                action={actionModalUser}
                user={dataModal}
            />
        </>
     );
}

export default User;