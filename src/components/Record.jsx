import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { styled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import RecordWindow from "./RecordWindow";
import FinishRecording from "./FinishRecording";
import SongInput from "./SongInput";
import dotenv from "dotenv";
import Navbar from "./Navbar";
dotenv.config();
const MyButton = styled(Button)({
  marginTop: "20px"
});

const MyTypography = styled(Typography)({
  color: "#ff0000",
  fontSize: "15px",
  fontWeight: "300"
});

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
      console.log(
        `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${songCode}&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY
        }`
      );
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${songCode}&key=${
            process.env.REACT_APP_YOUTUBE_API_KEY
          }`
        )
        .then(data => {
          this.props.addSong({
            title: data.data.items[0].snippet.title,
            code: songCode
          });
        })
        .catch(err => {
          console.log();
          this.setState({
            error: "Couldn't get title of youtube video. Please try again"
          });
        });
    }
  };

  render() {
    return (
      <div>
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
