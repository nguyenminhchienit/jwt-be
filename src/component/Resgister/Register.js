import './Register.scss'
import { useHistory } from "react-router-dom";

function Register() {

    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    return ( 
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="login-content col-sm-6 col-12 p-sm-4 p-2 d-flex flex-column gap-3">
                        <h3 className='heading-login'>Đăng ký tài khoản Takis Tech</h3>
                        <div className='form-group'>
                            <label for="" class="form-label">Email address</label>
                            <input className="form-control" type="email" placeholder="Email" />
                        </div>
                        <div className='form-group'>
                            <label for="" class="form-label">Điện thoại</label>
                            <input className="form-control" type="text" placeholder="Điện thoại" />
                        </div>   
                        <div className='form-group'>
                            <label for="" class="form-label">Tên đăng nhập</label>
                            <input className="form-control" type="text" placeholder="Tên đăng nhập" />
                        </div>   
                        <div className='form-group'>
                            <label for="" class="form-label">Mật khẩu</label>
                            <input className="form-control" type="text" placeholder="Mật khẩu" />
                        </div>
                        <div className='form-group'>
                            <label for="" class="form-label">Xác nhận mật khẩu</label>
                            <input className="form-control" type="text" placeholder="Xác nhận mật khẩu" />
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