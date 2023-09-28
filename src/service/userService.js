import axios from "../setup/axios";

const registerNewUser = (data) => {
    return axios.post("/register",data)
}

const loginUser = (data) => {
    return axios.post("/login",data)
}

const getAllUser = (data) => {
    return axios.get("/user/read")
}

const getUserWithPagination = (page,limit) => {
    return axios.get(`/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete("/user/delete",{data: {id: user.id}})
}

const createUser = (data) => {
    return axios.post("/user/create",data)
}

const updateUser = (data) => {
    return axios.put("/user/update",data)
}

const getUserAccount = () => {
    return axios.get("/account")
}

export {
    registerNewUser,
    loginUser,
    getAllUser,
    getUserWithPagination,
    deleteUser,
    createUser,
    updateUser,
    getUserAccount
}