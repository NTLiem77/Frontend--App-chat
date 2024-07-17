import {useParams} from "react-router-dom";
import React from "react";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
const RoomVideoCall = () =>{
    const {roomId} = useParams();

    const myVideoCall = async (element) =>{
        const  name = sessionStorage.getItem("mesnam")
        const username =  sessionStorage.getItem("name1");
        const login = sessionStorage.getItem("login");
        const Relogin = sessionStorage.getItem("Relogin");
        let  tokenName;
        const appID = 1676139371;
        const serverSecret ="559e9a46e4993c6015e4387f20042c36"

        if(login === "LOGIN"){
            tokenName = name ;
        }else{
            tokenName = "user";
        }
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            tokenName
        );
        console.log(tokenName);
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks :[{
                name : "Copy link",
                url :`http://localhost:3000/room/${roomId}`
            },
            ],
            scenario:{
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton: true,
        });
    }
      const url = `http://localhost:3000/room/${roomId}`;
      sessionStorage.setItem("linkcall" ,url);
    return(
        <div>

            <p>alo
                <div ref={myVideoCall}></div>

            </p>

        </div>
    )
}
export default RoomVideoCall