import VideoWindow from "./VideoWindow";
import React, { Component } from "react";
import Counter from "./Counter";
import "../styles/dancewindow.css";
import { connect } from "react-redux";
import YouTube from "react-youtube";

class DanceWindow extends Component {
  constructor(props) {
    super(props);
    this.audioPlayerRef = new React.createRef();
  }

  // startLevel = () => {
  //   this.audioPlayerRef.current.play();
  // };

  // componentDidUpdate() {
  //   if (this.props.isCountdownFinished) {
  //     this.startLevel();
  //   }
  // }

  render() {
    return (
      <div>
        <VideoWindow />
        <Counter />

        {this.props.isCountdownFinished && (
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
            onEnd={this.props.audioFinished}
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
    songSelected: state.songSelected,
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
)(DanceWindow);
