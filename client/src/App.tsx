import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Views from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Views />
    </BrowserRouter>
  );
}

export default App;
