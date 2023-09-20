import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

function User() {

    let history = useHistory();
    useEffect(() => {
        let data = sessionStorage.getItem("account");
        if (!data) {
            toast.info("Bạn vui lòng đăng nhập để vào chức năng này");
            history.push('/login');
        }
    }, [])
    return ( 
        <h1>User</h1>
     );
}

export default User;