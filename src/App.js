import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { VideoWindow } from "./components/VideoWindow";

function App() {
  return (
    <div className="App">
      <Navbar />
      <VideoWindow />
    </div>
  );
}

export default App;
