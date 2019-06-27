import VideoWindow from "./VideoWindow";
import React, { Component } from "react";
import Counter from "./Counter";
import "../../styles/dancewindow.css";
import { connect } from "react-redux";
import YouTube from "react-youtube";
import Timer from "./Timer";

class DanceWindow extends Component {
  constructor(props) {
    super(props);
    this.audioPlayerRef = new React.createRef();
    this.state = { time: 0 };
  }
  getTimeLeft = event => {
    this.setState({ time: event.target.getDuration() });
  };

  render() {
    return (
      <div id="danceWindow">
        <VideoWindow />
        <Counter />

        {this.props.isCountdownFinished && (
          <div>
            <YouTube
              videoId={this.props.songSelected}
              ref={this.audioPlayerRef}
              opts={{
                playerVars: {
                  autoplay: 1
                },
                height: "1",
                width: "1"
              }}
              onReady={this.props.setTimer}
              onEnd={this.props.audioFinished}
              muted={false}
            />
            {this.props.time !== 0 && <Timer />}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCountdownFinished: state.isCountdownFinished,
    songSelected: state.songSelected,
    isAudioFinished: state.isAudioFinished,
    newSong: state.newSong,
    time: state.time
  };
};

const mapDispatchToProps = dispatch => {
  return {
    audioFinished: () => {
      dispatch({
        type: "AUDIO_FINISHED"
      });
    },
    setTimer: event => {
      dispatch({
        type: "SET_TIMER",
        payload: event.target.getDuration()
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanceWindow);
