import {Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect, Component} from "react";
export default class LoginForm extends React.Component {
    render() {
        return
        <div>
            <div className="card-header">
                <h2>User Login</h2>
            </div>
            <div className="form-group">
                <p>
                    Bạn chưa có tài khoản?{" "}
                    <Link to="/register">Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    }
}