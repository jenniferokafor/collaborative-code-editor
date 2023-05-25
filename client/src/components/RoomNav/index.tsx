import { useState } from "react";
import "./roomnav.scss";
import { RoomNavProps } from "./types";
const RoomNav = ({ roomName, userCount }: RoomNavProps) => {
  const [copyBtnText, setCopyBtnText] = useState("Copy Room Link");
  const url = window.location.href;

  // copy the url to the clipboard
  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    if (copyBtnText) {
      setCopyBtnText("Copied!");
      setTimeout(() => {
        setCopyBtnText("Copy Room Link");
      }, 2000);
    }
  };

  // leave the room
  const leaveRoom = () => {
    window.location.href = "/";
  };
  return (
    <nav className="roomNav">
      <h1>Room {roomName}</h1>
      <div className="roomNavButtons">
        <div className="roomNavVisitorsCount">
          <p>Room Visitors: </p>
          <p>{userCount}</p>
        </div>
        <button onClick={leaveRoom}>Leave Room</button>
        <button onClick={copyUrl}>{copyBtnText}</button>
      </div>
    </nav>
  );
};
export default RoomNav;
