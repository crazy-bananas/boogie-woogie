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
    // if (this.props.isAudioFinished) {
    //   this.audioPlayerRef.current.pause();
    // }
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
          onEnded={this.props.audioFinished}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCountdownFinished: state.isCountdownFinished,
    songURL: state.songList[state.songSelected].url,
    isAudioFinished: state.isAudioFinished
  };
};

const mapDispatchToProps = dispatch => {
  return {
    audioFinished: () => {
      dispatch({
        type: "AUDIO_FINISHED"
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanceWindow);
