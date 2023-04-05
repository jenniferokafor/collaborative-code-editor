import { useState } from "react";
import "./home.scss";

const Home = () => {
  const [room, setRoom] = useState("");

  //join/create room using id and redirect to that room
  //   TODO: add func to generate fun room ids
  const joinRoom = () => {
    if (room !== "") {
      window.location.href = `/room/${room}`;
    }
  };
  return (
    <div className="homeWrapper">
      <h1>Collaborative Code Editor</h1>
      <div className="homeEnterSection">
        <p>Enter a room id to join or create a new room</p>
        <input onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Create or Join</button>
      </div>
    </div>
  );
};

export default Home;
