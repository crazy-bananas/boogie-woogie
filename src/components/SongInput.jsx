import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { styled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import "../styles/songinput.css";

import dotenv from "dotenv";
dotenv.config();
const MyButton = styled(Button)({
  marginTop: "20px"
});

const MyTypography = styled(Typography)({
  color: "#ff0000",
  fontSize: "15px",
  fontWeight: "300"
});

export class SongInput extends Component {
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
      <div id="songinput">
        <form
          noValidate
          style={{
            marginTop: "20px",
            alignItems: "center",
            justifyContent: "center",
            width: "50%"
          }}
        >
          {this.state.error.length > 0 && (
            <MyTypography variant="body1" component="h2">
              {this.state.error}
            </MyTypography>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="youtube"
            label="youtube URL"
            type="youtube"
            id="youtube"
            onChange={this.setSongUrl}
          />

          <MyButton
            fullWidth
            variant="contained"
            color="secondary"
            onClick={this.saveSongData}
          >
            Start Recording
          </MyButton>
        </form>
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
)(SongInput);
