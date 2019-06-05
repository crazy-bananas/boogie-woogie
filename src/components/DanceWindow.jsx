import { VideoWindow } from "./VideoWindow";
import React, { Component } from "react";
import Counter from "./Counter";
import "../styles/counter.css";

export class DanceWindow extends Component {
  render() {
    return (
      <div>
        <VideoWindow />
        <Counter style={{ position: "absolute" }} />
      </div>
    );
  }
}
