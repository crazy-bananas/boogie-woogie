import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import RecordWindow from "./RecordWindow";
import FinishRecording from "./FinishRecording";
import SongInput from "../SongInput";
import dotenv from "dotenv";
import Navbar from "../Navbar";
dotenv.config();

export class Record extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      setOpen: true,
      title: "",
      file: {},
      code: "",
      error: ""
    };
  }

  setSongUrl = event => {
    this.setState({ code: event.target.value });
  };

  saveSongData = () => {
    if (!this.state.code.startsWith("https://www.youtube.com")) {
      this.setState({
        error: "Please enter valid Song URL. We accept only Youtube URLs"
      });
    } else {
      const songCode = this.state.code.substring(
        this.state.code.indexOf("=") + 1
      );

      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${songCode}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        )
        .then(data => {
          this.props.addSong({
            title: data.data.items[0].snippet.title,
            code: songCode
          });
        })
        .catch(() => {
          this.setState({
            error: "Couldn't get title of youtube video. Please try again"
          });
        });
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar auth={this.props.auth} />
        {!this.props.isRecording && !this.props.isAudioFinished && (
          <SongInput />
        )}

        {this.props.isRecording && !this.props.isAudioFinished && (
          <RecordWindow />
        )}

        {this.props.isRecording && this.props.isAudioFinished && (
          <FinishRecording />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRecording: state.isRecording,
    isAudioFinished: state.isAudioFinished
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSong: song => {
      dispatch({
        type: "ADD_NEW_SONG",
        payload: song
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Record);
