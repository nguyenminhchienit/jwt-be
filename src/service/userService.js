import axios from "axios";

const registerNewUser = (data) => {
    return axios.post("http://localhost:8080/api/v1/register",data)
}

const loginUser = (data) => {
    return axios.post("http://localhost:8080/api/v1/login",data)
}

const getAllUser = (data) => {
    return axios.get("http://localhost:8080/api/v1/user/read")
}

const getUserWithPagination = (page,limit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete("http://localhost:8080/api/v1/user/delete",{data: {id: user.id}})
}

const createUser = (data) => {
    return axios.post("http://localhost:8080/api/v1/user/create",data)
}

const updateUser = (data) => {
    return axios.put("http://localhost:8080/api/v1/user/update",data)
}

export {
    registerNewUser,
    loginUser,
    getAllUser,
    getUserWithPagination,
    deleteUser,
    createUser,
    updateUser
}