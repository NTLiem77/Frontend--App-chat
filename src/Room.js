import React, {useState, useEffect, Component} from "react";
import EmojiPicker from "emoji-picker-react";


export default class Room extends React.Component{
    render() {
        sessionStorage.setItem("mesnam", this.props.user);

        const mesnam =  sessionStorage.getItem("mesnam");
        const username =  sessionStorage.getItem("name1");
        // lay ten phong
        const nameRoom = localStorage.getItem("nameRoom");
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
                    <div className="list-chat">


                        <div>
                            <div>

                                {this.props.roomList.map((room, index) => (
                                    <div className="group"  >

                                        {room.name !== "20130423" && room.name !=="sassd" && room.name !== "" && room.name !== "2324322" && room.name !== "Thu?n ??ng c?p" && room.name !== "Nhom 11 _Da Cap" && room.name !== "12314141"
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
                    <div className="chat-input-left">
                        <input type="text" placeholder="Type a massage"/>
                        <i className="fa-solid fa-square-plus"></i>
                    </div>

                </div>

                <div className="right-sidebar">
                    {/*Header chat*/}
                    <div className="header-chat">
                        <div className="imgtext">
                            <div className="user-avatar">
                                <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
                                     className="img-cover"/>
                            </div>
                            <i className="fa-solid fa-user-plus"></i>
                            <p>{nameRoom}<br/><span>online</span></p>
                        </div>
                        <ul className="icon-nav">
                            <li>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </li>
                            <li>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </li>
                            <li>
                                <span onClick={ this.props.handLougout} className="logout">Đăng xuất</span>
                            </li>
                        </ul>
                    </div>
                    <div className="search-chat">
                        <i className="fa-solid fa-chevron-right"></i>
                        <div><input type="text" placeholder="Check User" fdprocessedid="hss68p"/>
                        </div>
                    </div>
                    {/*Chat box*/}
                    <div className="chatbox">
                        <div className="mess mymess">
                            <p>Chào bạn <br/><span>21:15</span></p>
                        </div>

                    </div>

                    <div className="chat-input-right">
                   <div id="pos" onClick={this.props.handPosClick}>   <i className="fa-regular fa-face-smile"></i></div>
                        <i className="fa-solid fa-paperclip"></i>
                        <input type="text" placeholder="Type a massage"/>
                        <i className="fa-solid fa-paper-plane"></i>
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