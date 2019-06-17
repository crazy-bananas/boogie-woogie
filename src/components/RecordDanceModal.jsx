import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/styles";
import "../styles/recorddancemodal.css";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Close from "@material-ui/icons/Close";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const MyButton = styled(Button)({
  marginTop: "20px"
});

const MyDialog = styled(Dialog)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const MyTypography = styled(Typography)({
  color: "#ff0000",
  fontSize: "15px",
  fontWeight: "300"
});

class SimpleModal extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      setOpen: true,
      title: "",
      artist: "",
      file: {},
      code: "",
      error: ""
      //modalStyle: getModalStyle
    };
  }
  handleClose = () => {
    this.setState({ setOpen: false });
  };

  clickInputRef = () => {
    this.fileInputRef.current.click();
  };

  setArtist = event => {
    this.setState({ artist: event.target.value });
  };

  setSongUrl = event => {
    this.setState({ code: event.target.value });
  };

  saveSongData = () => {
    if (this.state.artist === "") {
      this.setState({ error: "Title and Artist field can't be empty" });
    } else if (!this.state.code.startsWith("https://www.youtube.com")) {
      this.setState({
        error: "Please enter valid Song URL. We accept only Youtube URLs"
      });
    } else {
      const songCode = this.state.code.substring(
        this.state.code.indexOf("=") + 1
      );
      console.log(process.env);
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${songCode}&key=${
            process.env.YOUTUBE_API_KEY
          }`
        )
        .then(data => {
          this.props.addSong({
            artist: this.state.artist,
            title: data.data.items[0].snippet.title,
            code: songCode
          });
        })
        .catch(err => {
          this.props.addSong({
            artist: this.state.artist,
            title: "unknown",
            code: this.state.code.substring(this.state.code.indexOf("=") + 1)
          });
        });

      this.handleClose();
    }
  };
  render() {
    return (
      <div>
        <MyDialog onClose={this.handleClose} open={this.state.setOpen}>
          <div
            style={{
              display: "flex",
              alignItems: "right",
              justifyContent: "flex-end",
              marginTop: "10px",
              marginRight: "10px"
            }}
          >
            <Avatar id="closeIcon" onClick={this.handleClose}>
              <Close />
            </Avatar>
          </div>
          <div
            id="dialog"
            style={{
              display: "flex",
              marginBottom: "40px",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <form
              noValidate
              style={{
                width: "70%",
                marginTop: "20px",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.error.length > 0 && (
                <MyTypography variant="body1" component="h2">
                  {this.state.error}
                </MyTypography>
              )}

              {/* <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Song Title"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={this.setTitle}
              /> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="artist"
                label="Song Artist"
                type="artist"
                id="artist"
                onChange={this.setArtist}
              />

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
                color="primary"
                onClick={this.saveSongData}
              >
                Start Recording
              </MyButton>
            </form>
          </div>
        </MyDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
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
)(SimpleModal);
