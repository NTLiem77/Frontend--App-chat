import {useEffect, useState} from "react";
import { w3cwebsocket } from "websocket";
import {Link} from "react-router-dom";
const Register = () =>{
    // state để lưu trữ dữ liệu người dùng
    const [user, setUser] =useState("");
    const [pass, setPass] =useState("");

    // hàm xử lý sự kiện gửi yêu cầu đăng ký
    const handleRegister = () =>{
        //Tạo một đối tượng Websocket
        const ws = new w3cwebsocket("ws://140.238.54.136:8080/chat/chat");

        // đăng ký sự kiện mở kết nối socket
        ws.onopen = () =>{
            // Tạo dữ liệu yêu cầu đăng ký
            const requestData = {
                action: "onchat",
                data: {
                    event: "REGISTER",
                    data: {
                        user: user,
                        pass: pass,
                    },
                },
            };
            // gửi yêu cầu đăng ký thông qua Websocket
            ws.send(JSON.stringify(requestData));
        }

        // Đăng ký sự kiện nhận dữ liệu từ server WebSocket
        ws.onmessage = (event) =>{
            // Xử lý dữ liệu nhận được từ server
            const responseData = JSON.parse(event.data);
            console.log(responseData); // In ra dữ liệu nhận được từ server
        }
        // Đóng kết nối WebSocket khi component unmount
        return () =>{
            ws.close();
        }
    }
    // Sử dụng useEffect để đóng kết nối Websocket khi component unmount
    useEffect(() =>{
        return handleRegister();
    }, [])

    // Hàm xử lý sự kiện khi submit form
    const handleSubmit = (event) => {
      event.preventDefault();
        // Gọi hàm handleRegister để thực hiện đăng ký thông qua WebSocket
        handleRegister();
    }
    return (
        <div className="row mt-5">
            <div className="offset-lg-3 col-lg-6">
                <form className="container mt-5" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h2>Register</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Tên đăng nhập</label>
                                <input
                                    className="form-control"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Đăng Kí
                            </button>
                            <Link to="/" className="btn btn-link">Trở lại</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register