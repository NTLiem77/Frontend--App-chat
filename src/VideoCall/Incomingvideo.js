import {Link} from "react-router-dom";
import React from "react";

const Incomingvideo = () => {

    return(
        <div >
            <div className="row m_60 mt-5 ">
                <div className="offset-lg-3 col-lg-6">
                    <div className="container mt-7 ">
                        <div className="group1">
                            <div>
                                <h2>Video call</h2>
                            </div>
                           <div>
                               <div className="user-group1">
                                   <img src="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
                                        className="img-cover"/>

                               </div>
                           </div>
  <div className="flex flex-group">
      <div className="m_l call_end " > <ion-icon name="videocam-outline" role="img" className="md hydrated " aria-label="chatbox">
      </ion-icon></div>
      <div className="call"> <ion-icon name="videocam-outline" role="img" className="md hydrated "  aria-label="chatbox">
      </ion-icon></div>
  </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export  default  Incomingvideo;