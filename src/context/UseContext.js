import { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../service/userService";

const UseContext = createContext(null)


function UseProvider({ children }) {
    const userDefault = {
        isLoading: true,
        isAuthenticate: false,
        token: '',
        account: {}
    }
    const [user, setUser] = useState(userDefault)

    const loginContext = (userData) => {
        setUser({...userData, isLoading: false});
    }

    const logoutContext = () => {
        setUser(user => ({ isAuthenticate: false, token: '', account: {} }))
    }

    const fetchUser = async () => {
        let res = await getUserAccount();
        if (res && res.EC === 0) {
            let data = {
                isAuthenticate: true,
                token: res.DT.access_token,
                account: {
                    groupWithRoles: res.DT.groupWithRoles,
                    email: res.DT.email,
                    username: res.DT.username
                },
                isLoading: false
            }
            setTimeout(() => {
                setUser(data);
            },1000)
        } else {
            setUser({...userDefault, isLoading: false})
        }
    }

    useEffect(() => {
        // if (window.location.pathname !== '/' || window.location.pathname !== '/login') {           
            fetchUser();
        // }
    },[])

    return ( 
        <UseContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UseContext.Provider>
    );
}

export {UseProvider, UseContext};