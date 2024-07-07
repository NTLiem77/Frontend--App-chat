import {Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect, Component} from "react";

export default class LoginForm extends React.Component {
    render() {
        return
        <div>
            <div className="row m_60">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Tên đăng nhập<span className="errmsg"></span></label>
                                    <input type="text" className="form-control">

                                    </input>
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu<span className="errmsg"></span></label>
                                    <input type="password" className="form-control">

                                    </input>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary">
                                        Đăng nhập
                                    </button>
                                </div>
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
    }
}