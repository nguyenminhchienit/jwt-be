import './Login.scss'
import { useHistory } from "react-router-dom";
import { loginUser } from '../../service/userService'
import { useState } from 'react';
import { toast } from 'react-toastify';

function Login() {
    const defaultObjValid = {
        isValidValueLogin: true,
        isValidPassword: true,
    }
    
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const [objValid,setObjValid] = useState(defaultObjValid)

    let history = useHistory();
    const handleNewAccount = () => {
        history.push("/register");
    }

    sessionStorage.removeItem("account");

    const handleLoginUser = async () => {
        setObjValid(defaultObjValid);
        if (!valueLogin) {
            setObjValid({ ...defaultObjValid, isValidValueLogin: false })
            toast.error("Không được để trống tên đăng nhập");
            return;
        }
        if (!password) {
            setObjValid({ ...defaultObjValid, isValidPassword: false })
            toast.error("Không được để trống mật khẩu");
            return;
        }

        const res = await loginUser({ valueLogin, password });
        if (res.data.EC === 0) {
            toast.success(res.data.EM);
            let data = {
                isLogin: true,
                token: "FAKE TOKEN"
            }
            sessionStorage.setItem("account", JSON.stringify(data));

            history.push('/user')

            window.location.reload();
        } else {
            toast.error(res.data.EM);
        }
    }

    return ( 
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="login-content col-sm-5 col-12 p-sm-5 p-2 d-flex flex-column gap-3 py-3">
                        <h3 className='heading-login'>Đăng nhập vào Takis Tech</h3>
                        <input
                            className={objValid.isValidValueLogin ? "form-control" : "form-control is-invalid"}
                            type="text"
                            placeholder="Tên đăng nhập" 
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                        />
                        <input
                            className={objValid.isValidPassword ? "form-control" : "form-control is-invalid"}
                            type="password"
                            placeholder="Mật khẩu" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn btn-primary col-12" onClick={() => handleLoginUser()}>Đăng nhập</button>
                        <a href="/" className="forgot-password">Quên mật khẩu?</a>
                        <hr></hr>
                        <div className='create-password text-center'>
                            <button className="btn btn-success" onClick={() => handleNewAccount()}>Tạo tài khoản</button>
                        </div>
                  </div>
                </div>
            </div>
        </div>
     );
}

export default Login;