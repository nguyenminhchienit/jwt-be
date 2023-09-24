import axios from "axios";



const getGroup = (data) => {
    return axios.get("http://localhost:8080/api/v1/group/read")
}


export {
    getGroup
}