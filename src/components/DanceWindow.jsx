import { VideoWindow } from "./VideoWindow";
import React, { Component } from "react";
import Counter from "./Counter";
import AudioPlayer from "./Audio";
import "../styles/counter.css";
import { connect } from "react-redux";

class DanceWindow extends Component {
  // constructor(props) {
  //   super(props);
  //   this.playButtonRef = React.createRef();
  // }

  // playAudio = () => {
  //   this.playButtonRef.current.play();
  // };
  //
  render() {
    return (
      <div>
        {/* <VideoWindow /> */}
        <Counter style={{ position: "absolute" }} />
        {this.props.isCountdownFinished && (
          <AudioPlayer ref={this.playButtonRef} />
          // <AudioPlayer ref={this.playButtonRef} />
        )}
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
