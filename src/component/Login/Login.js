import './Login.scss'

function Login() {
    return ( 
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="login-content col-sm-5 col-12 p-sm-5 p-2 d-flex flex-column gap-3 py-3">
                        <h3 className='heading-login'>Đăng nhập vào Takis Tech</h3>
                        <input className="form-control" type="text" placeholder="Tên đăng nhập" />
                        <input className="form-control" type="password" placeholder="Mật khẩu"/>
                        <button className="btn btn-primary col-12">Đăng nhập</button>
                        <a href="/" className="forgot-password">Quên mật khẩu?</a>
                        <hr></hr>
                        <div className='create-password text-center'>
                            <button className="btn btn-success">Tạo tài khoản</button>
                        </div>
                  </div>
                </div>
            </div>
        </div>
     );
}

export default Login;