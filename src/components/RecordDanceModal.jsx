import React, { Component } from "react";
import { saveObject } from "../utils/index";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/styles";
import "../styles/recorddancemodal.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const MyButton = styled(Button)({
  marginTop: "20px"
});

const MyModal = styled(Button)({
  backgroundColor: "#fff",
  top: "50px",
  left: "50px"
  // transform: "translate(-50%, -50%)"
});
// const useStyles = makeStyles((theme) => ({
//   paper: {},
//   "@global": {
//     body: {
//       backgroundColor: theme.palette.common.white
//     }
//   },

//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     // width: "20%" // Fix IE 11 issue.
//     //  marginTop: theme.spacing(1)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   }
// }));

class SimpleModal extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      setOpen: true,
      title: "",
      artist: "",
      file: {}
      //modalStyle: getModalStyle
    };
  }
  handleClose = () => {
    this.setState({ setOpen: false });
  };

  clickInputRef = () => {
    this.fileInputRef.current.click();
  };

  setTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  setArtist = (event) => {
    this.setState({ artist: event.target.value });
  };

  setFile = (event) => {
    this.setState({ file: event.target.files[0] });
    // Upload to S3
    saveObject(event.target.files[0]);
  };

  render() {
    return (
      <div>
        <Dialog onClose={this.handleClose} open={this.state.setOpen}>
          <div id="dialog">
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>

            <form noValidate style={{ width: "20%", marginTop: "20px" }}>
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

              <input
                id="selectfile"
                type="file"
                ref={this.fileInputRef}
                onChange={this.setFile}
              />

              <MyButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.clickInputRef}
              >
                Select Song
              </MyButton>

              <MyButton
                fullWidth
                variant="contained"
                color="primary"
                // onClick={clickInputRef}
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
        </Dialog>
      </div>
    );
  }
}

export default SimpleModal;
