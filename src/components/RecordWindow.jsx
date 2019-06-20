import VideoWindow from "./VideoWindow";
import React, { Component } from "react";
import Counter from "./Counter";
import "../styles/dancewindow.css";
import { connect } from "react-redux";
import YouTube from "react-youtube";

class RecordWindow extends Component {
  constructor(props) {
    super(props);
    this.audioPlayerRef = new React.createRef();
  }
  getTimeLeft = event => {
    console.log("GET TIME", event.target.getDuration());
  };
  render() {
    return (
      <div>
        <VideoWindow />
        <Counter />
        {this.props.isCountdownFinished && (
          <YouTube
            videoId={this.props.newSong.code}
            ref={this.audioPlayerRef}
            onEnd={this.props.audioFinished}
            opts={{
              playerVars: {
                autoplay: 1
              },
              height: "1",
              width: "1"
            }}
            onReady={this.getTimeLeft}
            muted={false}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCountdownFinished: state.isCountdownFinished,
    isAudioFinished: state.isAudioFinished,
    newSong: state.newSong
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
)(RecordWindow);
