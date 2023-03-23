import { Routes, Route } from "react-router-dom";
import Room from "../pages/Room";
const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  );
};

export default Views;
