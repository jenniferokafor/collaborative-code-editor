import "./roomnav.scss";
import { RoomNavProps } from "./types";
const RoomNav = ({ roomName, userCount }: RoomNavProps) => {
  return (
    <nav className="roomNav">
      <h1>Room {roomName}</h1>
      <div className="roomNavButtons">
        <div className="roomNavVisitorsCount">
          <p>Room Visitors: </p>
          <p>{userCount}</p>
        </div>
        <button>Leave Room</button>
        <button>Copy Room ID</button>
      </div>
    </nav>
  );
};
export default RoomNav;
