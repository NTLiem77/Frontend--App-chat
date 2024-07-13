            import {useNavigate} from "react-router-dom";
            import React, {useState, useEffect, useCallback} from "react";
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
                // tao mang chua phong
                const [roomList, setRoomList] =useState([]);
                // emoij
                const [selectedEmoji, setSelectedEmoji] =useState(null);
                // check khi clcik vao emoij
                const  [isEmojiPickerVisible, setEmojiPickerVisible] =useState(false);
                const navigate = useNavigate();



                //uploadFile
                const [image, setImage] = useState(null)
                const [fileName, setFileName] = useState("")

                const handTwoClick = (roomName, user) =>{
                    messchat(roomName).then(messPeople(user))
                }

                // khi component được taạo thiết lập kết nối websocket
                const mesnam=  sessionStorage.getItem("mesnam");
                useEffect(() =>{
                    const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

                    newSocket.addEventListener("open",(event) =>{
                        console.log("Kết nối websocket đã được thiết lập", event);
                        setSocket(newSocket);
                    })
                   const susscess =sessionStorage.getItem("success");
                    if(susscess=== "success"){
                        sessionStorage.setItem("name1", mesnam);
                        const nlu = sessionStorage.getItem("codeNlu");
                        newSocket.onopen = function () {
                            const relogin = {
                                action: "onchat",
                                data: {
                                    event: "RE_LOGIN",
                                    data: {
                                        user: mesnam,
                                        code: nlu
                                    }
                                }
                            }
                            newSocket.send(JSON.stringify(relogin));
                        }
                    }
                    return () => {
                        console.log("Closing WebSocket connection...");
                        newSocket.close();

                    };
                },[]);
// xét lại giá tra (mặc định là false);
                const handlePosClick = () => {
                    setEmojiPickerVisible(!isEmojiPickerVisible);
                };
// clcik chọn emoij
                const handleEmojiClick = (emoji) => {
                    setSelectedEmoji(emoji.emoji); // chọn emoij
                    // thêm nhiều emoij + vào trong mess -> xét lại các giá trị
                    setMess(messenger + emoji.emoji);

                };
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
                          },
                      };
                      socket.send(JSON.stringify(data));
                  }
                }


            //xử lý join room
                const handJoinRoom = (roomName) => {

                    if (socket) {
                        const joinRoom = {
                            action: "onchat",
                            data: {
                                event: "JOIN_ROOM",
                                data: {
                                    name: roomName
                                }
                            },
                        }

                        socket.send(JSON.stringify(joinRoom));
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
                    return new Promise((resolve) => {
                        if(socket){
                            const mess1 = {
                                action: "SEND_CHAT",
                                data:{
                                    type: "room",
                                    to: roomName,
                                    mes: encodeURIComponent(messenger)
                                }

                            }
                            socket.send(JSON.stringify(mess1));
                            resolve();
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
                const messPeople = (user) => {
                    if (socket) {
                        return new Promise((resolve) => {
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
                                setMessege(prevMessages => [...prevMessages, , messenger]);
                                socket.send(JSON.stringify(people));
                                resolve();
                            }
                        )}

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
                        socket.send(JSON.stringify(getUser));// chuyen ve chuoi  - gui den socket
                    }
                }
                function file(event) {
                    const file = event.target.files[0];
                    setMess(file.name);
                }

                // file đang làm
                function handleImageChange({target: {files}}){
                    if (files && files[0]){
                        setFileName(files[0].name);
                        setImage(URL.createObjectURL(files[0]));
                        setMess(fileName);
                    }
                }
                const [nameVideoRoom, setNameVideoRoom] = useState("VideoCall")
                // video call
                const handleVideoCall = useCallback(() => {
                        navigate(`/room/${nameVideoRoom}`);
                }, [navigate,nameVideoRoom])

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
                                    navigate("/home");
                                    // lay ra danh sach nguoi dung, phong
                                    handGetUserList();
                                }else {
                                  setErrorMsg("Đăng nhập không thành công");
                                }
                      if(responseData.event === "LOGOUT" && responseData.status === "success" &&responseData.data === "You are Logout!" ){
                          setIsLoginSuccess(false);
                          const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
                          setSocket(newSocket);
                          setErrorMsg("")
                          // lấy ra danh sách người dùng, phòng
                          handGetUserList();
                          navigate("/login");
                        }

                                // get room chat mess
                            if(responseData.event === "GET_ROOM_CHAT_MES" && responseData.status === "success"){
                                const  room = localStorage.getItem("nameRoom");
                                const name = sessionStorage.getItem("name");
                                handJoinRoom(room);
                            }
                            // ma relogin chi ddung 1 lan
                            // relogin
                            if(responseData.event ==="RE_LOGIN"  && responseData.status === "success"){
                                setIsLoginSuccess(true);
                                // lấy ra danh sách người dùng, phòng
                                handGetUserList();
                                const room = localStorage.getItem("nameRoom");
                                handJoinRoom(room);
                            }
                            // relogin het thoi gian
                            if(responseData.event === "RE_LOGIN" && responseData.status ===
                                "error" && responseData.mes === "Re-Login error, Code error or you are overtime to relogin!"){
                                setIsLoginSuccess(false);
                                setErrorMsg("");

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
                            // joinRoom
                            if (responseData.event === "JOIN_ROOM" && responseData.status === "success") {
                                localStorage.setItem("nameRoom", responseData.data.name);
                                setMessege(responseData.data.chatData);
                                localStorage.setItem("ownner", responseData.data.own);
                                const ownner = localStorage.getItem("ownner");

                            }
                             // check user
                            if (responseData.event === "CHECK_USER" && responseData.status === "success"){
                                const room = localStorage.getItem("nameRoom");
                                console.log(responseData.data.status);
                                handJoinRoom(room);
                                // lấy ra danh sách người dùng, phòng
                                handGetUserList();
                            }

                            // lay ra danh sach nguoi dung, phong
                            if (responseData.event === "GET_USER_LIST" && responseData.status === "success"){
                                console.log(responseData.data);
                                setRoomList(responseData.data);
                            }
                        }
                    }
                },[socket,setIsLoginSuccess])

                return(
                    <div>
                            <div>
                                {isLoginSuccess == true&&
                                  <Room
                                      user={user}
                                      handLougout={handLougout}
                                      handPosClick={handlePosClick}
                                      isEmojiPickerVisible={isEmojiPickerVisible}
                                      handleEmojiClick={handleEmojiClick}
                                      roomList ={roomList}
                                      setRoomList ={setRoomList}
                                      handCreateRoom={handCreateRoom}
                                      handJoinRoom={handJoinRoom}
                                      roomName={roomName}
                                      setRoomName={setRoomName}
                                      handleImageChange={handleImageChange}
                                      messenger={messenger}
                                      setMess={setMess}
                                      handTwoClick={handTwoClick}
                                      messege={messege}
                                      checkUser={checkUser}
                                      handGetUserList={handGetUserList}
                                      twoMessChat={twoMessChat}
                                      file={file}
                                      handleVideoCall={handleVideoCall}

                                  />
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