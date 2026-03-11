import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

export const SocketContext = createContext();

const socket = io("https://peerlink-server.onrender.com");

export const SocketProvider = ({ children }) => {

  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");

  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {

        setStream(currentStream);

        if(myVideo.current){
          myVideo.current.srcObject = currentStream;
        }

      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name, signal }) => {

      setCall({
        isReceivingCall: true,
        from,
        name,
        signal
      });

    });

  }, []);

  // CALL USER
  const callUser = (id , name ) => {

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {

  socket.emit("callUser", {
  userToCall: id,
  signalData: data,
  from: me,
  name: name
});

    });

    peer.on("stream", (currentStream) => {

      userVideo.current.srcObject = currentStream;

    });

    socket.on("callAccepted", (signal) => {

      setCallAccepted(true);
      peer.signal(signal);

    });

    connectionRef.current = peer;
  };

  // ANSWER CALL
  const answerCall = () => {

    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {

      socket.emit("answerCall", {
        signal: data,
        to: call.from
      });

    });

    peer.on("stream", (currentStream) => {

      userVideo.current.srcObject = currentStream;

    });

    peer.signal(call.signal);

    connectionRef.current = peer;

  };
  // LEAVE CALL
  const leaveCall = () => {
  setCallEnded(true);

  if (connectionRef.current) {
    connectionRef.current.destroy();
  }

  window.location.reload();
};

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      me,
      callUser,
      answerCall,
      leaveCall
    }}>
      {children}
    </SocketContext.Provider>
  );
};