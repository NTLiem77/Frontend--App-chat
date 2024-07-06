import {Link} from "react-router-dom";
import React from "react";

export default class LoginForm extends React.Component {
    render() {
        return (
            <div>
                <div className="row m_60 mt-5">
                    <div className="offset-lg-3 col-lg-6">
                        <form className="container mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h2>User Login</h2>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Tên đăng nhập<span className="errmsg"></span></label>
                                        <input type="text" className="form-control"
                                               value={this.props.user}
                                               onChange={(e) => this.props.setUser(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label>Mật khẩu<span className="errmsg"></span></label>
                                        <input type="password" className="form-control"
                                               value={this.props.pass}
                                               onChange={(e) =>this.props.setPass(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary"
                                                onClick={this.props.handleLogin}>
                                            Đăng nhập
                                        </button>
                                    </div>
                                    {
                                        this.props.errorMsg && (
                                            <div className="form-group">
                                                <div className="alert alert-danger">{this.props.errorMsg}</div>
                                            </div>
                                        )
                                    }
                                    <div className="form-group">
                                        <p>
                                            Bạn chưa có tài khoản?{" "}
                                            <Link to="/register">Đăng ký ngay</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

    }
}