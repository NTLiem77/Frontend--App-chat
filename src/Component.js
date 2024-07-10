            import {useNavigate} from "react-router-dom";
            import React, {useState, useEffect} from "react";
            import {w3cwebsocket} from "websocket";

            import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
            import './room.css'


            import LoginForm from "./LoginForm";
            import Room from "./Room";
            import {navigate} from "ionicons/icons";
            const Component = () =>{
                const [socket, setSocket] = useState(null);
                const [user, setUser] = useState("");
                const [pass, setPass] =useState("");
                const [isLoginSuccess, setIsLoginSuccess] = useState(false);
                const [token, setToken] = useState("");
                const [errorMsg, setErrorMsg] = useState("");
                const [customer, setCutomer] = useState("");
                const [messenger, setMess] = useState("");
                const [roomName, setRoomName] = useState("");
                const [messege, setMessege] = useState([]);
                const [isMessenger, setisMess] = useState(false);
                const navigate = useNavigate();

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
                // su kien dang xuat
            const handLougout = () => {
              const eventLougout ={
                  action: "onchat",
                  data: {
                      event: "LOGOUT"
                  }
              }
              socket.send(JSON.stringify(eventLougout));
            }
            // tao phong
                const handCreateRoom = () => {
                  if(socket){
                      const data ={
                          action: "onchat",
                          data: {
                              event: "CREATE_ROOM",
                              data: {
                                  name: roomName,
                              },
                          }
                      }
                      socket.send(socket.stringify(data));
                  }
                }
            //xử lý join room
             const    handJoinRoom = (roomName) => {
                 if (socket) {
                     const joinroom = {
                         action: "onchat",
                         data: {
                             event: "JOIN_ROOM",
                             data: {
                                 name: roomName
                             }
                         },
                     }
                     socket.send(socket.stringify(joinroom));
                 }
             }

            // get room mess chat
                const get_room_mess_chat = (roomName) => {
                    if(socket) {
                        const getroom = {
                            action: "onchat",
                            data: {
                                event: "GET_ROOM_CHAT_MES",
                                data: {
                                    name: roomName,
                                    page: 1
                                }
                            }
                        }
                        socket.send(JSON.stringify(getroom));
                    }
                }

                // send chat room
                const messchat = (roomName) => {
                    return new Promise(resolve => {
                        if(socket){
                            const mess1 = {
                                action: "SEND_CHAT",
                                data:{
                                    type: "room",
                                    to: roomName,
                                    mes: encodeURIComponent(messenger)
                                }

                            }
                        }
                    })
                }

                const twoMessChat = (roomName) =>{
                    messchat(roomName).then(get_room_mess_chat(roomName));
                }

                // get people chat mess
                const GET_PEOPLE_CHAT_MES = () => {
                    if(socket){
                        const mess = {
                            action: "onchat",
                            data: {
                                event: "GET_PEOPLE_CHAT_MES",
                                data: {
                                    name: roomName,
                                    page: 1
                                }
                            }
                        }
                        socket.send(JSON.stringify(mess));
                    }
                }

                // send chat people
                const messPeople = (user) =>{
                    if (socket){
                        const people = {
                            action: "onchat",
                            data: {
                                event: "SEND_CHAT",
                                data: {
                                    type: "people",
                                    to: user,
                                    mes: encodeURIComponent(messenger)
                                }
                            }
                        }
                        setMessege(prevMessages => [...prevMessages,  , messenger]);
                        socket.send(JSON.stringify(people));
                    }
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

                // lay ra danh sach nguoi dung, phong
                const handGetUserList = () =>{
                    if (socket){
                        const getUser = {
                            action: "onchat",
                            data: {
                                event: "GET_USER_LIST"
                            }
                        }
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
                                    // luu tru RE_LOGIN_CODE
                                    // tai sao dung session
                                    sessionStorage.setItem("codeNlu" , responseData.data.RE_LOGIN_CODE);
                                    sessionStorage.setItem("success", responseData.status);
                                    sessionStorage.setItem("name", user);
                                    navigate("/home");
                                }else {
                                  setErrorMsg("Đăng nhập không thành công");
                                }
                      if(responseData.data === "LOGOUT" && responseData.status === "success" ){

                        }

                                // get room chat mess
                            if(responseData.event === "GET_ROOM_CHAT_MES" && responseData.status === "success"){
                                const  room = localStorage.getItem("nameRoom");
                                const name = sessionStorage.getItem("name");
                                handJoinRoom(room);
                            }

                            // gửi tin nhắn thành công
                            if (responseData.event === "SEND_CHAT" && responseData.status === "success"){
                                setisMess(true);
                                localStorage.setItem("mes", responseData.data.mes);
                                localStorage.setItem("messname", responseData.data.name);
                                console.log(responseData.chatData);
                                setMess("");
                                // để hiển thị danh sách thì ta phải lập lại việc join room trước đó
                                // lấy giá tr của room đã lưu tr dựa vào handJoinRoom(room)
                                const room = localStorage.getItem("nameRoom");
                                handJoinRoom(room);
                            }

                             // check user
                            if (responseData.event === "CHECK_USER" && responseData.status === "success"){
                                console.log(responseData.data.status);
                            }

                            // lay ra danh sach nguoi dung, phong
                            if (responseData.event === "GET_USER_LIST" && responseData.status === "success"){
                                console.log(responseData.data);
                            }
                        }
                    }
                },[socket,setIsLoginSuccess])

                return(
                    <div>
                            <div>
                                {isLoginSuccess == true&&
                                    <div className="container1">
                                        {/*Header chat*/}

                                       <div className="left-sidebar">
                                           <div className="header-chat">
                                               <div className="user-avatar">
                                                   <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg" className="img-cover"/>
                                               </div>
                                               <ul className="icon-nav">
                                                   <li>
                                                       <i className="fa-solid fa-border-all"></i>
                                                   </li>
                                                   <li>
                                                       <i className="fa-solid fa-video"></i>
                                                   </li>
                                                   <li>
                                                       <i className="fa-solid fa-ellipsis-vertical"></i>
                                                   </li>
                                               </ul>
                                           </div>

                                            {/*search chat*/}
                                           <div className="search-chat">
                                               <i className="fa-solid fa-magnifying-glass"></i>
                                               <div><input type="text" placeholder="Search or start new chat" fdprocessedid="hss68p"/>
                                               </div>
                                           </div>

                                           {/*Chat list*/}
                                           <div className="box-chat active">
                                               <div className="img-userchat">
                                                   <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg" className="img-cover"/>
                                               </div>
                                               <div className="details">
                                                   <div className="headerlist">
                                                       <p>Huỳnh Anh Tài</p>
                                                   </div>
                                               </div>
                                           </div>
                                           <div className="chat-input-left">
                                               <input type="text" placeholder="Type a massage"/>
                                               <i className="fa-solid fa-square-plus"></i>
                                           </div>

                                       </div>

                                        <div className="right-sidebar">
                                            {/*Header chat*/}
                                            <div class="header-chat">
                                                <div class="imgtext">
                                                    <div class="user-avatar">
                                                        <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg" className="img-cover"/>
                                                    </div>
                                                    <i className="fa-solid fa-user-plus"></i>
                                                    <p>Huỳnh Anh Tài<br /><span>online</span></p>
                                                </div>
                                                <ul className="icon-nav">
                                                    <li>
                                                        <i className="fa-solid fa-magnifying-glass"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                                    </li>
                                                    <li>
                                                        <span className="logout">Đăng xuất</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="search-chat none">
                                                <input type="text" placeholder="Check user" fdprocessedid="hss68p" value=""/>
                                                <div className="icon-checkUser">
                                                    <i className="fa-solid fa-chevron-right"></i>
                                                </div>
                                            </div>
                                            {/*Chat box*/}
                                            <div className="chatbox">

                                            </div>

                                            <div class="chat-input-right">
                                                <i className="fa-regular fa-face-smile"></i>
                                                <i className="fa-solid fa-paperclip"></i>
                                                <input type="text" placeholder="Type a massage"/>
                                                <i className="fa-solid fa-microphone"></i>
                                            </div>
                                        </div>

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