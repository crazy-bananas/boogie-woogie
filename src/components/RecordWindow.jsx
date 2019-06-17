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

  // startLevel = () => {
  //   this.audioPlayerRef.current.pauseVideo();
  // };

  componentDidUpdate() {
    // if (this.props.isCountdownFinished) {
    //   this.startLevel();
    // }
    // if (this.props.isAudioFinished) {
    //   this.audioPlayerRef.current.pause();
    // }
  }

  render() {
    return (
      <div>
        <VideoWindow />
        <Counter />
        {console.log(this.props.newSong)}
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
