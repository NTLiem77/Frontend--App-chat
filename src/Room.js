import React, {useState, useEffect, Component} from "react";
import EmojiPicker from "emoji-picker-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import './room.css'
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
                    <div className="box-chat active">
                        <div className="img-userchat">
                            <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
                                 className="img-cover"/>
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
                    <div className="header-chat">
                        <div className="imgtext">
                            <div className="user-avatar">
                                <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
                                     className="img-cover"/>
                            </div>
                            <i className="fa-solid fa-user-plus"></i>
                            <p>Huỳnh Anh Tài<br/><span>online</span></p>
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
                                            {message.name === "20130423" && !message.mes.startsWith("https") &&
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
                                            {message.name === "20130423" && message.mes.startsWith("https") || message.name === "20130433" && message.mes.startsWith("https") &&
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
                                    </div>

                                )
                            )
                            }
                            {/*<div>*/}
                            {/*    <button onClick={()=> this.props.chatMessPeopleTwo( username, nameRoom)}>Ha</button>*/}

                            {/*</div>*/}
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
