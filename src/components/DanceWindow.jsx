import VideoWindow from "./VideoWindow";
import React, { Component } from "react";
import Counter from "./Counter";
import "../styles/dancewindow.css";
import { connect } from "react-redux";

class DanceWindow extends Component {
  constructor(props) {
    super(props);
    this.audioPlayerRef = new React.createRef();
  }

  startLevel = () => {
    this.audioPlayerRef.current.play();
  };

  componentDidUpdate() {
    if (this.props.isCountdownFinished) {
      this.startLevel();
    }
  }

  render() {
    return (
      <div>
        <VideoWindow />
        <Counter />
        <audio
          id="audio_player"
          ref={this.audioPlayerRef}
          src={this.props.songURL}
          controls
        />
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
