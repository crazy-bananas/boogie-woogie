import React, { Component } from "react";
import { saveObject } from "../utils/index";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/styles";
import "../styles/recorddancemodal.css";
import { connect } from "react-redux";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const MyButton = styled(Button)({
  marginTop: "20px"
});

const MyDialog = styled(Dialog)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
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
      songUrl: ""
      //modalStyle: getModalStyle
    };
  }
  handleClose = () => {
    this.setState({ setOpen: false });
  };

  clickInputRef = () => {
    this.fileInputRef.current.click();
  };

  setTitle = event => {
    this.setState({ title: event.target.value });
  };

  setArtist = event => {
    this.setState({ artist: event.target.value });
  };

  setSongUrl = event => {
    this.setState({ songUrl: event.target.value });
  };

  render() {
    return (
      <div>
        <MyDialog onClose={this.handleClose} open={this.state.setOpen}>
          <div
            id="dialog"
            style={{
              display: "flex",
              marginBottom: "20px",
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
              <TextField
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
              />
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
                name="soundcloud"
                label="SoundCloud URL"
                type="soundcloud"
                id="soundcloud"
                onChange={this.setSongUrl}
              />

              <MyButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  this.props.addSong({
                    artist: this.state.artist,
                    title: this.state.title,
                    songUrl: this.state.songUrl
                  });
                  this.handleClose();
                }}
              >
                Start Recording
              </MyButton>
              <MyButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleClose}
              >
                Close
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
        type: "ADD_SONG",
        payload: song
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleModal);
