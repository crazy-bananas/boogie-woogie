import { VideoWindow } from "./VideoWindow";
import React, { Component } from "react";
import Counter from "./Counter";
import AudioPlayer from "./Audio";
import "../styles/counter.css";
import { connect } from "react-redux";

class DanceWindow extends Component {
  render() {
    return (
      <div>
        <VideoWindow />
        <Counter style={{ position: "absolute" }} />
        {this.props.isCountdownFinished && <AudioPlayer />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isCountdownFinished: state.isCountdownFinished
  };
};
export default connect(mapStateToProps)(DanceWindow);
