import React from "react";
import { connect } from "react-redux";

const Audio = function() {
  class AudioPlayer extends React.Component {
    render() {
      const { forwardedRef } = this.props;
      return <audio ref={forwardedRef} src={this.props.songURL} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <AudioPlayer songURL={props.songURL} forwardedRef={ref} />;
  });
};

const mapsPropsToState = state => {
  return {
    songURL: state.songList[state.songSelected].url
  };
};

export default connect(
  mapsPropsToState,
  null,
  null,
  { forwardRef: true }
)(Audio());
