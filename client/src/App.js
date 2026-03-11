import React from "react";
import "./App.css";

import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

function App() {
  return (
    <div className="app">

     <div className="title-box">
      Peerlink Video Chat
     </div> 

      <VideoPlayer />

      <div className="controls">
        <Options>
          <Notifications />
        </Options>
      </div>

    </div>
  );
}

export default App;