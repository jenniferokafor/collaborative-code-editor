import { Routes, Route } from "react-router-dom";
import Room from "../pages/Room";
import Home from "../pages/Home";
const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  );
};

export default Views;
