import {useParams} from "react-router-dom";
import React from "react";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
const RoomVideoCall = () =>{
    const {roomId} = useParams();
const  susscess = sessionStorage.getItem("mesnam")
    const myVideoCall = async (element) =>{
        const appID = 1676139371;
        const serverSecret ="559e9a46e4993c6015e4387f20042c36"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            susscess

        );
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            scenario:{
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton: true,
        });
    }

    return(
        <div>

            <p>alo
                <div ref={myVideoCall}></div>

            </p>

        </div>
    )
}
export default RoomVideoCall