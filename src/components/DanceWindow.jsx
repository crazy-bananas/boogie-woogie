import { VideoWindow } from "./VideoWindow";
import React, { Component } from "react";
import Counter from "./Counter";
import "../styles/dancewindow.css";
import { connect } from "react-redux";

class DanceWindow extends Component {
  startLevel = () => {
    const audioPlayer = document.getElementById("audio_player");
    audioPlayer.play();
  };
  render() {
    return (
      <div>
        <VideoWindow />
        <Counter />
        <audio id="audio_player" src={this.props.songURL} controls />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isCountdownFinished: state.isCountdownFinished,
    songURL: state.songList[state.songSelected].url
  };
};
export default connect(mapStateToProps)(DanceWindow);
