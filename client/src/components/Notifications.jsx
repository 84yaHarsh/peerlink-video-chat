import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Notifications = () => {

  const { call, callAccepted, answerCall } = useContext(SocketContext);

  return (

    <>
      {call.isReceivingCall && !callAccepted && (

        <div style={{ marginTop: "10px", textAlign: "center" }}>

          <h3>Incoming Call...</h3>

          <button
            style={{
              background: "#4caf50",
              color: "white",
              border: "none",
              padding: "8px 20px",
              cursor: "pointer"
            }}
            onClick={answerCall}
          >
            Answer
          </button>

        </div>

      )}
    </>

  );
};

export default Notifications;