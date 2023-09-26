import axios from "../setup/axios";



const getGroup = (data) => {
    return axios.get("/group/read")
}


export {
    getGroup
}