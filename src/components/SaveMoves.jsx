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

class SaveMoves extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      setOpen: true,
      danceName: "",
      saved: false,
      error: true,
      errorDescription: ""
    };
  }
  handleClose = () => {
    this.setState({ setOpen: false });
  };

  setDanceName = event => {
    this.setState({ danceName: event.target.value });
  };

  save = () => {
    if (this.state.danceName === "") {
      console.log("error");
      this.setState({ errorDescription: "Dance name cannot be blank" });
    } else {
      axios
        .post("https://boogie-banana.herokuapp.com/api/moves", {
          songcode: this.props.newSong.code,
          moves: this.props.newSong.moves,
          name: this.state.danceName
        })
        .then(data => {
          console.log("move saved");
          this.setState({
            saved: true
          });
          this.handleClose();
        })
        .catch(err => {
          this.setState({
            error: true
          });
          this.handleClose();
        });

      axios
        .post("https://boogie-banana.herokuapp.com/api/songs", {
          code: this.props.newSong.code,
          title: this.props.newSong.title,
          artist: this.props.newSong.artist
        })
        .then(data => console.log("song saved"));
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
          {this.state.errorDescription.length > 0 && (
            <MyTypography variant="body1" component="h2">
              {this.state.errorDescription}
            </MyTypography>
          )}
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
              {/* {this.state.error.length > 0 && (
                <MyTypography variant="body1" component="h2">
                  {this.state.error}
                </MyTypography>
              )} */}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="How would you like to call your dance?"
                label="Dance Name"
                type="danceName"
                id="danceName"
                onChange={this.setDanceName}
              />
              <MyButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.save}
              >
                Save
              </MyButton>
            </form>
          </div>
        </MyDialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    newSong: state.newSong
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
)(SaveMoves);
