            import {useNavigate} from "react-router-dom";
            import React, {useState, useEffect} from "react";
            import {w3cwebsocket} from "websocket";

            import LoginForm from "./LoginForm";
            const Component = () =>{
                const [socket, setSocket] = useState(null);
                const [user, setUser] = useState("");
                const [pass, setPass] =useState("");
                const [isLoginSuccess, setIsLoginSuccess] = useState(false);
                const [token, setToken] = useState("");
                const [errorMsg, setErrorMsg] = useState("");
                const [customer, setCutomer] = useState("");

                // khi component được taạo thiết lập kết nối websocket
                useEffect(() =>{
                    const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

                    newSocket.addEventListener("open",(event) =>{
                        console.log("Kết nối websocket đã được thiết lập", event);
                        setSocket(newSocket);
                    })
                },[]);


                // xử lý đăng nhập
                const handleLogin = () => {
                    // gửi yêu cầu đăng nhập đến server socket
                    const requestData = {
                        action: "onchat",
                        data: {
                            event: "LOGIN",
                            data: {
                                user: user,
                                pass: pass,
                            },
                        },
                    };
                    socket.send(JSON.stringify(requestData));
                }
            const handLougout = () => {
              const eventLougout ={
                  action: "onchat",
                  data: {
                      event: "LOGOUT"
                  }
              }
              socket.send(JSON.stringify(eventLougout));
            }

            // check user
                const checkUser = () =>{
                    if (socket){
                        const check ={
                            action: "onchat",
                            data: {
                                event: "CHECK_USER",
                                data: {
                                    user: customer
                                }
                            }
                        }
                        socket.send(JSON.stringify(check));
                    }
                }

                // sau khi kết nối websocket thành công
                useEffect(() => {
                    if (socket){
                        socket.onmessage = (event) =>{
                            const responseData = JSON.parse(event.data);
                                if (responseData && responseData.event === "LOGIN" && responseData.status === "success"){
                                    // đăng nhập thành công
                                    setIsLoginSuccess(true);
                                    // lưu trữ thông tin đăng nhập
                                    setToken(responseData.data.tokens);
                                }else {
                                    // Đăng nhập thất bại, xử lý lỗi tại đây
                                }

                             // check user
                            if (responseData.event === "CHECK_USER" && responseData.status === "success"){
                                console.log(responseData.data.status);
                            }
                        }
                    }
                },[socket,setIsLoginSuccess])

                return(
                    <div>
                            <div>
                                {(isLoginSuccess == true)&&
                                            <div>
                                                <h1>Thanh cong</h1>
                                                <h4 onClick={()=> handLougout()}>Logout</h4>
                                            </div>
                                }
                                {isLoginSuccess == false &&
                                        <LoginForm
                                            user = {user}
                                            setUser = {setUser}
                                            pass = {pass}
                                            setPass = {setPass}
                                            handleLogin = {handleLogin}
                                            errorMsg={errorMsg}
                                        />


                                }
                            </div>
                    </div>
                )
            }

            export default Component