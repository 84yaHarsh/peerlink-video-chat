import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

const VideoPlayer = () => {

  const { myVideo, userVideo, stream, callAccepted } =
    useContext(SocketContext);

  useEffect(() => {
    if (stream && myVideo.current) {
      myVideo.current.srcObject = stream;
    }
  }, [stream, myVideo]);   // <-- added myVideo here

  return (
    <div className="video-container">

      <div className="video">
        <h3>Me</h3>
        <video playsInline muted ref={myVideo} autoPlay />
      </div>

      {callAccepted && (
        <div className="video">
          <h3>User</h3>
          <video playsInline ref={userVideo} autoPlay />
        </div>
      )}

    </div>
  );

};

export default VideoPlayer;