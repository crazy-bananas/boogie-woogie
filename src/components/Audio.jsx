import React from "react";
import { connect } from "react-redux";

const Audio = function() {
  class AudioPlayer extends React.Component {
    render() {
      const { forwardedRef } = this.props;
      console.log(this.props.songURL);
      return (
        <audio ref={forwardedRef} src={this.props.songURL} controls autoPlay />
      );
    }
  }

  return React.forwardRef((props, ref) => {
    return <AudioPlayer songURL={props.songURL} forwardRef={ref} />;
  });
};

const mapsPropsToState = (state) => {
  return {
    songURL: state.songList[state.songSelected].url
  };
};

export default connect(mapsPropsToState)(Audio());
