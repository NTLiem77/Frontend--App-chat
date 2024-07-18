import React, {useState, useEffect, Component} from "react";
import EmojiPicker from "emoji-picker-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import './room.css'

import Incomingvideo from "./VideoCall/Incomingvideo";
import {navigate} from "ionicons/icons";
import {useNavigate} from "react-router-dom";

import moment from 'moment-timezone';

export function convertServerTimeToClientTime(serverTime) {
    // Chuyển đổi thời gian ICT thành đối tượng Moment
    const ictMoment = moment(serverTime).tz('Asia/Ho_Chi_Minh');

    // Chuyển đổi sang múi giờ của Việt Nam (GMT+7)
    const vnMoment = ictMoment.clone().add(7, 'hours');

    // Định dạng lại thành chuỗi để hiển thị cho người dùng
    const formattedVNTime = vnMoment.format('DD-MM-YYYY HH:mm:ss');

    // Trả về thời gian của Việt Nam dưới dạng chuỗi
    return formattedVNTime;
}

export default class Room extends React.Component{

    render() {
        const  data = sessionStorage.getItem("dataTo");
        const username =  sessionStorage.getItem("username");
        //
        sessionStorage.setItem("use" , username);
        // lay ten phong
        const nameRoom = localStorage.getItem("nameRoom");
        const sortMess = this.props.messege.sort((a, b) => a.id - b.id);
        const  url =sessionStorage.getItem("linkcall");

        const count  = sessionStorage.getItem("count" );
        return <div>

            <div className="container1">
                {/*Header chat*/}

                <div className="left-sidebar">
                    <div className="header-chat">
                        <div className="flex">
                            <div className="user-avatar">
                                <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
                                     className="img-cover"/>
                            </div>
                            <p className="m_9">{username}</p>
                        </div>
                        <ul className="icon-nav">
                            <li>
                                <div id="componet">
                                    <ion-icon name="ellipsis-vertical" role="img" className="md hydrated" aria-label="ellipsis vertical">
                                    </ion-icon>
                                </div>
                            </li>
                        </ul>

                    </div>

                    {/*search chat*/}
                    <div className="search-chat">
                        <div>
                            <input  id="search" className="pointer" type="text" placeholder="Search or start new chat" fdprocessedid="hss68p"/>
                            <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline">
                            </ion-icon>
                        </div>
                    </div>

                    {/*Chat list*/}
                    <div className="list-chat">
                        <div>
                            <div>
                                {this.props.roomList.map((room, index) => (
                                    <div className="group" >
                                        { room.type === 0 &&
                                            <h6 key={index}>
                                                <div className="imgtext1 "   onClick={() => this.props.getchatpeople(room.name)}>
                                                    <div className="user-avatar"><img
                                                        src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                                                        className="img-cover"/></div>
                                                    <p className="author_mess">{room.name}</p>
                                                </div>
                                            </h6>

                                        }
                                        {  room.type === 1  &&
                                            <h6 key={index}>
                                                <div className="imgtext1" onClick={() => this.props.handJoinRoom(room.name)}>
                                                    <div className="user-avatar"><img
                                                        src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
                                                        className="img-cover"/></div>
                                                    <p className="author_mess">{room.name}</p>
                                                </div>
                                            </h6>

                                        }


                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                    <div className="chat-input-left pointer">
                        <input className="pointer" type="text" value={this.props.roomName}
                               onChange={(e) => this.props.setRoomName(e.target.value)}
                               placeholder="Nhập tên phòng"/>
                        <div onClick={this.props.handCreateRoom}>
                            <FontAwesomeIcon icon="fa-sharp fa-light fa-square-plus"/><FontAwesomeIcon icon={faSquarePlus}/>
                        </div>
                    </div>

                </div>
                {/*Phần chat*/}
                <div className="right-sidebar">
                    {/*Header chat*/}
                    <div className="header-chat">
                        {this.props.isJoin === true &&
                            <div className={"imgtext"}>
                                {/*<div className={"user-avatar"}>*/}
                                {/*    <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg" className={"img-cover"}/>*/}
                                {/*</div>*/}

                                    {/*<span>Online</span>*/}
                            </div>
                            // tin nhắn người
                        } {this.props.isMessenger === false && this.props.isJoin === false &&
                        <div className={"imgtext"}>
                            <div className={"user-avatar"}>
                                <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg" className={"img-cover"}/>
                            </div>
                            <p className={"author_mess"}>{nameRoom}<br/>
                                <span>{count} thành viên</span></p>
                        </div>
                    }
                    {/*tin nhắn nhóm*/}
                        {this.props.isMessenger === true && this.props.isJoin === false &&
                            <div className={"imgtext"}>
                                <div className={"user-avatar"}>
                                    <img
                                        src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
                                        className="img-cover"/>
                                </div>
                                <p className={"author_mess"}>{data}<br/>
                                    <span>Online</span></p>
                            </div>
                        }
                        {this.props.isJoin === false && this.props.isMessenger === true &&
                            <ul className="icon-nav">
                                <li onClick={() => this.props.videoCall(nameRoom, url)}>
                                    <i className="fa-solid fa-video"></i>
                                </li>
                                <li className="lougout" onClick={this.props.handLougout}>Đăng xuất</li>
                            </ul>}
                        {this.props.isJoin === false && this.props.isMessenger === false &&
                            <ul className="icon-nav">
                                <li onClick={() => this.props.videoCall(nameRoom, url)}>
                                    <i className="fa-solid fa-video"></i>
                                </li>
                                <li className="lougout" onClick={this.props.handLougout}>Đăng xuất</li>
                            </ul>}

                    </div>
                    {/*Check User*/}
                    {this.props.isJoin === false && this.props.isMessenger === true &&
                        <div className="search-chat pointer">
                            <div><input type="text" placeholder="Check user" fdprocessedid="hss68p"
                                        value={this.props.customer}
                                        onChange={(e) => this.props.setCutomer(e.target.value)}></input>
                                <div onClick={this.props.checkUser}>
                                    <ion-icon name="chevron-forward" role="img" className="md hydrated"
                                              aria-label="search outline"></ion-icon>
                                </div>
                            </div>
                            {/*<i className="fa-solid fa-chevron-right"></i>*/}
                            {/*<div><input className="pointer" type="text" placeholder="Check User" fdprocessedid="hss68p"/>*/}
                            {/*</div>*/}
                        </div>
                    }
                    {this.props.isJoin === false && this.props.isMessenger === false &&
                        <div className="search-chat pointer">
                            <div><input type="text" placeholder="Check user" fdprocessedid="hss68p"
                                        value={this.props.customer}
                                        onChange={(e) => this.props.setCutomer(e.target.value)}></input>
                                <div onClick={this.props.checkUser}>
                                    <ion-icon name="chevron-forward" role="img" className="md hydrated"
                                              aria-label="search outline"></ion-icon>
                                </div>
                            </div>
                            {/*<i className="fa-solid fa-chevron-right"></i>*/}
                            {/*<div><input className="pointer" type="text" placeholder="Check User" fdprocessedid="hss68p"/>*/}
                            {/*</div>*/}
                        </div>
                    }

                    {/*Chat box*/}
                    <div className="chatbox">
                        {this.props.isJoin === true &&
                            <div className={"interface"}>
                                <h2>Chào mừng bạn đến App Chat của nhóm 11!</h2>
                                <img src={"https://firebasestorage.googleapis.com/v0/b/uploadingfile-eb7e8.appspot.com/o/images%2Fanh4.jpg54d3c648-c04d-4b70-a530-2381b137048a?alt=media&token=861a8532-c9c9-4704-b0b9-01ae1825c9fa"}></img>
                            </div>
                        }

                        {/*tin nhắn người*/}
                        {this.props.isMessenger === true && this.props.isJoin === false &&
                            <div>
                                {sortMess.map((message, index) => (
                                    <div>
                                        <div>
                                            {message.name !== username && !message.mes.startsWith("https") &&
                                                <div className="mess frnmess">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <img  src={"https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg"} className="messFr"></img>
                                                            <h6>{message.name}</h6>
                                                            <p>{decodeURIComponent(message.mes)}
                                                                <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            <div>
                                                { message.name === username && !message.mes.startsWith("https") &&
                                                    <div className="mess mymess">
                                                        <h6>
                                                            <h6 key={index}>
                                                                <img src={"https://timanhdep.com/wp-content/uploads/2022/06/hinh-nen-cute-anh-nen-cute-dang-yeu-nhat-the-gioi-01.jpg"}></img>
                                                                <h6>{message.name}</h6>
                                                                <p>{decodeURIComponent(message.mes)}
                                                                    <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                            </h6>
                                                        </h6>
                                                    </div>
                                                }
                                            </div>
                                            {message.name !== username && message.mes.startsWith("https") &&
                                                <div className="mess frnmess">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <h6>{message.name}</h6>
                                                            <img src={"https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg"} className={'messFr'}></img>
                                                            <p >  <img className="img_chat" src={decodeURIComponent(message.mes)} alt=""/>
                                                                <br/>
                                                                <p><span>{convertServerTimeToClientTime(message.createAt)}</span></p></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            {message.name === username && message.mes.startsWith("https") &&
                                                <div className="mess mymess ">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <img src={"https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg"} className={'messFr'}></img>
                                                            <h6>{message.name}</h6>
                                                            <p><img className="img_chat" src={decodeURIComponent(message.mes)} alt=""/>
                                                                <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>
                                    </div>))
                                }
                            </div>
                        }

                        {/*tin nhắn nhóm*/}
                        {this.props.isMessenger === false && this.props.isJoin === false &&
                            <div>
                                {sortMess.map((message, index) => (
                                    <div>
                                        <div>
                                            {message.name !== username && !message.mes.startsWith("https") &&
                                                <div className="mess frnmess">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <img  src={"https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg"} className="messFr"></img>
                                                            <h6>{message.name}</h6>
                                                            <p>{decodeURIComponent(message.mes)}
                                                                <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            <div>
                                                { message.name === username && !message.mes.startsWith("https") &&
                                                    <div className="mess mymess">
                                                        <h6>
                                                            <h6 key={index}>
                                                                <img src={"https://timanhdep.com/wp-content/uploads/2022/06/hinh-nen-cute-anh-nen-cute-dang-yeu-nhat-the-gioi-01.jpg"}></img>
                                                                <h6>{message.name}</h6>
                                                                <p>{decodeURIComponent(message.mes)}
                                                                    <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                            </h6>
                                                        </h6>
                                                    </div>
                                                }
                                            </div>
                                            {message.name !== username && message.mes.startsWith("https") &&
                                                <div className="mess frnmess">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <h6>{message.name}</h6>
                                                            <img src={"https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg"} className={'messFr'}></img>
                                                            <p >  <img className="img_chat" src={decodeURIComponent(message.mes)} alt=""/>
                                                                <br/>
                                                                <p><span>{convertServerTimeToClientTime(message.createAt)}</span></p></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            {message.name === username && message.mes.startsWith("https") &&
                                                <div className="mess mymess ">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <img src={"https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg"} className={'messFr'}></img>
                                                            <h6>{message.name}</h6>
                                                            <p><img className="img_chat" src={decodeURIComponent(message.mes)} alt=""/>
                                                                <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>
                                    </div>))
                                }
                            </div>
                        }

                    </div>

                    <div className="chat-input-right">
                        <div id="pos" onClick={this.props.handPosClick}>
                            <i className="fa-regular fa-face-smile"></i>
                        </div>
                        <div>
                            <input type={"file"} accept={'image/*'} className={'input-field'} hidden
                                   onChange={(event) => {
                                       this.props.handleChangImage(event.target.files[0]);
                                   }}
                            />
                            <i className="fa-solid fa-paperclip"
                               onClick={() => document.querySelector(".input-field").click()}>
                            </i>
                        </div>
                        { this.props.isMessenger === false ?(
                            <input type="text" placeholder="Tin nhắn" value={this.props.messenger}
                                   onChange={(e) => this.props.setMess(e.target.value)} onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    this.props.twoMessChat(nameRoom);
                                }
                            }} fdprocessedid="61a96k"/>
                        ) :(  <input type="text" placeholder="Tin nhắn" value={this.props.messenger}
                                      onChange={(e) => this.props.setMess(e.target.value)} onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                this.props.twoMessChatPeople(data);
                            }
                        }} fdprocessedid="61a96k"/>)
                        }
                        {this.props.isMessenger == false ?(
                            <ion-icon onClick={() => this.props.twoMessChat( nameRoom)} name="send" role="img"
                                      className="md hydrated" aria-label="send"></ion-icon>
                        ) :(  <ion-icon onClick={() => this.props.twoMessChatPeople(data)} name="send" role="img"
                                        className="md hydrated" aria-label="send">hi</ion-icon>)}
                    </div>
                </div>
                <div className="icon_Emoid">
                    {this.props.isEmojiPickerVisible && (
                        <EmojiPicker
                            onEmojiClick={this.props.handleEmojiClick}
                        />
                    )}
                </div>
            </div>
        </div>
    }
}
