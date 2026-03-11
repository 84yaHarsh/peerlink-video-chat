import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const Options = () => {
 
  const { me, callUser, answerCall, leaveCall, call, callAccepted } =
    useContext(SocketContext);
  
  const [idToCall, setIdToCall] = useState("");
  const [name,setName] = useState("Harsh");

  const copyMyId = () => {
    navigator.clipboard.writeText(me);
    alert("ID copied to clipboard");
  };

  return (

    <div className="controls">

      {/* ACCOUNT PANEL */}
      <div className="panel">

        <h3>Account Info</h3>

    <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
/>

        <button className="copy-btn" onClick={copyMyId}>
          COPY YOUR ID
        </button>

      </div>


      {/* CALL PANEL */}
      <div className="panel">

        <h3>Make a call</h3>

        <input
          type="text"
          placeholder="ID to call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />

        {callAccepted ? (
          <button className="end-btn" onClick={leaveCall}>
            HANG UP
          </button>
        ) : (
          <button
            className="call-btn"
            onClick={() => callUser(idToCall , name)}
          >
            CALL
          </button>
        )}

        {/* Incoming Call UI */}
        {call?.isReceivingCall && !callAccepted && (
          <div className="incoming-call">

            <h3>Incoming Call</h3>

            <button className="answer-btn" onClick={answerCall}>
              Answer
            </button>

          </div>
        )}

      </div>

    </div>

  );
};

export default Options;