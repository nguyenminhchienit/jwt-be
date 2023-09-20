import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

function PrivateRoutes(props) {

    let history = useHistory();
    useEffect(() => {
        let data = sessionStorage.getItem("account");
        if (!data) {
            toast.info("Bạn vui lòng đăng nhập để vào chức năng này");
            history.push('/login');
            window.location.reload();
        }
    }, [])
    
    return ( 
        <>
            <Route path={props.path} component={props.component}/>
        </>
     );
}

export default PrivateRoutes;