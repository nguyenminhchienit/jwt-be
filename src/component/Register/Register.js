import { useEffect, useState } from 'react';
import './Register.scss'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import {registerNewUser} from '../../service/userService'

function Register() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let history = useHistory();
    const handleLogin = async () => {
        const userData = { email, phone, username, password }
        let res = await registerNewUser(userData);
        if (res.EC === 0) {
            toast.success(res.EM);
            history.push("/login");
        } else {
            toast.error(res.EM);
        }
    }


    useEffect(() => {
        
    },[])

    return ( 
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="login-content col-sm-6 col-12 p-sm-4 p-2 d-flex flex-column gap-3">
                        <h3 className='heading-login'>Đăng ký tài khoản Takis Tech</h3>
                        <div className='form-group'>
                            <label className="form-label">Email address</label>
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label className="form-label">Điện thoại</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Điện thoại" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>   
                        <div className='form-group'>
                            <label className="form-label">Tên đăng nhập</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Tên đăng nhập" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>   
                        <div className='form-group'>
                            <label className="form-label">Mật khẩu</label>
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Mật khẩu" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label className="form-label">Xác nhận mật khẩu</label>
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Xác nhận mật khẩu" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='create-password text-center'>
                            <button className="btn btn-primary" onClick={() => handleLogin()}>Tạo tài khoản</button>
                        </div>
                        
                  </div>
                </div>
            </div>
        </div>
     );
}

export default Register;