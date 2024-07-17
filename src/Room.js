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


        sessionStorage.setItem("mesnam", this.props.user);

        const mesnam =  sessionStorage.getItem("mesnam");
        const username =  sessionStorage.getItem("name1");
        //
        sessionStorage.setItem("use" , username);
        // lay ten phong
        const nameRoom = localStorage.getItem("nameRoom");

        const chatData = localStorage.getItem("own");
        const sortMess = this.props.messege.sort((a, b) => a.id - b.id);
        const ownner = localStorage.getItem("ownner");
        const  url =sessionStorage.getItem("linkcall");
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
                            <p className="m_9">{mesnam || username}</p>
                       </div>
                        <ul className="icon-nav">
                            <li>
                                <ion-icon name="scan-circle-outline" role="img" className="md hydrated" aria-label="scan circle outline">
                                </ion-icon>
                            </li>
                            <li>
                                <ion-icon name="videocam-outline" role="img" className="md hydrated" aria-label="chatbox">
                                </ion-icon>
                            </li>
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
                                        {room.name !== "20130388" && room.name !=="sassd" && room.name !== "" && room.name !== "2324322" && room.name !== "Thu?n ??ng c?p" && room.name !== "Nhom 11 _Da Cap" && room.name !== "12314141"
                                        && room.name !== "hello" && room.name !== "3252523232" && room.name !== "3252523" && room.name !== "231121312" && room.name !== "22222222" && room.name !== "124135462" && room.name !== "111111111" && room.name !== "2222222222" ? (
                                            <h6 key={index}>
                                                <div className="imgtext1" onClick={() => this.props.handJoinRoom(room.name)}>
                                                    <div className="user-avatar"><img
                                                        src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
                                                        className="img-cover"/></div>
                                                    <p className="author_mess">{room.name}</p>
                                                </div>
                                            </h6>

                                        ) : (null)

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
                        <div className={"imgtext"}>
                            <div className={"user-avatar"}>
                                <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg" className={"img-cover"}/>
                            </div>

                            <div>
                                <ion-icon name={"person-add-outline"} role={"img"} className ="md hydrated" aria-label={"person-add-outline"}></ion-icon>
                            </div>

                            <p className={"author_mess"}>{nameRoom}<br/>
                            <span>Online</span></p>
                        </div>

                        <ul className="icon-nav">
                            <li onClick={() => this.props.videoCall(nameRoom, url )}>
                                <i className="fa-solid fa-video"></i>
                            </li>
                            <li className="lougout" onClick={this.props.handLougout}>Đăng xuất</li>
                        </ul>
                    </div>

                    {/*Check User*/}
                    <div className="search-chat pointer">
                        <i className="fa-solid fa-chevron-right"></i>
                        <div><input className="pointer" type="text" placeholder="Check User" fdprocessedid="hss68p"/>
                        </div>
                    </div>

                    {/*Chat box*/}
                    <div className="chatbox">
                        <div>
                            {sortMess.map((message, index) => (
                                    <div>
                                        <div>
                                            {message.name === "20130433" && !message.mes.startsWith("https") &&
                                                <div className="mess frnmess">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <img src={"https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg"} className={'messFr'}></img>
                                                            <h6>{message.name}</h6>
                                                            <p>{decodeURIComponent(message.mes)}
                                                                <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            {message.name === "20130423" &&  !message.mes.startsWith("https") &&  !message.mes.startsWith("http") &&
                                                <div className="mess frnmess">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <img src={"https://i.pinimg.com/564x/b1/78/32/b17832ed39fd47db601a525e963050a2.jpg"} className={'messFr'}></img>
                                                            <h6>{message.name}</h6>
                                                            <p>{decodeURIComponent(message.mes)}
                                                                <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                        </h6>
                                                    </h6>

                                                </div>
                                            }
                                        </div>
                                        {/* 22*/}
                                        <div>
                                            {message.name === "20130388" && !message.mes.startsWith("https") &&
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

                                        <div>
                                            {message.name === "20130423" && !message.mes.endsWith("VideoCall") || message.name === "20130423"  && message.mes.startsWith("https") || message.name === "20130433" && message.mes.startsWith("https") &&
                                                <div className="mess frnmess">
                                                    <h6>
                                                        <h6 key={index}>

                                                            <h6>{message.name}</h6>
                                                            <p><a href={decodeURIComponent(message.mes)} target="_blank"
                                                                  onClick={(event) => {
                                                                      event.preventDefault();
                                                                      window.open(decodeURIComponent(message.mes))
                                                                  }}>{decodeURIComponent(message.mes)}</a>
                                                                <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                        </h6>
                                                    </h6>

                                                </div>
                                            }
                                        </div>
                                        {/*    */}
                                        <div>
                                            {  message.mes.endsWith("VideoCall") &&
                                                <div className="mess frnmess">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <img src={"https://i.pinimg.com/564x/b1/78/32/b17832ed39fd47db601a525e963050a2.jpg"} className={'messFr'}></img>
                                                            <h6>{message.name}</h6>
                                                            <p className="red-text">video gọi thoại :<a href='http://localhost:3000/room/VideoCall' >{decodeURIComponent(message.mes)}</a>
                                                                <br/><span>{message.createAt}</span></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>

                                        <div>
                                            {message.name === "20130388" && message.mes.startsWith("https") &&
                                                <div className="mess mymess">
                                                    <h6>
                                                        <h6 key={index}>
                                                            <h6>{message.name}</h6>
                                                            <p><a href={decodeURIComponent(message.mes)} target="_blank"
                                                                  onClick={(event) => {
                                                                      event.preventDefault();
                                                                      window.open(decodeURIComponent(message.mes))
                                                                  }}>{decodeURIComponent(message.mes)}</a>
                                                                <br/><span>{convertServerTimeToClientTime(message.createAt)}</span></p>
                                                        </h6>
                                                    </h6>
                                                </div>
                                            }
                                        </div>
                                        {/*goi thoai*/}

                                    </div>

                                )
                            )
                            }

                        </div>

                    </div>

                    <div className="chat-input-right">
                           <div id="pos" onClick={this.props.handPosClick}>
                               <i className="fa-regular fa-face-smile"></i>
                           </div>
                                <div>
                                    <input type={"file"} accept={'image/*'} className={'input-field'} hidden
                                           onChange={this.props.handleImageChange}/>
                                    <i className="fa-solid fa-paperclip"  onClick={() => document.querySelector(".input-field").click()}></i>
                                </div>
                        <input type="text" placeholder="Type a message" value={this.props.messenger}
                               onChange={(e) => this.props.setMess(e.target.value)} onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                this.props.twoMessChat(nameRoom);
                            }
                        }} fdprocessedid="61a96k"/>
                        <ion-icon onClick={() => this.props.twoMessChat(nameRoom)} name="send" role="img"
                                  className="md hydrated" aria-label="send"></ion-icon>
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
